// app/page.tsx
import { supabase } from '@/lib/utils';
import Navigation from '@/components/layout/Navigation';
import HeroSection from '@/components/ui/HeroSeccion';
import ChampionshipSection from '@/components/ui/CampeonatoSeccion';
import CalendarSection from '@/components/ui/CalendarioSeccion';
import GallerySection from '@/components/ui/GaleriaSeccion';
import Footer from '@/components/layout/Footer';
import {parseDate} from '@/lib/utils'
import { RaceWithDetails, ChampionshipWithStandings, ChampionshipStats, NextRaceData } from '@/types/championship';

// Función para obtener la próxima carrera
async function getNextRace(): Promise<NextRaceData | null> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('fechas')
      .select(`
        id,
        nombre,
        fecha_desde,
        fecha_hasta,
        campeonato:campeonatos(id, nombre, anio),
        circuito:circuitos(nombre, distancia)
      `)
      .gte('fecha_desde', today)
      .order('fecha_desde', { ascending: true })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching next race:', error.message);
      return null;
    }
    if (data) {
      return {
        id: data.id,
        nombre: data.nombre,
        fecha_desde: data.fecha_desde,
        fecha_hasta: data.fecha_hasta || undefined,
        campeonato: Array.isArray(data.campeonato) ? data.campeonato[0] : data.campeonato,
        circuitoNombre: Array.isArray(data.circuito) ? (data.circuito[0]?.nombre || '') : (data.circuito?.nombre || ''),
        circuitoDistancia: Array.isArray(data.circuito) ? (data.circuito[0]?.distancia || '') : (data.circuito?.distancia || ''),
      };
    }
    return null;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

// Función para obtener todas las fechas del año actual
// app/page.tsx
async function getAllRaces(): Promise<RaceWithDetails[]> {
  try {
    const currentYear = new Date().getFullYear();
    const { data, error } = await supabase
      .from('fechas')
      .select(`
        id,
        nombre,
        fecha_desde,
        fecha_hasta,
        campeonato_id,
        campeonato:campeonatos!inner(nombre, anio),
        circuito:circuitos(nombre, distancia),
        carrera_final(id, piloto_id, posicion, puntos, presente, piloto:pilotos(nombre, pais))
      `)
      .eq('campeonato.anio', currentYear)
      .order('fecha_desde', { ascending: true });

    if (error) {
      console.error('Error fetching all races:', error.message);
      return [];
    }

    if (data) {
      const racesWithStatus = data.map(race => {
        const raceDate = parseDate(race.fecha_desde);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let status: 'completed' | 'live' | 'upcoming' = 'upcoming';
        if (raceDate < today) {
          status = 'completed';
        } else if (raceDate.toDateString() === today.toDateString()) {
          status = 'live';
        }

        const winnerEntry = race.carrera_final?.find(final => final.posicion === 1);
        const winner = winnerEntry?.piloto?.nombre || 'No disponible';

        return {
          id: race.id,
          nombre: race.nombre,
          fecha_desde: race.fecha_desde,
          fecha_hasta: race.fecha_hasta || undefined,
          campeonato_id: race.campeonato_id,
          campeonato: Array.isArray(race.campeonato) ? race.campeonato[0] : race.campeonato,
          circuitoNombre: Array.isArray(race.circuito) ? (race.circuito[0]?.nombre || 'Circuito no especificado') : (race.circuito?.nombre || 'Circuito no especificado'),
          circuitoDistancia: Array.isArray(race.circuito) ? (race.circuito[0]?.distancia || undefined) : (race.circuito?.distancia || undefined),
          status,
          carrera_final: (race.carrera_final || []).map((item: any) => ({
            ...item,
            fecha_id: race.id,
            piloto: Array.isArray(item.piloto) ? item.piloto[0] : item.piloto,
          })),
          winner, // Add the winner field
        } as RaceWithDetails;
      });

      return racesWithStatus;
    }
    return [];
  } catch (err) {
    console.error('Unexpected error:', err);
    return [];
  }
}

// Función para obtener el campeonato actual
async function getCurrentChampionship(): Promise<ChampionshipWithStandings | null> {
  try {
    const currentYear = new Date().getFullYear();
    const { data: championshipData, error: championshipError } = await supabase
      .from('campeonatos')
      .select(`
        id,
        nombre,
        anio,
        posiciones_campeonato(
          id,
          puntos_totales,
          piloto_id,
          piloto:pilotos(id, nombre, pais)
        )
      `)
      .eq('anio', currentYear)
      .single();

    if (championshipError) {
      console.error('Error fetching championship:', championshipError.message);
      return null;
    }

    if (!championshipData) {
      return null;
    }

    // Fetch pilotos_campeonato separately
    const { data: pilotosCampeonatoData, error: pilotosCampeonatoError } = await supabase
      .from('pilotos_campeonato')
      .select(`
        piloto_id,
        numero_auto
      `)
      .eq('campeonato_id', championshipData.id);

    if (pilotosCampeonatoError) {
      console.error('Error fetching pilotos_campeonato:', pilotosCampeonatoError.message);
      return null;
    }

    // Map pilotos_campeonato data to a lookup object
    const numeroAutoMap = new Map(
      (pilotosCampeonatoData || []).map(item => [item.piloto_id, item.numero_auto])
    );

    // Combine data
    const sortedPositions = (championshipData.posiciones_campeonato || [])
      .sort((a, b) => (b.puntos_totales || 0) - (a.puntos_totales || 0))
      .map((pos, index) => ({
        position: index + 1,
        piloto: Array.isArray(pos.piloto) ? pos.piloto[0] : pos.piloto,
        puntos: pos.puntos_totales || 0,
        numeroAuto: numeroAutoMap.get(pos.piloto_id) || undefined,
      }));

    return {
      id: championshipData.id,
      nombre: championshipData.nombre,
      anio: championshipData.anio,
      standings: sortedPositions,
    };
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

// Función para obtener estadísticas generales
async function getChampionshipStats(): Promise<ChampionshipStats> {
  try {
    const currentYear = new Date().getFullYear();
    
    // Obtener total de carreras
    const { count: totalRaces } = await supabase
      .from('fechas')
      .select(`
        id,
        campeonato:campeonatos!inner(anio)
      `, { count: 'exact', head: true })
      .eq('campeonato.anio', currentYear);

    // Obtener carreras completadas
    const today = new Date().toISOString().split('T')[0];
    const { count: completedRaces } = await supabase
      .from('fechas')
      .select(`
        id,
        campeonato:campeonatos!inner(anio)
      `, { count: 'exact', head: true })
      .eq('campeonato.anio', currentYear)
      .lt('fecha_desde', today);

    // Obtener pilotos activos
    const { count: activePilots } = await supabase
      .from('pilotos_campeonato')
      .select(`
        id,
        campeonato:campeonatos!inner(anio)
      `, { count: 'exact', head: true })
      .eq('campeonato.anio', currentYear);

    return {
      totalRaces: totalRaces || 0,
      completedRaces: completedRaces || 0,
      remainingRaces: (totalRaces || 0) - (completedRaces || 0),
      activePilots: activePilots || 0,
    };
  } catch (err) {
    console.error('Error fetching stats:', err);
    return {
      totalRaces: 0,
      completedRaces: 0,
      remainingRaces: 0,
      activePilots: 0,
    };
  }
}

// Función para obtener la última carrera con resultados
async function getLatestRace(): Promise<RaceWithDetails | null> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('fechas')
      .select(`
        id,
        nombre,
        fecha_desde,
        fecha_hasta,
        campeonato_id,
        campeonato:campeonatos(id, nombre, anio),
        entrenamientos(id, numero, piloto_id, tiempo, posicion, piloto:pilotos(nombre, pais)),
        clasificacion(id, piloto_id, tiempo, posicion, piloto:pilotos(nombre, pais)),
        series_clasificatorias(id, numero, piloto_id, posicion, puntos,tiempo,vueltas, piloto:pilotos(nombre, pais)),
        carrera_final(id, piloto_id, posicion, puntos, presente,tiempo,vueltas,excluido, piloto:pilotos(nombre, pais))
      `)
      .lte('fecha_desde', today)
      .order('fecha_desde', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching latest race:', error.message);
      return null;
    }

    if (data) {
      const raceDate = new Date(data.fecha_desde);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);

      let status: 'completed' | 'live' | 'upcoming' = 'completed';
      if (raceDate.toDateString() === todayDate.toDateString()) {
        status = 'live';
      }
      console.log('fetch de mega data',data);
      return {
        id: data.id,
        nombre: data.nombre,
        fecha_desde: data.fecha_desde,
        fecha_hasta: data.fecha_hasta || undefined,
        campeonato_id: data.campeonato_id,
        campeonato: Array.isArray(data.campeonato) ? data.campeonato[0] : data.campeonato,
        status,
        entrenamientos: (data.entrenamientos || []).map((item: any) => ({
          ...item,
          fecha_id: data.id,
          piloto: Array.isArray(item.piloto) ? item.piloto[0] : item.piloto,
        })),
        clasificacion: (data.clasificacion || []).map((item: any) => ({
          ...item,
          fecha_id: data.id,
          piloto: Array.isArray(item.piloto) ? item.piloto[0] : item.piloto,
        })),
        series_clasificatorias: (data.series_clasificatorias || []).map((serie: any) => ({
          ...serie,
          fecha_id: data.id,
          piloto: Array.isArray(serie.piloto) ? serie.piloto[0] : serie.piloto,
        })),
        carrera_final: (data.carrera_final || []).map((item: any) => ({
          ...item,
          fecha_id: data.id,
          piloto: Array.isArray(item.piloto) ? item.piloto[0] : item.piloto,
        })),
      };
    }
    return null;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

export default async function HomePage() {
  const [nextRace, allRaces, championship, stats, latestRace] = await Promise.all([
    getNextRace(),
    getAllRaces(),
    getCurrentChampionship(),
    getChampionshipStats(),
    getLatestRace(),
  ]);

  console.log('Server data loaded:', {
    nextRace: !!nextRace,
    racesCount: allRaces.length,
    championship: !!championship,
    stats,
    latestRace: !!latestRace,
  });

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main>
        <section id="inicio">
          <HeroSection raceData={nextRace} stats={stats} />
        </section>
        <section id="campeonato">
          <ChampionshipSection championship={championship} stats={stats} latestRace={latestRace} />
        </section>
        <section id="calendario">
          <CalendarSection races={allRaces} stats={stats} />
        </section>
        <section id="galeria">
          <GallerySection />
        </section>
        <section id="contacto">
          <Footer />
        </section>
      </main>
    </div>
  );
}
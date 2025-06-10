// app/page.tsx
import { supabase } from '@/lib/utils';
import Navigation from '@/components/layout/Navigation';
import HeroSection from '@/components/ui/HeroSeccion';
import ChampionshipSection from '@/components/ui/CampeonatoSeccion';
import CalendarSection from '@/components/ui/CalendarioSeccion';
import GallerySection from '@/components/ui/GaleriaSeccion';
import Footer from '@/components/layout/Footer';
import { RaceWithDetails, ChampionshipWithStandings, ChampionshipStats, NextRaceData } from '@/types/championship';

// Función para obtener la próxima carrera
// app/page.tsx
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
        campeonato:campeonatos(nombre, anio),
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
        fecha_hasta: data.fecha_hasta,
        campeonato: data.campeonato,
        circuitoNombre: data.circuito?.nombre || 'Circuito no especificado',
        circuitoDistancia: data.circuito?.distancia || null,
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
        campeonato:campeonatos(nombre, anio),
        circuito:circuitos(nombre, distancia)
      `)
      .eq('campeonatos.anio', currentYear)
      .order('fecha_desde', { ascending: true });

    if (error) {
      console.error('Error fetching all races:', error.message);
      return [];
    }

    if (data) {
      const racesWithStatus = data.map(race => {
        const raceDate = new Date(race.fecha_desde);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let status: 'completed' | 'live' | 'upcoming' = 'upcoming';
        if (raceDate < today) {
          status = 'completed';
        } else if (raceDate.toDateString() === today.toDateString()) {
          status = 'live';
        }

        return {
          id: race.id,
          nombre: race.nombre,
          fecha_desde: race.fecha_desde,
          fecha_hasta: race.fecha_hasta,
          campeonato: race.campeonato,
          circuitoNombre: race.circuito?.nombre || 'Circuito no especificado',
          circuitoDistancia: race.circuito?.distancia || null,
          status,
        };
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
// app/page.tsx
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
      pilotosCampeonatoData.map(item => [item.piloto_id, item.numero_auto])
    );

    // Combine data
    const sortedPositions = championshipData.posiciones_campeonato
      ?.sort((a, b) => (b.puntos_totales || 0) - (a.puntos_totales || 0))
      .map((pos, index) => ({
        position: index + 1,
        piloto: pos.piloto,
        puntos: pos.puntos_totales || 0,
        numeroAuto: numeroAutoMap.get(pos.piloto_id) || null,
      }));

    return {
      id: championshipData.id,
      nombre: championshipData.nombre,
      anio: championshipData.anio,
      standings: sortedPositions || [],
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
    
    const { count: totalRaces } = await supabase
      .from('fechas')
      .select('*', { count: 'exact', head: true })
      .eq('campeonatos.anio', currentYear);

    const today = new Date().toISOString().split('T')[0];
    const { count: completedRaces } = await supabase
      .from('fechas')
      .select('*', { count: 'exact', head: true })
      .eq('campeonatos.anio', currentYear)
      .lt('fecha_desde', today);

    const { count: activePilots } = await supabase
      .from('pilotos_campeonato')
      .select('*', { count: 'exact', head: true })
      .eq('campeonatos.anio', currentYear);

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
        campeonato:campeonatos(nombre, anio),
        entrenamientos(id, numero, piloto_id, tiempo, posicion, piloto:pilotos(nombre, pais)),
        clasificacion(id, piloto_id, tiempo, posicion, piloto:pilotos(nombre, pais)),
        series_clasificatorias(id, numero, piloto_id, posicion, puntos, piloto:pilotos(nombre, pais)),
        carrera_final(id, piloto_id, posicion, puntos, presente, piloto:pilotos(nombre, pais))
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

      return {
        id: data.id,
        nombre: data.nombre,
        fecha_desde: data.fecha_desde,
        fecha_hasta: data.fecha_hasta,
        campeonato: data.campeonato,
        status,
        entrenamientos: data.entrenamientos || [],
        clasificacion: data.clasificacion || [],
        series_clasificatorias: data.series_clasificatorias || [],
        carrera_final: data.carrera_final || [],
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
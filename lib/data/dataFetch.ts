import { supabase } from '@/lib/utils';
import { parseDate } from '@/lib/utils';
import {
  RaceWithDetails,
  ChampionshipWithStandings,
  ChampionshipStats,
  NextRaceData,
  Campeonato,
  Circuito,
  Piloto,
  ChampionshipStanding,
  GalleryImage,
  PilotoCampeonato
} from '@/types/championship';

// Función para obtener todas las imágenes más recientes
export async function getLatestImages(): Promise<GalleryImage[]> {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Obtener la fecha_desde más reciente
    const { data: latestFecha, error: fechaError } = await supabase
      .from('fechas')
      .select('fecha_desde')
      .lte('fecha_desde', today)
      .order('fecha_desde', { ascending: false })
      .limit(1)
      .single();

    if (fechaError || !latestFecha) {
      console.error('Error fetching latest fecha:', fechaError?.message || 'No fecha found');
      return [];
    }

    // Obtener imágenes para la fecha más reciente
    const { data, error } = await supabase
      .from('imagenes')
      .select(`
        id,
        titulo,
        descripcion,
        url_cloudinary,
        fechas (fecha_desde)
      `)
      .eq('fechas.fecha_desde', latestFecha.fecha_desde)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching latest images:', error.message);
      return [];
    }

    const formattedImages = data?.map((img) => ({
      id: img.id,
      title: img.titulo,
      description: img.descripcion || '',
      image: img.url_cloudinary,
      date: new Date(
        Array.isArray(img.fechas)
          ? ((img.fechas[0] as { fecha_desde?: string })?.fecha_desde ?? '')
          : ((img.fechas as { fecha_desde?: string })?.fecha_desde ?? '')
      ).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    })) || [];

    return formattedImages.sort(() => Math.random() - 0.5);
  } catch (err) {
    console.error('Unexpected error:', err);
    return [];
  }
}

// Función para obtener la próxima carrera
export async function getNextRace(): Promise<NextRaceData | null> {
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
      .single() as unknown as {
        data: {
          id: string;
          nombre: string;
          fecha_desde: string;
          fecha_hasta?: string;
          campeonato?: Campeonato;
          circuito?: Circuito;
        }, error: any
      };

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
        campeonato: data.campeonato,
        circuitoNombre: data.circuito?.nombre || '',
        circuitoDistancia: data.circuito?.distancia || undefined,
      };
    }
    return null;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

// Función para obtener todas las fechas del año actual
export async function getAllRaces(): Promise<RaceWithDetails[]> {
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
      .order('fecha_desde', { ascending: true }) as unknown as { data: any[]; error: any };

    if (error) {
      console.error('Error fetching all races:', error.message);
      return [];
    }

    if (data) {
      // Obtener números de auto para el campeonato actual
      const { data: pilotosCampeonatoData, error: pcError } = await supabase
        .from('pilotos_campeonato')
        .select('piloto_id, numero_auto, campeonato_id')
        .eq('campeonato_id', data[0]?.campeonato_id); // Usar el campeonato_id de la primera carrera

      const numeroAutoMap = new Map<string, number>(
        (pilotosCampeonatoData || []).map((pc: any) => [pc.piloto_id, pc.numero_auto])
      );

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

        const winnerEntry = race.carrera_final?.find((final: any) => final.posicion === 1);
        const winner = winnerEntry?.piloto?.nombre || 'No disponible';

        return {
          id: race.id,
          nombre: race.nombre,
          fecha_desde: race.fecha_desde,
          fecha_hasta: race.fecha_hasta || undefined,
          campeonato_id: race.campeonato_id,
          campeonato: race.campeonato,
          circuitoNombre: race.circuito?.nombre || 'Circuito no especificado',
          circuitoDistancia: race.circuito?.distancia || undefined,
          status,
          carrera_final: (race.carrera_final || []).map((item: any) => ({
            ...item,
            fecha_id: race.id,
            piloto: Array.isArray(item.piloto) ? item.piloto[0] : item.piloto,
            numeroAuto: numeroAutoMap.get(item.piloto_id), // AGREGADO
          })),
          winner,
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
export async function getCurrentChampionship(): Promise<ChampionshipWithStandings | null> {
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
      .single() as unknown as { data: Campeonato & { posiciones_campeonato: { id: string; puntos_totales: number; piloto_id: string; piloto: Piloto | Piloto[]; }[] }, error: any };

    if (championshipError) {
      console.error('Error fetching championship:', championshipError.message);
      return null;
    }

    if (!championshipData) {
      return null;
    }

    const { data: pilotosCampeonatoData, error: pilotosCampeonatoError } = await supabase
      .from('pilotos_campeonato')
      .select(`
        piloto_id,
        numero_auto
      `)
      .eq('campeonato_id', championshipData.id) as unknown as { data: PilotoCampeonato[]; error: any };

    if (pilotosCampeonatoError) {
      console.error('Error fetching pilotos_campeonato:', pilotosCampeonatoError.message);
      return null;
    }

    const numeroAutoMap = new Map(
      (pilotosCampeonatoData || []).map(item => [item.piloto_id, item.numero_auto])
    );

    const sortedPositions: ChampionshipStanding[] = (championshipData.posiciones_campeonato || [])
      .sort((a, b) => (b.puntos_totales || 0) - (a.puntos_totales || 0))
      .map((pos, index) => ({
        position: index + 1,
        piloto: Array.isArray(pos.piloto) ? pos.piloto[0] : pos.piloto,
        puntos: pos.puntos_totales || 0,
        numeroAuto: numeroAutoMap.get(pos.piloto_id) || undefined,
      }));
    console.log("fetch getcurrentchamp", championshipData, sortedPositions)
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
export async function getChampionshipStats(): Promise<ChampionshipStats> {
  try {
    const currentYear = new Date().getFullYear();

    const { count: totalRaces } = await supabase
      .from('fechas')
      .select(`
        id,
        campeonato:campeonatos!inner(anio)
      `, { count: 'exact', head: true })
      .eq('campeonato.anio', currentYear);

    const today = new Date().toISOString().split('T')[0];
    const { count: completedRaces } = await supabase
      .from('fechas')
      .select(`
        id,
        campeonato:campeonatos!inner(anio)
      `, { count: 'exact', head: true })
      .eq('campeonato.anio', currentYear)
      .lt('fecha_desde', today);

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
export async function getLatestRace(): Promise<RaceWithDetails | null> {
  try {
    const today = new Date().toISOString().split('T')[0];

    // 1. Traer la última fecha
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
        series_clasificatorias(id, numero, piloto_id, posicion, puntos, tiempo, vueltas, excluido, piloto:pilotos(nombre, pais)),
        carrera_final(id, piloto_id, posicion, puntos, presente, tiempo, vueltas, excluido, piloto:pilotos(nombre, pais))
      `)
      .lte('fecha_desde', today)
      .order('fecha_desde', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      console.error('Error fetching latest race:', error?.message);
      return null;
    }

    // 2. Traer los pilotos_campeonato para esa carrera
    const { data: pilotosCampeonato, error: pcError } = await supabase
      .from('pilotos_campeonato')
      .select('piloto_id, numero_auto')
      .eq('campeonato_id', data.campeonato_id);

    if (pcError) {
      console.error('Error fetching pilotoCampeonato:', pcError.message);
      return null;
    }

    const numeroAutoMap = new Map<string, number>(
      (pilotosCampeonato || []).map((pc: any) => [pc.piloto_id, pc.numero_auto])
    );

    const addNumeroAuto = (item: any) => ({
      ...item,
      fecha_id: data.id,
      piloto: Array.isArray(item.piloto) ? item.piloto[0] : item.piloto,
      numeroAuto: numeroAutoMap.get(item.piloto_id),
    });

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
      fecha_hasta: data.fecha_hasta || undefined,
      campeonato_id: data.campeonato_id,
      campeonato: Array.isArray(data.campeonato) ? data.campeonato[0] : data.campeonato,
      status,
      entrenamientos: (data.entrenamientos || []).map(addNumeroAuto),
      clasificacion: (data.clasificacion || []).map(addNumeroAuto),
      series_clasificatorias: (data.series_clasificatorias || []).map(addNumeroAuto),
      carrera_final: (data.carrera_final || []).map(addNumeroAuto),
    };
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}


// Función para obtener todos los campeonatos (para el dropdown)
export async function getAllChampionships(): Promise<Campeonato[]> {
  try {
    const { data, error } = await supabase
      .from('campeonatos')
      .select('id, nombre, anio')
      .order('anio', { ascending: false });

    if (error) {
      console.error('Error fetching all championships:', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error:', err);
    return [];
  }
}

// Función para obtener un campeonato específico con standings
export async function getChampionshipWithStandings(championshipId: string): Promise<ChampionshipWithStandings | null> {
  try {
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
      .eq('id', championshipId)
      .single() as unknown as { data: Campeonato & { posiciones_campeonato: { id: string; puntos_totales: number; piloto_id: string; piloto: Piloto | Piloto[]; }[] }, error: any };

    if (championshipError) {
      console.error('Error fetching championship:', championshipError.message);
      return null;
    }

    if (!championshipData) {
      return null;
    }

    const { data: pilotosCampeonatoData, error: pilotosCampeonatoError } = await supabase
      .from('pilotos_campeonato')
      .select(`
        piloto_id,
        numero_auto
      `)
      .eq('campeonato_id', championshipData.id) as unknown as { data: PilotoCampeonato[]; error: any };

    if (pilotosCampeonatoError) {
      console.error('Error fetching pilotos_campeonato:', pilotosCampeonatoError.message);
      return null;
    }

    const numeroAutoMap = new Map(
      (pilotosCampeonatoData || []).map(item => [item.piloto_id, item.numero_auto])
    );

    const sortedPositions: ChampionshipStanding[] = (championshipData.posiciones_campeonato || [])
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

// Función para obtener todas las carreras de un campeonato específico
export async function getChampionshipRaces(championshipId: string): Promise<RaceWithDetails[]> {
  try {
    const { data, error } = await supabase
      .from('fechas')
      .select(`
        id,
        nombre,
        fecha_desde,
        fecha_hasta,
        campeonato_id,
        campeonato:campeonatos(nombre, anio),
        circuito:circuitos(nombre, distancia),
        entrenamientos(id, numero, piloto_id, tiempo, posicion, piloto:pilotos(nombre, pais)),
        clasificacion(id, piloto_id, tiempo, posicion, piloto:pilotos(nombre, pais)),
        series_clasificatorias(id, numero, piloto_id, posicion, puntos,tiempo,vueltas, piloto:pilotos(nombre, pais)),
        carrera_final(id, piloto_id, posicion, puntos, presente,tiempo,vueltas,excluido, piloto:pilotos(nombre, pais))
      `)
      .eq('campeonato_id', championshipId)
      .order('fecha_desde', { ascending: true }) as unknown as { data: any[]; error: any };

    if (error) {
      console.error('Error fetching championship races:', error.message);
      return [];
    }

    if (data) {
      // Obtener números de auto para este campeonato
      const { data: pilotosCampeonatoData, error: pcError } = await supabase
        .from('pilotos_campeonato')
        .select('piloto_id, numero_auto')
        .eq('campeonato_id', championshipId);

      if (pcError) {
        console.error('Error fetching pilotoCampeonato:', pcError.message);
      }

      const numeroAutoMap = new Map<string, number>(
        (pilotosCampeonatoData || []).map((pc: any) => [pc.piloto_id, pc.numero_auto])
      );

      const addNumeroAuto = (item: any) => ({
        ...item,
        fecha_id: data.find(race => race.id === item.fecha_id)?.id || item.fecha_id,
        piloto: Array.isArray(item.piloto) ? item.piloto[0] : item.piloto,
        numeroAuto: numeroAutoMap.get(item.piloto_id),
      });

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

        const winnerEntry = race.carrera_final?.find((final: any) => final.posicion === 1);
        const winner = winnerEntry?.piloto?.nombre || 'No disponible';

        return {
          id: race.id,
          nombre: race.nombre,
          fecha_desde: race.fecha_desde,
          fecha_hasta: race.fecha_hasta || undefined,
          campeonato_id: race.campeonato_id,
          campeonato: race.campeonato,
          circuitoNombre: race.circuito?.nombre || 'Circuito no especificado',
          circuitoDistancia: race.circuito?.distancia || undefined,
          status,
          entrenamientos: (race.entrenamientos || []).map((item: any) => ({
            ...addNumeroAuto(item),
            fecha_id: race.id, // Asegurar que fecha_id esté correcto
          })),
          clasificacion: (race.clasificacion || []).map((item: any) => ({
            ...addNumeroAuto(item),
            fecha_id: race.id,
          })),
          series_clasificatorias: (race.series_clasificatorias || []).map((serie: any) => ({
            ...addNumeroAuto(serie),
            fecha_id: race.id,
          })),
          carrera_final: (race.carrera_final || []).map((item: any) => ({
            ...addNumeroAuto(item),
            fecha_id: race.id,
          })),
          winner,
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
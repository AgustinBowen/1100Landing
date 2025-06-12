// types/championship.ts
export interface Piloto {
  id: string;
  nombre: string;
  pais?: string;
}

export interface Campeonato {
  id: string;
  nombre: string;
  anio: number;
}

export interface Circuito {
  id: string;
  nombre: string;
  distancia?: number;
}


export interface Fecha {
  id: string;
  nombre: string;
  fecha_desde: string;
  fecha_hasta?: string;
  campeonato_id: string;
  circuito_id?: string;
  campeonato?: Campeonato;
  circuito?: Circuito;
  status?: 'completed' | 'live' | 'upcoming';
}

export interface Entrenamiento {
  id: string;
  fecha_id: string;
  numero: number;
  piloto_id: string;
  tiempo?: number;
  posicion?: number;
  piloto?: Piloto;
}

export interface Clasificacion {
  id: string;
  fecha_id: string;
  piloto_id: string;
  tiempo?: number;
  posicion: number;
  piloto?: Piloto;
}

export interface SerieClasificatoria {
  id: string;
  fecha_id: string;
  numero: number;
  piloto_id: string;
  posicion?: number;
  puntos: number;
  piloto?: Piloto;
  tiempo?:number;
  vueltas?:number;
  excluido?:boolean;
}

export interface CarreraFinal {
  id: string;
  fecha_id: string;
  piloto_id: string;
  posicion?: number;
  puntos: number;
  presente: boolean;
  piloto?: Piloto;
  vueltas?:number;
  tiempo?:number;
  excluido?:boolean;
}

export interface PilotoCampeonato {
  id: string;
  piloto_id: string;
  campeonato_id: string;
  numero_auto: number;
  piloto?: Piloto;
  campeonato?: Campeonato;
}

export interface PosicionCampeonato {
  id: string;
  campeonato_id: string;
  piloto_id: string;
  puntos_totales: number;
  piloto?: Piloto;
}

export interface PuntajePosicion {
  tipo: 'serie' | 'final';
  posicion: number;
  puntos: number;
}

export interface RaceWithDetails extends Fecha {
  entrenamientos?: Entrenamiento[];
  clasificacion?: Clasificacion[];
  series_clasificatorias?: SerieClasificatoria[];
  carrera_final?: CarreraFinal[];
  winner?: string;
  circuitoNombre?: string;
  circuitoDistancia?: number;
}

export interface ChampionshipStanding {
  position: number;
  piloto: Piloto;
  puntos: number;
  numeroAuto?: number;
}

export interface ChampionshipWithStandings extends Campeonato {
  standings: ChampionshipStanding[];
}

export interface ChampionshipStats {
  totalRaces: number;
  completedRaces: number;
  remainingRaces: number;
  activePilots: number;
}

export interface NextRaceData {
  id: string;
  nombre: string;
  fecha_desde: string;
  fecha_hasta?: string;
  campeonato?: Campeonato;
  circuitoNombre?: string;
  circuitoDistancia?: number;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

export interface CalendarSectionProps {
  races: RaceWithDetails[];
  stats: ChampionshipStats;
}

export interface ChampionshipSectionProps {
  championship: ChampionshipWithStandings | null;
  stats: ChampionshipStats;
  latestRace: RaceWithDetails | null;
}

export interface HeroSectionProps {
  raceData: NextRaceData | null;
  stats: ChampionshipStats;
}

export interface GallerySectionProps {
  images: GalleryImage[];
}
import { useMemo } from 'react';
import { RaceWithDetails, CarreraFinal, SerieClasificatoria, Clasificacion, Entrenamiento } from '@/types/championship';

interface RaceResult {
  id: string;
  piloto: {
    id: string;
    nombre: string;
    pais?: string;
  };
  posicion?: number;
  numeroAuto?: number;
  tiempo?: string | number;
  vueltas?: number;
  excluido?: boolean;
  puntos?: number;
}

export function useRaceResult(race: RaceWithDetails | null) {
  const results = useMemo(() => {
    if (!race) return [];

    let raceResults: RaceResult[] = [];

    // Prioridad: Carrera Final > Series Clasificatorias > Clasificación > Entrenamientos
    if (race.carrera_final && race.carrera_final.length > 0) {
      raceResults = race.carrera_final
        .filter((result: CarreraFinal) => result.presente) // Solo pilotos presentes
        .map((result: CarreraFinal) => ({
          id: result.id,
          piloto: result.piloto!,
          posicion: result.posicion,
          tiempo: result.tiempo,
          vueltas: result.vueltas,
          excluido: result.excluido,
          puntos: result.puntos,
        }))
        .sort((a, b) => {
          // Excluidos van al final
          if (a.excluido && !b.excluido) return 1;
          if (!a.excluido && b.excluido) return -1;
          
          // Ordenar por posición
          const posA = a.posicion || 999;
          const posB = b.posicion || 999;
          return posA - posB;
        });
    } else if (race.series_clasificatorias && race.series_clasificatorias.length > 0) {
      // Agrupar por piloto y tomar la mejor posición
      const pilotosMap = new Map<string, RaceResult>();
      
      race.series_clasificatorias.forEach((serie: SerieClasificatoria) => {
        if (!serie.piloto) return;
        
        const pilotoId = serie.piloto.id;
        const existing = pilotosMap.get(pilotoId);
        
        if (!existing || (serie.posicion && (!existing.posicion || serie.posicion < existing.posicion))) {
          pilotosMap.set(pilotoId, {
            id: serie.id,
            piloto: serie.piloto,
            posicion: serie.posicion,
            tiempo: serie.tiempo,
            vueltas: serie.vueltas,
            excluido: serie.excluido,
            puntos: serie.puntos,
          });
        }
      });
      
      raceResults = Array.from(pilotosMap.values())
        .sort((a, b) => {
          if (a.excluido && !b.excluido) return 1;
          if (!a.excluido && b.excluido) return -1;
          
          const posA = a.posicion || 999;
          const posB = b.posicion || 999;
          return posA - posB;
        });
    } else if (race.clasificacion && race.clasificacion.length > 0) {
      raceResults = race.clasificacion
        .map((result: Clasificacion) => ({
          id: result.id,
          piloto: result.piloto!,
          posicion: result.posicion,
          tiempo: result.tiempo,
        }))
        .sort((a, b) => {
          const posA = a.posicion || 999;
          const posB = b.posicion || 999;
          return posA - posB;
        });
    } else if (race.entrenamientos && race.entrenamientos.length > 0) {
      // Tomar el mejor tiempo de cada piloto
      const pilotosMap = new Map<string, RaceResult>();
      
      race.entrenamientos.forEach((training: Entrenamiento) => {
        if (!training.piloto) return;
        
        const pilotoId = training.piloto.id;
        const existing = pilotosMap.get(pilotoId);
        
        if (!existing || (training.posicion && (!existing.posicion || training.posicion < existing.posicion))) {
          pilotosMap.set(pilotoId, {
            id: training.id,
            piloto: training.piloto,
            posicion: training.posicion,
            tiempo: training.tiempo,
          });
        }
      });
      
      raceResults = Array.from(pilotosMap.values())
        .sort((a, b) => {
          const posA = a.posicion || 999;
          const posB = b.posicion || 999;
          return posA - posB;
        });
    }

    return raceResults;
  }, [race]);

  return { results };
}
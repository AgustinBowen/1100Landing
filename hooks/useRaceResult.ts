import { useState, useEffect, useMemo } from 'react';
import { RaceWithDetails, RaceResult } from '@/types/championship';

export type RaceResultType = 
  | 'carrera_final' 
  | 'series_clasificatorias_1' 
  | 'series_clasificatorias_2' 
  | 'series_clasificatorias_3' 
  | 'clasificacion' 
  | 'entrenamientos_1'
  | 'entrenamientos_2'
  | 'entrenamientos_3'
  | 'entrenamientos_4'
  // Permitir cualquier string que termine con un número para entrenamientos dinámicos
  | string;

export function useRaceResult(selectedRace: RaceWithDetails | null) {
  const [raceResultType, setRaceResultType] = useState<string>('carrera_final');

  // Reset cuando cambia la carrera seleccionada
  useEffect(() => {
    if (selectedRace) {
      setRaceResultType('carrera_final');
    }
  }, [selectedRace?.id]);

  const results: RaceResult[] = useMemo(() => {
    if (!selectedRace) return [];

    let rawResults: any[] = [];

    switch (true) {
      case raceResultType === 'carrera_final':
        rawResults = selectedRace.carrera_final || [];
        break;
      
      case raceResultType === 'clasificacion':
        rawResults = selectedRace.clasificacion || [];
        break;
      
      case raceResultType.startsWith('series_clasificatorias_'):
        const serieNumber = parseInt(raceResultType.split('_')[2]);
        rawResults = (selectedRace.series_clasificatorias || [])
          .filter(serie => serie.numero === serieNumber);
        break;
      
      case raceResultType.startsWith('entrenamientos_'):
        const entrenamientoNumber = parseInt(raceResultType.split('_')[1]);
        rawResults = (selectedRace.entrenamientos || [])
          .filter(entrenamiento => entrenamiento.numero === entrenamientoNumber);
        break;
      
      default:
        rawResults = [];
    }

    // Convertir a RaceResult y ordenar por posición
    const mappedResults: RaceResult[] = rawResults.map(result => ({
      id: result.id,
      fecha_id: result.fecha_id,
      piloto_id: result.piloto_id,
      piloto: result.piloto,
      posicion: result.posicion,
      numeroAuto: result.numeroAuto,
      tiempo: result.tiempo,
      vueltas: result.vueltas,
      excluido: result.excluido,
      puntos: result.puntos,
      presente: result.presente,
    }));

    // Ordenar por posición (null/undefined al final)
    return mappedResults.sort((a, b) => {
      if (a.posicion == null && b.posicion == null) return 0;
      if (a.posicion == null) return 1;
      if (b.posicion == null) return -1;
      return a.posicion - b.posicion;
    });
  }, [selectedRace, raceResultType]);

  return {
    raceResultType,
    setRaceResultType,
    results,
  };
}
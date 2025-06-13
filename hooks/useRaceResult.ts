import { useState } from "react";
import { RaceWithDetails } from "@/types/championship";

// Define the result type as a union type
export type RaceResultType = 
  | "carrera_final" 
  | "series_clasificatorias_1" 
  | "series_clasificatorias_2" 
  | "series_clasificatorias_3" 
  | "clasificacion" 
  | "entrenamientos";

/**
 * Hook para gestionar el tipo de resultado de carrera y obtener los datos correspondientes.
 * @param race - Objeto de carrera con detalles (opcional).
 * @param defaultResultType - Tipo de resultado inicial (por defecto: "carrera_final").
 * @returns Objeto con el tipo de resultado activo, función para cambiarlo, y datos de resultados.
 */
export function useRaceResult(
  race: RaceWithDetails | null,
  defaultResultType: RaceResultType = "carrera_final"
) {
  const [raceResultType, setRaceResultType] = useState<RaceResultType>(defaultResultType);

  const getSeriesData = (serieNumber: number) => {
    return race?.series_clasificatorias?.filter((serie) => serie.numero === serieNumber) || [];
  };

  const getResults = () => {
    if (!race) return [];

    switch (raceResultType) {
      case "carrera_final":
        return race.carrera_final?.sort((a, b) => (a.posicion || 999) - (b.posicion || 999)) || [];
      case "series_clasificatorias_1":
        return getSeriesData(1).sort((a, b) => (a.posicion || 999) - (b.posicion || 999));
      case "series_clasificatorias_2":
        return getSeriesData(2).sort((a, b) => (a.posicion || 999) - (b.posicion || 999));
      case "series_clasificatorias_3":
        return getSeriesData(3).sort((a, b) => (a.posicion || 999) - (b.posicion || 999));
      case "clasificacion":
        return race.clasificacion?.sort((a, b) => (a.posicion || 999) - (b.posicion || 999)) || [];
      case "entrenamientos":
        return race.entrenamientos?.sort((a, b) => (a.posicion || 999) - (b.posicion || 999)) || [];
      default:
        return [];
    }
  };

  // Create a type-safe setter function
  const setRaceResultTypeSafe = (newType: string) => {
    const validTypes: RaceResultType[] = [
      "carrera_final",
      "series_clasificatorias_1", 
      "series_clasificatorias_2",
      "series_clasificatorias_3",
      "clasificacion",
      "entrenamientos"
    ];
    
    if (validTypes.includes(newType as RaceResultType)) {
      setRaceResultType(newType as RaceResultType);
    } else {
      console.warn(`Invalid race result type: ${newType}. Defaulting to carrera_final.`);
      setRaceResultType("carrera_final");
    }
  };

  return {
    raceResultType,
    setRaceResultType: setRaceResultTypeSafe,
    results: getResults(),
  };
}
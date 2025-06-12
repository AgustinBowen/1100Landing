import { useState } from "react";
import { RaceWithDetails } from "@/types/championship";

/**
 * Hook para gestionar el tipo de resultado de carrera y obtener los datos correspondientes.
 * @param race - Objeto de carrera con detalles (opcional).
 * @param defaultResultType - Tipo de resultado inicial (por defecto: "carrera_final").
 * @returns Objeto con el tipo de resultado activo, función para cambiarlo, y datos de resultados.
 */
export function useRaceResult(
  race: RaceWithDetails | null,
  defaultResultType: "carrera_final" | "series_clasificatorias_1" | "series_clasificatorias_2" | "series_clasificatorias_3" | "clasificacion" | "entrenamientos" = "carrera_final"
) {
  const [raceResultType, setRaceResultType] = useState<
    "carrera_final" | "series_clasificatorias_1" | "series_clasificatorias_2" | "series_clasificatorias_3" | "clasificacion" | "entrenamientos"
  >(defaultResultType);

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

  return {
    raceResultType,
    setRaceResultType,
    results: getResults(),
  };
}

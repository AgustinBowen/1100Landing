import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Hook para gestionar la selección del año del campeonato y la navegación.
 * @param currentYear - Año actualmente seleccionado.
 * @returns Objeto con el año actual y una función para cambiarlo.
 */
export function useChampionshipYear(currentYear: number) {
  const router = useRouter();

  const changeYear = useCallback(
    (year: number) => {
      router.push(`/resultados?year=${year}`);
    },
    [router]
  );

  return {
    currentYear,
    changeYear,
  };
}

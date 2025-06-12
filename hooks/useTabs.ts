import { useState } from "react";

/**
 * Hook para gestionar el estado de pestañas y el cambio entre ellas.
 * @param defaultTab - ID de la pestaña inicial.
 * @returns Objeto con el estado de la pestaña activa y una función para cambiarla.
 */
export function useTabs(defaultTab: string) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return {
    activeTab,
    setActiveTab,
  };
}

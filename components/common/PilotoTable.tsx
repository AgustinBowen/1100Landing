import { PilotoRow } from "./PilotoRow";
import { PilotoTableHeader } from "../ui/PilotoTableHeader";
import { formatearTiempo } from "@/lib/utils";

export function PilotoTable({
  pilotos,
  config,
}: {
  pilotos: {
    id?: string;
    piloto?: { nombre: string; pais?: string };
    nombre?: string;
    posicion: number;
    numeroAuto?: number;
    puntos?: number;
    vueltas?: number;
    tiempo?: string | number;
    excluido?: boolean;
  }[];
  config?: {
    showAuto?: boolean;
    showPuntos?: boolean;
    showTiempo?: boolean;
    showVueltas?: boolean;
  };
}) {
  const headerConfig = {
    showAuto: true,
    showPuntos: true,
    showTiempo: false,
    showVueltas: false,
    ...config,
  };

  return (
    <div>
      <PilotoTableHeader {...headerConfig} />
      {pilotos.map((p, index) => (
        <PilotoRow
          key={p.id || index}
          position={p.posicion || index + 1}
          nombre={p.piloto?.nombre || p.nombre || ""}
          pais={p.piloto?.pais}
          numeroAuto={p.numeroAuto}
          puntos={p.puntos}
          vueltas={p.vueltas}
          tiempo={p.tiempo ? formatearTiempo(p.tiempo.toString()) : undefined}
          excluido={p.excluido}
        />
      ))}
    </div>
  );
}

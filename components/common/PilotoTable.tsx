import { PilotoRow } from "./PilotoRow";
import { PilotoTableHeader } from "../ui/PilotoTableHeader";
import { formatearTiempo } from "@/lib/utils";
import { Piloto } from "@/types/championship";

interface PilotoTableData {
  id?: string;
  piloto?: Piloto;
  nombre?: string;
  posicion: number;
  numeroAuto?: number;
  puntos?: number;
  vueltas?: number;
  tiempo?: string | number;
  excluido?: boolean;
}

interface PilotoTableConfig {
  showAuto?: boolean;
  showPuntos?: boolean;
  showTiempo?: boolean;
  showVueltas?: boolean;
}

interface PilotoTableProps {
  pilotos: PilotoTableData[];
  config?: PilotoTableConfig;
  variant?: "championship" | "race";
}

export function PilotoTable({
  pilotos,
  config,
  variant = "championship"
}: PilotoTableProps) {
  const headerConfig = {
    showAuto: true,
    showPuntos: true,
    showTiempo: false,
    showVueltas: false,
    ...config,
    variant
  };

  return (
    <div>
      <PilotoTableHeader {...headerConfig} />
      <div>
        {pilotos.map((p, index) => (
          <PilotoRow
            key={p.id || `${p.piloto?.id}-${index}` || index}
            position={p.posicion || index + 1}
            nombre={p.piloto?.nombre || p.nombre || "Sin nombre"}
            pais={p.piloto?.pais}
            numeroAuto={p.numeroAuto}
            puntos={p.puntos}
            vueltas={p.vueltas}
            tiempo={p.tiempo ? formatearTiempo(p.tiempo.toString()) : undefined}
            excluido={p.excluido}
            variant={variant}
          />
        ))}
        {pilotos.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            No hay datos disponibles
          </div>
        )}
      </div>
    </div>
  );
}
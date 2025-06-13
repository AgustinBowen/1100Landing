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
  isLoading?: boolean;
  skeletonRows?: number;
}

// Componente Skeleton para una fila
function PilotoRowSkeleton({ 
  showAuto = true, 
  showPuntos = true, 
  showTiempo = false, 
  showVueltas = false 
}: {
  showAuto?: boolean;
  showPuntos?: boolean;
  showTiempo?: boolean;
  showVueltas?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800 animate-pulse">
      <div className="flex items-center gap-4 flex-1">
        {/* Posición */}
        <div className="w-8 h-6 bg-gray-700 rounded"></div>
        
        {/* Número de auto */}
        {showAuto && (
          <div className="w-8 h-8 bg-gray-700 rounded"></div>
        )}
        
        {/* Nombre del piloto */}
        <div className="flex items-center gap-2 flex-1">
          <div className="w-6 h-4 bg-gray-700 rounded"></div>
          <div className="w-32 h-5 bg-gray-700 rounded"></div>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Puntos */}
        {showPuntos && (
          <div className="w-8 h-5 bg-gray-700 rounded"></div>
        )}
        
        {/* Tiempo */}
        {showTiempo && (
          <div className="w-20 h-5 bg-gray-700 rounded"></div>
        )}
        
        {/* Vueltas */}
        {showVueltas && (
          <div className="w-8 h-5 bg-gray-700 rounded"></div>
        )}
      </div>
    </div>
  );
}

export function PilotoTable({
  pilotos,
  config,
  variant = "championship",
  isLoading = false,
  skeletonRows = 10
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
        {isLoading ? (
          // Mostrar skeleton mientras carga
          Array.from({ length: skeletonRows }).map((_, index) => (
            <PilotoRowSkeleton
              key={`skeleton-${index}`}
              showAuto={headerConfig.showAuto}
              showPuntos={headerConfig.showPuntos}
              showTiempo={headerConfig.showTiempo}
              showVueltas={headerConfig.showVueltas}
            />
          ))
        ) : pilotos.length > 0 ? (
          // Mostrar datos reales
          pilotos.map((p, index) => (
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
          ))
        ) : (
          // Estado vacío
          <div className="p-8 text-center text-sm text-gray-200">
            No hay datos disponibles
          </div>
        )}
      </div>
    </div>
  );
}
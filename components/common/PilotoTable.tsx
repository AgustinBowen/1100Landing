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
  sector1?: number;
  sector2?: number;
  sector3?: number;
  excluido?: boolean;
}

interface PilotoTableConfig {
  showAuto?: boolean;
  showPuntos?: boolean;
  showTiempo?: boolean;
  showVueltas?: boolean;
  showSectores?: boolean;
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
  showVueltas = false,
  showSectores = false
}: {
  showAuto?: boolean;
  showPuntos?: boolean;
  showTiempo?: boolean;
  showVueltas?: boolean;
  showSectores?: boolean;
}) {
  if (showSectores) {
    // Skeleton especial para clasificación/entrenamiento con sectores
    return (
      <div className="px-4 py-4 animate-pulse">
        <div className="grid grid-cols-12 gap-1 items-center">
          {/* Piloto */}
          <div className="col-span-4 sm:col-span-2 flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-700 rounded"></div>
            <div className="w-20 h-4 bg-gray-700 rounded"></div>
          </div>
          {/* Auto */}
          <div className="col-span-2 sm:col-span-1 text-center">
            <div className="w-8 h-4 bg-gray-700 rounded mx-auto"></div>
          </div>
          {/* Mejor Tiempo */}
          <div className="col-span-3 sm:col-span-2 text-center">
            <div className="w-16 h-4 bg-gray-700 rounded mx-auto"></div>
          </div>
          {/* Sectores - ocultos en móvil */}
          <div className="col-span-3 sm:col-span-2 text-center hidden sm:block">
            <div className="w-12 h-4 bg-gray-700 rounded mx-auto"></div>
          </div>
          <div className="col-span-3 sm:col-span-2 text-center hidden sm:block">
            <div className="w-12 h-4 bg-gray-700 rounded mx-auto"></div>
          </div>
          <div className="col-span-3 sm:col-span-2 text-center hidden sm:block">
            <div className="w-12 h-4 bg-gray-700 rounded mx-auto"></div>
          </div>
          {/* Vueltas */}
          <div className="col-span-3 sm:col-span-1 text-center">
            <div className="w-8 h-4 bg-gray-700 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // Skeleton normal
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
    showSectores: false,
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
              showSectores={headerConfig.showSectores}
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
              sector1={p.sector1}
              sector2={p.sector2}
              sector3={p.sector3}
              excluido={p.excluido}
              showSectores={headerConfig.showSectores}
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
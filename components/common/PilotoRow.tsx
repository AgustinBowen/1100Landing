import { getPositionIcon } from "@/utils/icons";

export function PilotoRow({
  position,
  nombre,
  pais,
  numeroAuto,
  puntos,
  vueltas,
  tiempo,
  excluido,
  variant = "championship"
}: {
  position: number;
  nombre: string;
  pais?: string;
  numeroAuto?: number;
  puntos?: number;
  vueltas?: number;
  tiempo?: string;
  excluido?: boolean;
  variant?: "championship" | "race";
}) {
  if (variant === "championship") {
    return (
      <div className="px-4 py-4 hover:bg-[#111111] transition-colors duration-200 cursor-pointer group">
        <div className="grid grid-cols-12 gap-2 items-center">
          {/* Columna Piloto */}
          <div className="col-span-6 sm:col-span-4">
            <div className="flex items-center gap-3">
              {/* Posición */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded bg-red-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{position}</span>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-white text-sm truncate">
                  {nombre}
                </div>
                {pais && (
                  <div className="text-xs text-gray-500 truncate">
                    {pais}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna Auto - oculta en móvil */}
          <div className="col-span-4 sm:col-span-5 hidden sm:block">
            {numeroAuto ? (
              <div className="flex items-center gap-2">
                <span className="text-white font-medium text-sm">
                  #{numeroAuto}
                </span>
              </div>
            ) : (
              <span className="text-gray-500">-</span>
            )}
          </div>

          {/* Columna Puntos */}
          <div className="col-span-6 sm:col-span-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="text-red-500 font-bold text-sm">
                {puntos || 0} <span className="text-gray-400">PTS</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "race") {
    return (
      <div className="px-4 py-4 hover:bg-[#111111] transition-colors duration-200 cursor-pointer group">
        <div className="grid grid-cols-12 gap-1 items-center">
          {/* Columna Piloto */}
          <div className="col-span-5 sm:col-span-3">
            <div className="flex items-center gap-2">
              {/* Posición */}
              <div className="flex-shrink-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-red-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xs sm:text-sm">{position}</span>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-white text-xs sm:text-sm truncate">
                  {nombre}
                </div>
                {pais && (
                  <div className="text-xs text-gray-500 truncate hidden sm:block">
                    {pais}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna Auto - siempre visible */}
          <div className="col-span-2 sm:col-span-2 text-center">
            {numeroAuto ? (
              <span className="text-white font-bold text-xs sm:text-sm">
                #{numeroAuto}
              </span>
            ) : (
              <span className="text-gray-500 text-xs sm:text-sm">-</span>
            )}
          </div>

          {/* Columna Tiempo - oculta en móvil */}
          <div className="col-span-3 sm:col-span-3 hidden sm:block text-center">
            {tiempo ? (
              <span className="text-white font-medium text-sm">
                {tiempo}
              </span>
            ) : (
              <span className="text-gray-500">-</span>
            )}
          </div>

          {/* Columna Puntos - solo para carreras finales/series, oculta en móvil */}
          {puntos !== undefined && (
            <div className="col-span-2 sm:col-span-2 text-center hidden sm:block">
              <span className="text-red-500 font-bold text-sm">
                {puntos} <span className="text-gray-400 text-xs">PTS</span>
              </span>
            </div>
          )}

          {/* Columna Vueltas */}
          <div className={`${puntos !== undefined ? 'col-span-2 sm:col-span-2' : 'col-span-5 sm:col-span-4'} text-center`}>
            <span className="text-white font-bold text-xs sm:text-sm">
              {excluido ? "EX" : `${vueltas ?? 0}v`}
            </span>
            {/* Mostrar tiempo en móvil solo si existe */}
            {tiempo && (
              <div className="text-xs text-gray-400 sm:hidden truncate mt-0.5">
                {tiempo}
              </div>
            )}
            {/* Mostrar puntos en móvil solo si existen */}
            {puntos !== undefined && (
              <div className="text-xs text-red-500 sm:hidden mt-0.5">
                {puntos}pts
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
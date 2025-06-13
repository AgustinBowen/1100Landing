import { getPositionIcon } from "@/utils/icons";
import { formatearTiempo, formatearSector } from "@/lib/utils";

interface PilotoRowProps {
  position: number;
  nombre: string;
  pais?: string;
  numeroAuto?: number;
  puntos?: number;
  vueltas?: number;
  tiempo?: string;
  diffPrimero?: string;
  sector1?: number;
  sector2?: number;
  sector3?: number;
  excluido?: boolean;
  showSectores?: boolean;
  variant?: "championship" | "race";
}

// Componente para la columna de posición
const PositionColumn = ({ position }: { position: number }) => (
  <div className="flex-shrink-0">
    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-red-500 flex items-center justify-center">
      <span className="text-white font-bold text-xs sm:text-sm">{position}</span>
    </div>
  </div>
);

// Componente para información del piloto
const PilotInfo = ({ nombre, pais, numeroAuto }: { 
  nombre: string; 
  pais?: string; 
  numeroAuto?: number;
}) => (
  <div className="min-w-0 flex-1">
    <div className="font-semibold text-white text-xs sm:text-sm truncate flex items-center gap-2">
      {numeroAuto && (
        <span className="text-red-500 font-bold text-xs sm:text-sm">
          #{numeroAuto}
        </span>
      )}
      <span className="truncate">{nombre}</span>
    </div>
    {pais && (
      <div className="text-xs text-gray-500 truncate hidden sm:block">
        {pais}
      </div>
    )}
  </div>
);

// Componente para sectores en móvil
const MobileSectors = ({ sector1, sector2, sector3 }: {
  sector1?: number;
  sector2?: number;
  sector3?: number;
}) => (
  <div className="sm:hidden mt-1 space-y-0.5">
    {sector1 && (
      <div className="text-xs text-gray-200">
        S1: {formatearSector(sector1.toString())}
      </div>
    )}
    {sector2 && (
      <div className="text-xs text-gray-200">
        S2: {formatearSector(sector2.toString())}
      </div>
    )}
    {sector3 && (
      <div className="text-xs text-gray-200">
        S3: {formatearSector(sector3.toString())}
      </div>
    )}
  </div>
);

// Variante Championship
const ChampionshipVariant = ({ position, nombre, pais, numeroAuto, puntos }: PilotoRowProps) => (
  <div className="px-4 py-4 hover:bg-[#111111] transition-colors duration-200 cursor-pointer group">
    <div className="grid grid-cols-12 gap-2 items-center">
      {/* Columna Piloto */}
      <div className="col-span-8 sm:col-span-9">
        <div className="flex items-center gap-3">
          <PositionColumn position={position} />
          <PilotInfo nombre={nombre} pais={pais} numeroAuto={numeroAuto} />
        </div>
      </div>

      {/* Columna Puntos */}
      <div className="col-span-4 sm:col-span-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-red-500 font-bold text-sm">
            {puntos || 0} <span className="text-gray-400">PTS</span>
          </span>
        </div>
      </div>
    </div>
  </div>
);

// Variante Race con sectores
const RaceWithSectorsVariant = ({ 
  position, 
  nombre, 
  pais, 
  numeroAuto, 
  tiempo, 
  diffPrimero,
  sector1, 
  sector2, 
  sector3, 
  vueltas, 
  excluido 
}: PilotoRowProps) => (
  <div className="px-4 py-4 hover:bg-[#111111] transition-colors duration-200 cursor-pointer group">
    <div className="grid grid-cols-12 gap-1 items-center">
      {/* Columna Piloto */}
      <div className="col-span-4 sm:col-span-2">
        <div className="flex items-center gap-2">
          <PositionColumn position={position} />
          <PilotInfo nombre={nombre} pais={pais} numeroAuto={numeroAuto} />
        </div>
      </div>

      {/* Columna Mejor Tiempo */}
      <div className="col-span-3 sm:col-span-2 text-center">
        {tiempo ? (
          <span className="text-white font-bold text-xs sm:text-sm">
            {tiempo}
          </span>
        ) : (
          <span className="text-gray-500 text-xs sm:text-sm">-</span>
        )}
      </div>

      {/* Columna Diff 1ro */}
      <div className="col-span-2 sm:col-span-1 text-center">
        {diffPrimero ? (
          <span className="text-gray-300 font-medium text-xs sm:text-sm">
            {diffPrimero}
          </span>
        ) : (
          <span className="text-gray-500 text-xs sm:text-sm">-</span>
        )}
      </div>

      {/* Sectores - ocultos en móvil */}
      <div className="col-span-2 sm:col-span-2 text-center hidden sm:block">
        {sector1 ? (
          <span className="text-white font-medium text-sm">
            {formatearSector(sector1.toString())}
          </span>
        ) : (
          <span className="text-gray-200">-</span>
        )}
      </div>

      <div className="col-span-2 sm:col-span-2 text-center hidden sm:block">
        {sector2 ? (
          <span className="text-white font-medium text-sm">
            {formatearSector(sector2.toString())}
          </span>
        ) : (
          <span className="text-gray-200">-</span>
        )}
      </div>

      <div className="col-span-2 sm:col-span-2 text-center hidden sm:block">
        {sector3 ? (
          <span className="text-white font-medium text-sm">
            {formatearSector(sector3.toString())}
          </span>
        ) : (
          <span className="text-gray-200">-</span>
        )}
      </div>

      {/* Columna Vueltas */}
      <div className="col-span-3 sm:col-span-1 text-center">
        <span className="text-white font-bold text-xs sm:text-sm">
          {excluido ? "EX" : `${vueltas ?? 0}v`}
        </span>
        {/* Diff y sectores en móvil */}
        <div className="sm:hidden mt-1">
          {diffPrimero && (
            <div className="text-xs text-gray-300 mb-1">
              +{diffPrimero}
            </div>
          )}
          <MobileSectors sector1={sector1} sector2={sector2} sector3={sector3} />
        </div>
      </div>
    </div>
  </div>
);

// Variante Race normal
const RaceNormalVariant = ({ 
  position, 
  nombre, 
  pais, 
  numeroAuto, 
  tiempo, 
  diffPrimero,
  puntos, 
  vueltas, 
  excluido 
}: PilotoRowProps) => (
  <div className="px-4 py-4 hover:bg-[#111111] transition-colors duration-200 cursor-pointer group">
    <div className="grid grid-cols-12 gap-1 items-center">
      {/* Columna Piloto */}
      <div className="col-span-3 sm:col-span-3">
        <div className="flex items-center gap-2">
          <PositionColumn position={position} />
          <PilotInfo nombre={nombre} pais={pais} numeroAuto={numeroAuto} />
        </div>
      </div>

      {/* Columna Tiempo - oculta en móvil */}
      <div className="col-span-3 sm:col-span-2 hidden sm:block text-center">
        {tiempo ? (
          <span className="text-white font-medium text-sm">
            {tiempo}
          </span>
        ) : (
          <span className="text-gray-500">-</span>
        )}
      </div>

      {/* Columna Diff 1ro - oculta en móvil */}
      <div className="col-span-2 sm:col-span-2 hidden sm:block text-center">
        {diffPrimero ? (
          <span className="text-gray-300 font-medium text-sm">
            {diffPrimero}
          </span>
        ) : (
          <span className="text-gray-500">-</span>
        )}
      </div>

      {/* Columna Puntos - solo para carreras finales/series, oculta en móvil */}
      {puntos !== undefined && (
        <div className="col-span-2 sm:col-span-2 text-center hidden sm:block">
          <span className="text-red-500 font-bold text-sm">
            {puntos} <span className="text-gray-200 text-xs">PTS</span>
          </span>
        </div>
      )}

      {/* Columna Vueltas */}
      <div className={`${puntos !== undefined ? 'col-span-9 sm:col-span-3' : 'col-span-9 sm:col-span-5'} text-center`}>
        <span className="text-white font-bold text-xs sm:text-sm">
          {excluido ? "EX" : `${vueltas ?? 0}v`}
        </span>
        {/* Información adicional en móvil */}
        <div className="sm:hidden mt-0.5 space-y-0.5">
          {tiempo && (
            <div className="text-xs text-gray-400 truncate">
              {tiempo}
            </div>
          )}
          {diffPrimero && (
            <div className="text-xs text-gray-300">
              +{diffPrimero}
            </div>
          )}
          {puntos !== undefined && (
            <div className="text-xs text-red-500">
              {puntos}pts
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export function PilotoRow(props: PilotoRowProps) {
  const { variant = "championship", showSectores = false } = props;

  if (variant === "championship") {
    return <ChampionshipVariant {...props} />;
  }

  if (variant === "race") {
    if (showSectores) {
      return <RaceWithSectorsVariant {...props} />;
    }
    return <RaceNormalVariant {...props} />;
  }

  return null;
}
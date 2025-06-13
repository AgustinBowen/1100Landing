interface PilotoTableHeaderProps {
  showPuntos?: boolean;
  showTiempo?: boolean;
  showVueltas?: boolean;
  showSectores?: boolean;
  showDiffPrimero?: boolean;
  variant?: "championship" | "race";
}

// Header para variante Championship
const ChampionshipHeader = () => (
  <div className="px-4 py-3">
    <div className="grid grid-cols-12 gap-2 items-center text-xs font-semibold text-white uppercase tracking-wider">
      <div className="col-span-8 sm:col-span-9">Piloto</div>
      <div className="col-span-4 sm:col-span-3 text-center">Puntos</div>
    </div>
  </div>
);

// Header para Race con sectores
const RaceWithSectorsHeader = () => (
  <div className="px-4 py-3">
    <div className="grid grid-cols-12 gap-1 items-center text-xs font-semibold text-white uppercase tracking-wider">
      <div className="col-span-4 sm:col-span-2">Piloto</div>
      <div className="col-span-3 sm:col-span-2 text-center">Mejor Tiempo</div>
      <div className="col-span-2 sm:col-span-1 text-center">Diff 1ro</div>
      <div className="col-span-2 sm:col-span-2 text-center hidden sm:block">Sector 1</div>
      <div className="col-span-2 sm:col-span-2 text-center hidden sm:block">Sector 2</div>
      <div className="col-span-2 sm:col-span-2 text-center hidden sm:block">Sector 3</div>
      <div className="col-span-3 sm:col-span-1 text-center">Vueltas</div>
    </div>
  </div>
);

// Header para Race normal
const RaceNormalHeader = ({ showPuntos }: { showPuntos?: boolean }) => (
  <div className="px-4 py-3">
    <div className="grid grid-cols-12 gap-1 items-center text-xs font-semibold text-white uppercase tracking-wider">
      <div className="col-span-3 sm:col-span-3">Piloto</div>
      <div className="col-span-3 sm:col-span-2 hidden sm:block text-center">Tiempo</div>
      <div className="col-span-2 sm:col-span-2 hidden sm:block text-center">Diff 1ro</div>
      {showPuntos && (
        <div className="col-span-2 sm:col-span-2 text-center hidden sm:block">Puntos</div>
      )}
      <div className={`${showPuntos ? 'col-span-9 sm:col-span-3' : 'col-span-9 sm:col-span-5'} text-center`}>
        Vueltas
      </div>
    </div>
  </div>
);

export function PilotoTableHeader({
  showPuntos = true,
  showTiempo = false,
  showVueltas = false,
  showSectores = false,
  showDiffPrimero = false,
  variant = "championship"
}: PilotoTableHeaderProps) {
  if (variant === "championship") {
    return <ChampionshipHeader />;
  }

  if (variant === "race") {
    if (showSectores) {
      return <RaceWithSectorsHeader />;
    }
    return <RaceNormalHeader showPuntos={showPuntos} />;
  }

  return null;
}
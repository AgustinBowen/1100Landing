export function PilotoTableHeader({
  showAuto = true,
  showPuntos = true,
  showTiempo = false,
  showVueltas = false,
  variant = "championship" // "championship" o "race"
}: {
  showAuto?: boolean;
  showPuntos?: boolean;
  showTiempo?: boolean;
  showVueltas?: boolean;
  variant?: "championship" | "race";
}) {
  if (variant === "championship") {
    return (
      <div className="px-4 py-3">
        <div className="grid grid-cols-12 gap-2 items-center text-xs font-semibold text-white uppercase tracking-wider">
          <div className="col-span-6 sm:col-span-4">Piloto</div>
          <div className="col-span-4 sm:col-span-5 hidden sm:block">Auto</div>
          <div className="col-span-6 sm:col-span-3 text-center">Puntos</div>
        </div>
      </div>
    );
  }

  if (variant === "race") {
    return (
      <div className="px-4 py-3">
        <div className="grid grid-cols-12 gap-1 items-center text-xs font-semibold text-white uppercase tracking-wider">
          <div className="col-span-5 sm:col-span-3">Piloto</div>
          <div className="col-span-2 sm:col-span-2 text-center">Auto</div>
          <div className="col-span-3 sm:col-span-3 hidden sm:block text-center">Tiempo</div>
          {showPuntos && <div className="col-span-2 sm:col-span-2 text-center hidden sm:block">Puntos</div>}
          <div className={`${showPuntos ? 'col-span-2 sm:col-span-2' : 'col-span-5 sm:col-span-4'} text-center`}>Vueltas</div>
        </div>
      </div>
    );
  }

  return null;
}
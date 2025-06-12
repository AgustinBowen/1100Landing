export function PilotoTableHeader({
  showAuto = true,
  showPuntos = true,
  showTiempo = false,
  showVueltas = false,
}: {
  showAuto?: boolean;
  showPuntos?: boolean;
  showTiempo?: boolean;
  showVueltas?: boolean;
}) {
  return (
    <div className="sticky top-0 z-10 bg-white/5 flex items-center justify-between px-4 py-4 text-sm">
      <div className="flex items-center gap-4">
        <div className="w-8 flex justify-center text-white font-bold">#</div>
        <div className="text-white font-bold">Piloto</div>
      </div>
      <div className="flex items-center gap-8">
        {showAuto && <div className="text-white font-bold">N°Auto</div>}
        {showTiempo && <div className="text-white font-bold">Tiempo</div>}
        {showPuntos && <div className="text-white font-bold">Puntos</div>}
        {showVueltas && <div className="text-white font-bold">Vueltas</div>}
      </div>
    </div>
  );
}
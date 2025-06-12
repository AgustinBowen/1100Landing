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
}: {
  position: number;
  nombre: string;
  pais?: string;
  numeroAuto?: number;
  puntos?: number;
  vueltas?: number;
  tiempo?: string;
  excluido?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-red-500/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-8 flex justify-center">{getPositionIcon(position)}</div>
        <div>
          <h3 className="font-semibold text-white">{nombre}</h3>
          {pais && <p className="text-sm text-gray-400">{pais}</p>}
        </div>
      </div>
      <div className="flex items-center gap-12">
        {numeroAuto !== undefined && (
          <div className="text-white font-bold">#{numeroAuto}</div>
        )}
        {tiempo && <div className="text-white text-sm">{tiempo}</div>}
        {puntos !== undefined && (
          <div className="text-red-500 font-bold text-sm">
            {puntos} <span className="text-gray-400">PTS</span>
          </div>
        )}
        <div className="text-white text-sm">
          {excluido ? "EX" : `${vueltas ?? 0}v`}
        </div>
      </div>
    </div>
  );
}

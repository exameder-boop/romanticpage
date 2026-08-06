interface Props {
  volume: number;
  onChange: (next: number) => void;
}

export default function VolumeControl({ volume, onChange }: Props) {
  return (
    <div className="fixed bottom-6 right-6 z-30 flex w-72 flex-col gap-3 rounded-3xl border border-white/10 bg-black/30 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl text-white">
      <div className="flex items-center justify-between gap-3 text-sm font-medium text-white/75">
        <span>Volumen</span>
        <span>{Math.round(volume * 100)}%</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-white/50">Bajo</span>
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(volume * 100)}
          onChange={(event) => onChange(Number(event.target.value) / 100)}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-blue-bright"
        />
        <span className="text-xs text-white/50">Alto</span>
      </div>
    </div>
  );
}

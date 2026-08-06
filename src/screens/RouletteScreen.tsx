import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '@/components/Button';

interface Props {
  onContinue: (order: string[]) => void;
}

const OPTIONS = [
  'Cuéntame un recuerdo.',
  'Haz una imitación.',
  'Cuéntame tres cosas que amas de mí.',
  'Escoge una canción.',
  'Enséñame algo de tu habitación.',
];

const COLORS = ['#1d4ed8', '#2563eb', '#3b82f6', '#1e40af', '#60a5fa'];

export default function RouletteScreen({ onContinue }: Props) {
  const [available, setAvailable] = useState(OPTIONS);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const spinRef = useRef(0);

  const segmentAngle = 360 / OPTIONS.length;

  const spin = () => {
    if (spinning || available.length === 0) return;
    setSpinning(true);
    setResult(null);

    const chosenIdx = Math.floor(Math.random() * available.length);
    const chosen = available[chosenIdx];

    const targetSegmentCenter = chosenIdx * segmentAngle + segmentAngle / 2;
    const pointerAt = 270;
    const baseRotation = pointerAt - targetSegmentCenter;
    const fullSpins = 5 + Math.floor(Math.random() * 3);
    const finalRotation = baseRotation + 360 * fullSpins + spinRef.current;
    spinRef.current = finalRotation;
    setRotation(finalRotation);

    setTimeout(() => {
      setAvailable((prev) => prev.filter((_, i) => i !== chosenIdx));
      setResult(chosen);
      const newHistory = [...history, chosen];
      setHistory(newHistory);
      setSpinning(false);
      if (newHistory.length === OPTIONS.length) {
        setTimeout(() => setDone(true), 800);
      }
    }, 4200);
  };

  return (
    <div className="flex min-h-screen flex-col items-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">La Ruleta</h2>
        <p className="mt-3 text-sm text-white/40">
          Gira para descubrir qué hacer. Sin repeticiones.
        </p>
      </motion.div>

      <div className="relative mt-12 flex flex-col items-center">
        {/* Pointer */}
        <div
          className="absolute -top-2 z-20"
          style={{ left: '50%', transform: 'translateX(-50%)' }}
        >
          <div
            className="h-0 w-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent"
            style={{ borderTopColor: '#3b82f6', filter: 'drop-shadow(0 0 8px rgba(37,99,235,0.7))' }}
          />
        </div>

        {/* Wheel */}
        <div className="relative h-72 w-72 sm:h-80 sm:w-80">
          <motion.div
            className="h-full w-full rounded-full"
            style={{
              background: '#0a0a0f',
              boxShadow: '0 0 40px rgba(37,99,235,0.3), inset 0 0 20px rgba(0,0,0,0.5)',
            }}
            animate={{ rotate: rotation }}
            transition={{ duration: 4.2, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <svg viewBox="-100 -100 200 200" className="h-full w-full">
              {OPTIONS.map((opt, i) => {
                const startAngle = (i * segmentAngle - 90) * (Math.PI / 180);
                const endAngle = ((i + 1) * segmentAngle - 90) * (Math.PI / 180);
                const x1 = Math.cos(startAngle) * 100;
                const y1 = Math.sin(startAngle) * 100;
                const x2 = Math.cos(endAngle) * 100;
                const y2 = Math.sin(endAngle) * 100;
                const midAngle = (startAngle + endAngle) / 2;
                const tx = Math.cos(midAngle) * 55;
                const ty = Math.sin(midAngle) * 55;
                const isUsed = history.includes(opt);
                return (
                  <g key={opt}>
                    <path
                      d={`M 0 0 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`}
                      fill={isUsed ? 'rgba(255,255,255,0.03)' : COLORS[i % COLORS.length]}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="0.5"
                      opacity={isUsed ? 0.3 : 1}
                    />
                    <text
                      x={tx}
                      y={ty}
                      fill={isUsed ? 'rgba(255,255,255,0.2)' : '#fff'}
                      fontSize="6"
                      textAnchor="middle"
                      transform={`rotate(${(midAngle * 180) / Math.PI + 90} ${tx} ${ty})`}
                      style={{ pointerEvents: 'none' }}
                    >
                      {opt.length > 18 ? opt.slice(0, 16) + '…' : opt}
                    </text>
                  </g>
                );
              })}
              <circle cx="0" cy="0" r="14" fill="#0a0a0f" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <circle cx="0" cy="0" r="6" fill="#3b82f6" />
            </svg>
          </motion.div>
        </div>

        {/* Result */}
        <div className="mt-10 h-16">
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={result}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="glass-strong rounded-2xl px-6 py-3 text-center"
              >
                <p className="text-xs text-white/40">Te tocó</p>
                <p className="text-lg font-medium text-white">{result}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Spin button / status */}
        {!done && (
          <div className="mt-6">
            {available.length > 0 ? (
              <Button variant="blue" onClick={spin} disabled={spinning}>
                {spinning ? 'Girando…' : 'Girar'}
              </Button>
            ) : (
              <p className="text-sm text-white/50">Agotaste todas las opciones</p>
            )}
          </div>
        )}

        <p className="mt-4 text-xs text-white/30">
          Quedan {available.length} de {OPTIONS.length}
        </p>

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-8 flex flex-col items-center gap-5"
            >
              <p className="text-lg font-medium text-white/90">
                ¡Completaste la ruleta! ✨
              </p>
              <Button variant="blue" onClick={() => onContinue(history)}>
                Continuar
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

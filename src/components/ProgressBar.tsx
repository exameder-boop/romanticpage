import { motion } from 'framer-motion';
import { TOTAL_STEPS } from '@/types';

interface Props {
  step: number;
}

export default function ProgressBar({ step }: Props) {
  const pct = Math.min(100, (step / (TOTAL_STEPS - 1)) * 100);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-6 pt-5">
      <div className="mx-auto flex max-w-3xl items-center gap-4">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa)',
              boxShadow: '0 0 12px rgba(37,99,235,0.6)',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          />
        </div>
        <span className="font-mono text-xs tabular-nums text-white/40">
          {String(Math.min(step + 1, TOTAL_STEPS)).padStart(2, '0')}
          <span className="text-white/20"> / {String(TOTAL_STEPS).padStart(2, '0')}</span>
        </span>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '@/components/Button';

interface Props {
  onContinue: () => void;
}

const QUESTIONS = [
  '¿Cuál fue el primer paseo que tuvimos?',
  '¿Cuál paseo te gustó más?',
  '¿Cuál ha sido el momento que más revives en tu mente de nosotros dos?',
  '¿Cuál es tu sueño conmigo?',
  '¿Qué cosas te hacen reír?',
  '¿Por qué escuchas mis locuras?',
  '¿Por qué hago mejor tus días?',
];

export default function RecallScreen({ onContinue }: Props) {
  const [idx, setIdx] = useState(0);

  const next = () => {
    if (idx < QUESTIONS.length - 1) {
      setIdx((i) => i + 1);
    } else {
      onContinue();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-10 text-xs tracking-widest text-white/30 uppercase"
      >
        ¿Qué tanto recuerdas? · {String(idx + 1).padStart(2, '0')} / {String(QUESTIONS.length).padStart(2, '0')}
      </motion.span>

      <div className="flex min-h-[120px] w-full max-w-2xl items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={idx}
            initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -24, filter: 'blur(6px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-balance text-center text-2xl font-medium leading-snug tracking-tight text-white/90 sm:text-3xl md:text-4xl"
          >
            {QUESTIONS[idx]}
          </motion.h2>
        </AnimatePresence>
      </div>

      <motion.p
        key={`hint-${idx}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 text-sm text-white/35"
      >
        Cuéntame en voz alta…
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-10"
      >
        <Button variant="blue" onClick={next}>
          {idx < QUESTIONS.length - 1 ? 'Siguiente' : 'Continuar'}
        </Button>
      </motion.div>
    </div>
  );
}

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '@/components/Button';

interface Props {
  onContinue: () => void;
}

const QUESTIONS = [
  '¿Qué tan feliz te hace recordar cómo nos conocimos?',
  '¿Qué tanto disfrutas nuestros paseos?',
  '¿Qué tan emocionada te pone pensar en nuestro futuro?',
  '¿Qué tan especial sientes nuestra historia?',
  '¿Qué tanto te gusta hacer planes conmigo?',
  'Dime el primer momento que te hizo enamorarte',
];

export default function QuestionsScreen({ onContinue }: Props) {
  const [idx, setIdx] = useState(0);
  const [chapter, setChapter] = useState(false);

  const next = () => {
    if (idx < QUESTIONS.length - 1) {
      setIdx((i) => i + 1);
    } else {
      setChapter(true);
    }
  };

  if (chapter) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="chapter"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
        >
          <motion.div
            className="mb-10 h-px w-24 bg-gradient-to-r from-transparent via-blue-bright to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <h2
            className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #9bb5f5 130%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ¿Lista para escribir el siguiente capítulo conmigo?
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <Button variant="blue" onClick={onContinue}>
              Continuar
            </Button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="mb-10 text-xs tracking-widest text-white/30 uppercase">
        Nuestra Historia · {String(idx + 1).padStart(2, '0')} / {String(QUESTIONS.length).padStart(2, '0')}
      </span>

      <div className="relative flex min-h-[180px] w-full max-w-3xl items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={idx}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-balance text-3xl font-medium leading-snug tracking-tight text-white/90 sm:text-4xl md:text-5xl"
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
        Conversemos sobre esto…
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-10"
      >
        <Button variant="white" onClick={next}>
          {idx < QUESTIONS.length - 1 ? 'Siguiente' : 'Siguiente'}
        </Button>
      </motion.div>
    </div>
  );
}

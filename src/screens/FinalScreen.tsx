import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '@/components/Button';

interface Heart {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
}

const FINAL_MESSAGE = `Gracias por vivir esta primera cita virtual conmigo tonta jajajaj.
Te amo con mi ser y aunque a veces sientas que solo por el simple hecho de tenerte yo no quiero más de ti, créeme.. Me fascinas y quiero vivir mi vida contigo, hacer de  todo juntos, llegar a abuelitos si todo se da.
Se que fue cursi la página jajaj pero quería hacer algo interactivo contigo y el objetivo es que esto marque algo en tu corazón con mucho amor.
Que la vida nos deje un libro muy abierto para escribir/ver las cosas que nos faltan por vivir.`;

export default function FinalScreen() {
  const [phase, setPhase] = useState<'message' | 'finale'>('message');
  const [hearts, setHearts] = useState<Heart[]>([]);

  const finaleHearts = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 24 + 12,
        delay: Math.random() * 3,
        duration: Math.random() * 6 + 6,
        drift: Math.random() * 120 - 60,
      })),
    [],
  );

  const triggerFinale = () => {
    setHearts(finaleHearts);
    setPhase('finale');
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* Floating ambient hearts always present */}
      <AmbientHearts />

      {/* Finale hearts burst */}
      <AnimatePresence>
        {phase === 'finale' &&
          hearts.map((h) => (
            <motion.div
              key={h.id}
              className="pointer-events-none absolute bottom-0 z-20"
              style={{ left: `${h.x}%` }}
              initial={{ y: 0, opacity: 0, scale: 0.5 }}
              animate={{
                y: -window.innerHeight - 100,
                x: h.drift,
                opacity: [0, 1, 1, 0.7],
                scale: [0.5, 1, 1, 0.8],
              }}
              transition={{
                duration: h.duration,
                delay: h.delay,
                ease: 'easeOut',
                repeat: Infinity,
              }}
            >
              <HeartSvg size={h.size} />
            </motion.div>
          ))}
      </AnimatePresence>

      <motion.div
        animate={phase === 'finale' ? { scale: 1.08 } : { scale: 1 }}
        transition={{ duration: 3, ease: 'easeInOut' }}
        className="relative z-10 flex flex-col items-center"
      >
        <AnimatePresence mode="wait">
          {phase === 'message' ? (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="mb-8 text-xs tracking-widest text-blue-bright uppercase"
              >
                Nuestro capítulo sigue
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="max-w-2xl whitespace-pre-line text-balance text-center text-base leading-relaxed text-white/75 sm:text-lg"
              >
                {FINAL_MESSAGE}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-14"
              >
                <Button
                  variant="blue"
                  onClick={triggerFinale}
                  className="px-10 py-5 text-base"
                >
                  Escribir el siguiente capítulo ❤️
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="finale"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as const }}
              className="flex flex-col items-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1.2 }}
                className="text-balance text-center text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #9bb5f5 140%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Te amo muchísimo. ❤️
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function HeartSvg({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s-7.5-4.5-10-9.5C.5 7 3 3.5 6.5 3.5c2 0 3.5 1.5 5.5 3.5 2-2 3.5-3.5 5.5-3.5 3.5 0 6 3.5 4.5 8-2.5 5-10 9.5-10 9.5z"
        fill="#3b82f6"
        style={{ filter: 'drop-shadow(0 0 6px rgba(37,99,235,0.6))' }}
      />
    </svg>
  );
}

function AmbientHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 14 + 8,
        delay: Math.random() * 5,
        duration: Math.random() * 8 + 10,
        drift: Math.random() * 80 - 40,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute bottom-0"
          style={{ left: `${h.x}%` }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: -window.innerHeight - 50,
            x: h.drift,
            opacity: [0, 0.4, 0.4, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <HeartSvg size={h.size} />
        </motion.div>
      ))}
    </div>
  );
}

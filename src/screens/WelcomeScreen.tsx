import { motion } from 'framer-motion';
import Button from '@/components/Button';

interface Props {
  onStart: () => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const EASE = [0.22, 1, 0.36, 1] as const;

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export default function WelcomeScreen({ onStart }: Props) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.div variants={item} className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-widest text-blue-bright uppercase backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-bright animate-twinkle" />
          Una experiencia para dos
        </span>
      </motion.div>

      <motion.h1
        variants={item}
        className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #9bb5f5 120%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Nuestra Historia <span className="text-blue-bright">❤️</span>
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-8 max-w-xl text-balance text-base leading-relaxed text-white/55 sm:text-lg"
      >
        Quiero invitarte a recorrer algunos de nuestros recuerdos y algunos de
        nuestros sueños.
        <br />
        <br />
        No hay respuestas correctas ni incorrectas.
        <br />
        Solo quiero compartir este pequeño momento contigo.
      </motion.p>

      <motion.div variants={item} className="mt-12">
        <Button variant="blue" onClick={onStart} className="px-12 py-5 text-base">
          Comenzar
        </Button>
      </motion.div>

      <motion.p
        variants={item}
        className="mt-10 text-xs tracking-widest text-white/25 uppercase"
      >
        Toma tu tiempo · Sin prisa
      </motion.p>
    </motion.div>
  );
}

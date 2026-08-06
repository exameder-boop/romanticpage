import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Star {
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

interface Particle {
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
}

export default function AmbientBackground() {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 70 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 3,
      })),
    [],
  );

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 14 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 160 + 80,
        delay: Math.random() * 6,
        duration: Math.random() * 8 + 8,
        drift: Math.random() * 60 - 30,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {/* Deep gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 0%, #0a1230 0%, transparent 55%), radial-gradient(ellipse at 85% 100%, #08122e 0%, transparent 55%), linear-gradient(180deg, #05060a 0%, #06080f 100%)',
        }}
      />

      {/* Soft drifting blue light blobs */}
      {particles.map((p, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute rounded-full"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background:
              'radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0) 70%)',
            filter: 'blur(8px)',
          }}
          animate={{
            x: [0, p.drift, 0],
            y: [0, -p.drift * 0.6, 0],
            opacity: [0.3, 0.55, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Twinkling stars */}
      {stars.map((s, i) => (
        <motion.span
          key={`s-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            boxShadow: '0 0 6px rgba(255,255,255,0.8)',
          }}
          animate={{ opacity: [0.15, 1, 0.15] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import { Check } from 'lucide-react';

interface Props {
  onContinue: (choice: string) => void;
}

const CARDS = [
  { id: 'amanecer', label: 'Ver un amanecer juntos', emoji: '🌅', img: 'https://images.pexels.com/photos/30923399/pexels-photo-30923399.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'aniversario', label: 'Celebrar un aniversario inolvidable', emoji: '🎂', img: 'https://images.pexels.com/photos/290524/pexels-photo-290524.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'maraton', label: 'Hacer una maratón de películas', emoji: '🍿', img: 'https://images.pexels.com/photos/7234319/pexels-photo-7234319.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'viajar', label: 'Viajar juntos', emoji: '✈️', img: 'https://images.pexels.com/photos/14400667/pexels-photo-14400667.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
];

export default function DreamChoiceScreen({ onContinue }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col items-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Cosas que queremos vivir</h2>
        <p className="mt-3 text-sm text-white/40">Elige una. El primer sueño de muchos.</p>
      </motion.div>

      <div className="mt-12 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
        {CARDS.map((card, i) => {
          const isSel = selected === card.id;
          return (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onClick={() => setSelected(card.id)}
              className={`group relative aspect-[16/10] overflow-hidden rounded-3xl border text-left transition-all duration-300 ${
                isSel
                  ? 'border-blue-bright shadow-[0_0_40px_rgba(37,99,235,0.5)]'
                  : selected
                    ? 'border-white/5 opacity-40'
                    : 'border-white/10'
              }`}
            >
              <img
                src={card.img}
                alt={card.label}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 50%, rgba(5,6,10,0.9) 100%)',
                }}
              />
              {isSel && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-blue-bright shadow-lg"
                >
                  <Check size={20} className="text-white" />
                </motion.div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-3xl">{card.emoji}</span>
                <p className="mt-2 text-xl font-medium text-white">{card.label}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12"
      >
        <Button variant="blue" onClick={() => selected && onContinue(selected)} disabled={!selected}>
          Continuar
        </Button>
      </motion.div>
    </div>
  );
}

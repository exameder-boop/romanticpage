import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import { Check } from 'lucide-react';

interface Props {
  onContinue: (choice: string) => void;
}

const CARDS = [
  { id: 'playa', label: 'Playa', emoji: '🏖', img: 'https://images.pexels.com/photos/29901885/pexels-photo-29901885.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'glamping', label: 'Glamping', emoji: '🏕', img: 'https://images.pexels.com/photos/28224323/pexels-photo-28224323.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'bosque', label: 'Bosque', emoji: '🌲', img: 'https://images.pexels.com/photos/15222306/pexels-photo-15222306.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'restaurante', label: 'Restaurante elegante', emoji: '🍽', img: 'https://images.pexels.com/photos/12181763/pexels-photo-12181763.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'montaña', label: 'Montaña', emoji: '🏔', img: 'https://images.pexels.com/photos/29430377/pexels-photo-29430377.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'mirador', label: 'Mirador nocturno', emoji: '🌃', img: 'https://images.pexels.com/photos/28209723/pexels-photo-28209723.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'parque', label: 'Parque de diversiones', emoji: '🎡', img: 'https://images.pexels.com/photos/17665574/pexels-photo-17665574.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'picnic', label: 'Picnic al atardecer', emoji: '🌅', img: 'https://images.pexels.com/photos/38454502/pexels-photo-38454502.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
];

export default function DateChoiceScreen({ onContinue }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col items-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Nuestra próxima cita</h2>
        <p className="mt-3 text-sm text-white/40">Elige una sola. La que más te ilumine.</p>
      </motion.div>

      <div className="mt-12 grid w-full max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((card, i) => {
          const isSel = selected === card.id;
          return (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onClick={() => setSelected(card.id)}
              className={`group relative aspect-[3/4] overflow-hidden rounded-3xl border text-left transition-all duration-300 ${
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
                    'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 50%, rgba(5,6,10,0.9) 100%)',
                }}
              />
              {isSel && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-blue-bright shadow-lg"
                >
                  <Check size={18} className="text-white" />
                </motion.div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-2xl">{card.emoji}</span>
                <p className="mt-2 text-lg font-medium text-white">{card.label}</p>
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

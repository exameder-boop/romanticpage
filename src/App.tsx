import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AmbientBackground from '@/components/AmbientBackground';
import BackgroundMusic from '@/components/BackgroundMusic';
import ProgressBar from '@/components/ProgressBar';
import VolumeControl from '@/components/VolumeControl';
import WelcomeScreen from '@/screens/WelcomeScreen';
import QuestionsScreen from '@/screens/QuestionsScreen';
import WordSearchScreen from '@/screens/WordSearchScreen';
import RecallScreen from '@/screens/RecallScreen';
import RouletteScreen from '@/screens/RouletteScreen';
import DateChoiceScreen from '@/screens/DateChoiceScreen';
import DreamChoiceScreen from '@/screens/DreamChoiceScreen';
import FinalScreen from '@/screens/FinalScreen';

export default function App() {
  const [step, setStep] = useState(0);
  const [musicActive, setMusicActive] = useState(false);
  const [volume, setVolume] = useState(0.18);

  const [dateChoice, setDateChoice] = useState<string | null>(null);
  const [dreamChoice, setDreamChoice] = useState<string | null>(null);
  const [rouletteOrder, setRouletteOrder] = useState<string[]>([]);

  const go = (n: number) => setStep(n);

  const screen = () => {
    switch (step) {
      case 0:
        return (
          <WelcomeScreen
            onStart={() => {
              setMusicActive(true);
              go(1);
            }}
          />
        );
      case 1:
        return <QuestionsScreen onContinue={() => go(2)} />;
      case 2:
        return <WordSearchScreen onContinue={() => go(3)} />;
      case 3:
        return (
          <RecallScreen
            onContinue={() => {
              go(4);
            }}
          />
        );
      case 4:
        return (
          <RouletteScreen
            onContinue={(order) => {
              setRouletteOrder(order);
              go(5);
            }}
          />
        );
      case 5:
        return (
          <DateChoiceScreen
            onContinue={(c) => {
              setDateChoice(c);
              go(6);
            }}
          />
        );
      case 6:
        return (
          <DreamChoiceScreen
            onContinue={(c) => {
              setDreamChoice(c);
              go(7);
            }}
          />
        );
      case 7:
        return <FinalScreen />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <AmbientBackground />
      <BackgroundMusic active={musicActive} volume={volume} />
      {step > 0 && <ProgressBar step={step} />}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            {screen()}
          </motion.div>
        </AnimatePresence>
      </main>
      <VolumeControl volume={volume} onChange={setVolume} />
    </div>
  );
}

import { useEffect, useRef } from 'react';

const tracks = [
  new URL('../audios/song1.mp3', import.meta.url).href,
  new URL('../audios/song2.mp3', import.meta.url).href,
  new URL('../audios/song3.mp3', import.meta.url).href,
];

interface Props {
  active: boolean;
  volume: number;
}

export default function BackgroundMusic({ active, volume }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackRef = useRef(0);

  useEffect(() => {
    if (audioRef.current) return;

    const audio = new Audio(tracks[0]);
    audio.volume = volume;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleEnded = () => {
      currentTrackRef.current = (currentTrackRef.current + 1) % tracks.length;
      audio.src = tracks[currentTrackRef.current];
      if (active) {
        audio.play().catch(() => {
          // Autoplay may be blocked if not triggered by user interaction.
        });
      }
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, [active]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (active) {
      audio.play().catch(() => {
        // Permisos de autoplay no garantizados si no hay interacción del usuario.
      });
    } else {
      audio.pause();
    }
  }, [active]);

  return null;
}

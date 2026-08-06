import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '@/components/Button';

interface Props {
  onContinue: () => void;
}

const WORDS = [
  'Bubbles',
  'Arepaconqueso',
  'Morrongo',
  'Richmango',
  'Comarcka',
  'Lenceria',
  'Abrazos',
  'Tetas',
];

const GRID_SIZE = 14;

const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [1, 1],
  [-1, 1],
  [0, -1],
  [-1, 0],
  [-1, -1],
  [1, -1],
];

interface Placed {
  word: string;
  cells: [number, number][];
}

function buildGrid(): { grid: string[][]; placed: Placed[] } {
  const size = GRID_SIZE;
  const grid: string[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ''),
  );
  const placed: Placed[] = [];

  const sorted = [...WORDS].sort((a, b) => b.length - a.length);

  for (const word of sorted) {
    const upper = word.toUpperCase();
    let placedFlag = false;
    for (let attempt = 0; attempt < 200 && !placedFlag; attempt++) {
      const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const startR = Math.floor(Math.random() * size);
      const startC = Math.floor(Math.random() * size);
      const endR = startR + dir[0] * (upper.length - 1);
      const endC = startC + dir[1] * (upper.length - 1);
      if (endR < 0 || endR >= size || endC < 0 || endC >= size) continue;

      let ok = true;
      for (let i = 0; i < upper.length; i++) {
        const r = startR + dir[0] * i;
        const c = startC + dir[1] * i;
        if (grid[r][c] !== '' && grid[r][c] !== upper[i]) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;

      const cells: [number, number][] = [];
      for (let i = 0; i < upper.length; i++) {
        const r = startR + dir[0] * i;
        const c = startC + dir[1] * i;
        grid[r][c] = upper[i];
        cells.push([r, c]);
      }
      placed.push({ word, cells });
      placedFlag = true;
    }
  }

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return { grid, placed };
}

function cellsMatch(a: [number, number][], b: [number, number][]): boolean {
  if (a.length !== b.length) return false;
  const sa = a.map((x) => `${x[0]},${x[1]}`).sort();
  const sb = b.map((x) => `${x[0]},${x[1]}`).sort();
  return sa.every((v, i) => v === sb[i]);
}

export default function WordSearchScreen({ onContinue }: Props) {
  const { grid, placed } = useMemo(() => buildGrid(), []);

  const [foundCount, setFoundCount] = useState(0);
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [selecting, setSelecting] = useState(false);
  const [selStart, setSelStart] = useState<[number, number] | null>(null);
  const [selEnd, setSelEnd] = useState<[number, number] | null>(null);
  const [allDone, setAllDone] = useState(false);

  const lineCells = useMemo(() => {
    if (!selStart || !selEnd) return [];
    const [r1, c1] = selStart;
    const [r2, c2] = selEnd;
    const dr = r2 - r1;
    const dc = c2 - c1;
    const len = Math.max(Math.abs(dr), Math.abs(dc));
    if (len === 0) return [[r1, c1] as [number, number]];
    const sr = Math.sign(dr);
    const sc = Math.sign(dc);
    if (Math.abs(dr) !== Math.abs(dc) && dr !== 0 && dc !== 0) return [];
    const cells: [number, number][] = [];
    for (let i = 0; i <= len; i++) {
      cells.push([r1 + sr * i, c1 + sc * i]);
    }
    return cells;
  }, [selStart, selEnd]);

  const selSet = useMemo(
    () => new Set(lineCells.map((c) => `${c[0]},${c[1]}`)),
    [lineCells],
  );

  const checkSelection = useCallback(
    (cells: [number, number][]) => {
      for (const p of placed) {
        if (cellsMatch(p.cells, cells)) {
          const key = p.cells.map((c) => `${c[0]},${c[1]}`).sort().join('|');
          if (!foundCells.has(key)) {
            const newCount = foundCount + 1;
            setFoundCount(newCount);
            setFoundCells((prev) => {
              const next = new Set(prev);
              next.add(key);
              p.cells.forEach(([r, c]) => next.add(`${r},${c}`));
              return next;
            });
          }
          return true;
        }
      }
      return false;
    },
    [placed, foundCount, foundCells],
  );

  useEffect(() => {
    if (foundCount === WORDS.length && !allDone) {
      setAllDone(true);
    }
  }, [foundCount, allDone]);

  const getCellFromPoint = (clientX: number, clientY: number): [number, number] | null => {
    const el = document.elementFromPoint(clientX, clientY) as HTMLElement | null;
    if (el && el.dataset.cell) {
      return el.dataset.cell.split(',').map(Number) as [number, number];
    }
    return null;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const cell = getCellFromPoint(e.clientX, e.clientY);
    if (cell) {
      setSelecting(true);
      setSelStart(cell);
      setSelEnd(cell);
      (e.target as Element).setPointerCapture?.(e.pointerId);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!selecting) return;
    const cell = getCellFromPoint(e.clientX, e.clientY);
    if (cell) setSelEnd(cell);
  };

  const onPointerUp = () => {
    if (selecting && lineCells.length > 1) {
      checkSelection(lineCells);
    }
    setSelecting(false);
    setSelStart(null);
    setSelEnd(null);
  };

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Sopa de Letras</h2>
        <p className="mt-3 text-sm text-white/40">
          Hay palabras escondidas. Encuéntralas todas arrastrando sobre las letras.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="glass-strong mt-10 select-none rounded-3xl p-3 sm:p-5"
        style={{ touchAction: 'none' }}
      >
        <div
          className="grid gap-0.5"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          }}
        >
          {grid.map((row, r) =>
            row.map((letter, c) => {
              const key = `${r},${c}`;
              const isFound = foundCells.has(key);
              const isSelected = selSet.has(key);
              return (
                <div
                  key={key}
                  data-cell={key}
                  className={`flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-semibold transition-colors duration-150 sm:h-8 sm:w-8 sm:text-sm ${
                    isFound
                      ? 'bg-blue-accent/30 text-white'
                      : isSelected
                        ? 'bg-blue-bright/40 text-white'
                        : 'text-white/60 hover:bg-white/5'
                  }`}
                >
                  {letter}
                </div>
              );
            }),
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex flex-col items-center gap-4"
      >
        <div className="h-1.5 w-48 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa)' }}
            animate={{ width: `${(foundCount / WORDS.length) * 100}%` }}
          />
        </div>
        <p className="font-mono text-sm tabular-nums text-white/50">
          {allDone ? '¡Todas encontradas!' : `Faltan ${WORDS.length - foundCount} de ${WORDS.length}`}
        </p>
      </motion.div>

      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-8 flex flex-col items-center gap-6"
          >
            <Confetti />
            <p className="text-lg font-medium text-white/90">¡Las encontraste todas! 🎉</p>
            <Button variant="blue" onClick={onContinue}>
              Continuar
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: Math.random() * 1.5 + 1.5,
        size: Math.random() * 6 + 4,
        blue: Math.random() > 0.5,
        rotate: Math.random() * 360,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
      <div className="relative h-0 w-full">
        {pieces.map((p) => (
          <motion.div
            key={p.id}
            className="absolute top-0 rounded-sm"
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size * 0.4,
              background: p.blue ? '#3b82f6' : '#ffffff',
            }}
            initial={{ y: -20, opacity: 1, rotate: p.rotate }}
            animate={{ y: 300, opacity: [1, 1, 0], rotate: p.rotate + 180 }}
            transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
          />
        ))}
      </div>
    </div>
  );
}

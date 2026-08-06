export interface AppState {
  step: number;
  dateChoice: string | null;
  dreamChoice: string | null;
  rouletteOrder: string[];
}

export const TOTAL_STEPS = 8;

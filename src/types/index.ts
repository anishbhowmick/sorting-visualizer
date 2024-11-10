export interface ArrayBar {
  value: number;
  state: 'default' | 'comparing' | 'swapping' | 'sorted';
}

export type SortingAlgorithm = 'bubble' | 'quick' | 'merge' | 'insertion' | 'selection';

export interface SortingStats {
  comparisons: number;
  swaps: number;
  timeComplexity: string;
}
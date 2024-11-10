import { useState, useCallback, useRef } from 'react';
import { ArrayBar, SortingAlgorithm } from '../types';
import * as algorithms from '../utils/sortingAlgorithms';

export const useSortingVisualizer = (initialSize: number = 50) => {
  const [array, setArray] = useState<ArrayBar[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0 });
  const timeoutId = useRef<NodeJS.Timeout>();

  const generateArray = useCallback((size: number) => {
    const newArray: ArrayBar[] = Array.from({ length: size }, () => ({
      value: Math.floor(Math.random() * 100) + 1,
      state: 'default'
    }));
    setArray(newArray);
    setStats({ comparisons: 0, swaps: 0 });
  }, []);

  const sleep = (ms: number) => new Promise(resolve => {
    timeoutId.current = setTimeout(resolve, Math.max(150 - ms, 5));
  });

  const checkPause = async () => {
    if (isPaused) {
      await new Promise<void>(resolve => {
        const check = () => {
          if (!isPaused) resolve();
          else setTimeout(check, 100);
        };
        check();
      });
    }
  };

  const updateStats = (type: 'comparison' | 'swap') => {
    setStats(prev => ({
      ...prev,
      [type === 'comparison' ? 'comparisons' : 'swaps']: prev[type === 'comparison' ? 'comparisons' : 'swaps'] + 1
    }));
  };

  const startSorting = async (algorithm: SortingAlgorithm) => {
    setIsRunning(true);
    setIsPaused(false);
    
    const context = {
      updateArray: setArray,
      sleep,
      isPaused,
      checkPause,
      updateStats
    };

    const arr = [...array];
    
    switch (algorithm) {
      case 'bubble':
        await algorithms.bubbleSort(arr, context);
        break;
      case 'quick':
        await algorithms.quickSort(arr, context);
        break;
      case 'merge':
        await algorithms.mergeSort(arr, context);
        break;
      case 'insertion':
        await algorithms.insertionSort(arr, context);
        break;
      case 'selection':
        await algorithms.selectionSort(arr, context);
        break;
    }
    
    setIsRunning(false);
  };

  const pauseSorting = () => {
    setIsPaused(true);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  };

  const resumeSorting = () => {
    setIsPaused(false);
  };

  const resetArray = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    setIsRunning(false);
    setIsPaused(false);
    generateArray(array.length);
  };

  return {
    array,
    isRunning,
    isPaused,
    speed,
    stats,
    generateArray,
    startSorting,
    pauseSorting,
    resumeSorting,
    resetArray,
    setSpeed
  };
};
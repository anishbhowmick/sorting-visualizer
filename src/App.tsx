import React, { useState, useEffect } from 'react';
import { ArrayVisualizer } from './components/ArrayVisualizer';
import { Controls } from './components/Controls';
import { Stats } from './components/Stats';
import { Footer } from './components/Footer';
import { useSortingVisualizer } from './hooks/useSortingVisualizer';
import { SortingAlgorithm } from './types';

function App() {
  const [size, setSize] = useState(50);
  const [currentAlgorithm, setCurrentAlgorithm] = useState<SortingAlgorithm | undefined>();
  const {
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
  } = useSortingVisualizer(size);

  useEffect(() => {
    generateArray(size);
  }, [size, generateArray]);

  const handleStart = (algorithm: SortingAlgorithm) => {
    setCurrentAlgorithm(algorithm);
    startSorting(algorithm);
  };

  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
    generateArray(newSize);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="max-w-6xl mx-auto p-8 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Sorting Visualizer
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Watch sorting algorithms in action with step-by-step visualization.
            Select an algorithm and click start to begin the visualization process.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <ArrayVisualizer
            array={array}
            maxValue={100}
          />
        </div>

        <Controls
          isRunning={isRunning}
          isPaused={isPaused}
          onStart={handleStart}
          onPause={pauseSorting}
          onResume={resumeSorting}
          onReset={resetArray}
          onSpeedChange={setSpeed}
          onSizeChange={handleSizeChange}
          speed={speed}
          size={size}
        />

        <Stats
          comparisons={stats.comparisons}
          swaps={stats.swaps}
          algorithm={currentAlgorithm}
        />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
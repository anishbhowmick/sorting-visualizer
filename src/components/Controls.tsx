import React from 'react';
import { Play, Pause, RotateCcw, RefreshCw } from 'lucide-react';
import { SortingAlgorithm } from '../types';

interface Props {
  isRunning: boolean;
  isPaused: boolean;
  onStart: (algorithm: SortingAlgorithm) => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onSizeChange: (size: number) => void;
  speed: number;
  size: number;
}

export const Controls: React.FC<Props> = ({
  isRunning,
  isPaused,
  onStart,
  onPause,
  onResume,
  onReset,
  onSpeedChange,
  onSizeChange,
  speed,
  size,
}) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = React.useState<SortingAlgorithm | ''>('');

  const handleStart = () => {
    if (selectedAlgorithm) {
      onStart(selectedAlgorithm);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-6 bg-white rounded-xl shadow-sm">
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <select
          className="px-4 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          onChange={(e) => setSelectedAlgorithm(e.target.value as SortingAlgorithm)}
          value={selectedAlgorithm}
          disabled={isRunning}
        >
          <option value="">Select Algorithm</option>
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="merge">Merge Sort</option>
        </select>

        <button
          onClick={handleStart}
          disabled={!selectedAlgorithm || isRunning}
          className="px-6 py-2 bg-blue-500 text-white rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 active:bg-blue-700 transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          Start
        </button>

        <div className="flex items-center gap-2">
          {isRunning && (
            isPaused ? (
              <button
                onClick={onResume}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Resume"
              >
                <Play className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={onPause}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Pause"
              >
                <Pause className="w-5 h-5" />
              </button>
            )
          )}

          <button
            onClick={onReset}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => onSizeChange(size)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Generate New Array"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Speed</label>
          <input
            type="range"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => onSpeedChange(parseInt(e.target.value))}
            className="w-32"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Size</label>
          <input
            type="range"
            min="10"
            max="100"
            value={size}
            onChange={(e) => onSizeChange(parseInt(e.target.value))}
            disabled={isRunning}
            className="w-32"
          />
        </div>
      </div>
    </div>
  );
};
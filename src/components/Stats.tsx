import React from 'react';

interface Props {
  comparisons: number;
  swaps: number;
  algorithm?: string;
}

const getTimeComplexity = (algorithm?: string) => {
  switch (algorithm?.toLowerCase()) {
    case 'bubble':
    case 'selection':
    case 'insertion':
      return 'O(n²)';
    case 'quick':
    case 'merge':
      return 'O(n log n)';
    default:
      return '-';
  }
};

export const Stats: React.FC<Props> = ({ comparisons, swaps, algorithm }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-white rounded-xl shadow-sm">
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Comparisons</p>
        <p className="text-2xl font-semibold text-gray-800">{comparisons}</p>
      </div>
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Swaps</p>
        <p className="text-2xl font-semibold text-gray-800">{swaps}</p>
      </div>
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Time Complexity</p>
        <p className="text-2xl font-semibold text-gray-800">{getTimeComplexity(algorithm)}</p>
      </div>
    </div>
  );
};
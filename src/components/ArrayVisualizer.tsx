import React from 'react';
import { ArrayBar as ArrayBarType } from '../types';

interface Props {
  array: ArrayBarType[];
  maxValue: number;
}

const getBarColor = (state: ArrayBarType['state']) => {
  switch (state) {
    case 'comparing':
      return 'bg-yellow-400';
    case 'swapping':
      return 'bg-red-500';
    case 'sorted':
      return 'bg-green-400';
    default:
      return 'bg-blue-500';
  }
};

export const ArrayVisualizer: React.FC<Props> = ({ array, maxValue }) => {
  return (
    <div className="flex items-end justify-center h-96 w-full gap-0.5 bg-gray-50 rounded-lg p-4">
      {array.map((bar, index) => (
        <div
          key={index}
          className={`w-full transform transition-all duration-150 ease-in-out ${getBarColor(bar.state)}`}
          style={{
            height: `${(bar.value / maxValue) * 100}%`,
          }}
        />
      ))}
    </div>
  );
};
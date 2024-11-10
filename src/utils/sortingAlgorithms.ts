import { ArrayBar } from '../types';

export interface SortingContext {
  updateArray: (arr: ArrayBar[]) => void;
  sleep: (ms: number) => Promise<void>;
  isPaused: boolean;
  checkPause: () => Promise<void>;
  updateStats: (type: 'comparison' | 'swap') => void;
}

// Helper function to mark elements as sorted
const markSorted = (arr: ArrayBar[], indices: number[]) => {
  indices.forEach(i => {
    if (i >= 0 && i < arr.length) {
      arr[i].state = 'sorted';
    }
  });
};

// Helper function to mark elements as comparing
const markComparing = async (arr: ArrayBar[], indices: number[], ctx: SortingContext) => {
  indices.forEach(i => {
    if (i >= 0 && i < arr.length) {
      arr[i].state = 'comparing';
    }
  });
  ctx.updateArray(arr);
  await ctx.sleep(50);
};

// Helper function to mark elements as default
const markDefault = (arr: ArrayBar[], indices: number[]) => {
  indices.forEach(i => {
    if (i >= 0 && i < arr.length) {
      arr[i].state = 'default';
    }
  });
};

// Helper function to swap elements
const swap = async (arr: ArrayBar[], i: number, j: number, ctx: SortingContext) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
  arr[i].state = 'swapping';
  arr[j].state = 'swapping';
  ctx.updateStats('swap');
  ctx.updateArray(arr);
  await ctx.sleep(50);
};

export const bubbleSort = async (arr: ArrayBar[], ctx: SortingContext) => {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      await ctx.checkPause();
      
      // Compare adjacent elements
      await markComparing(arr, [j, j + 1], ctx);
      ctx.updateStats('comparison');

      if (arr[j].value > arr[j + 1].value) {
        await swap(arr, j, j + 1, ctx);
      }
      
      markDefault(arr, [j, j + 1]);
    }
    markSorted(arr, [n - i - 1]);
  }
  markSorted(arr, [0]);
  ctx.updateArray(arr);
};

export const selectionSort = async (arr: ArrayBar[], ctx: SortingContext) => {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Find the minimum element in the unsorted portion
    for (let j = i + 1; j < n; j++) {
      await ctx.checkPause();
      await markComparing(arr, [minIdx, j], ctx);
      ctx.updateStats('comparison');

      if (arr[j].value < arr[minIdx].value) {
        markDefault(arr, [minIdx]);
        minIdx = j;
      } else {
        markDefault(arr, [j]);
      }
    }

    // Swap the found minimum element with the first element
    if (minIdx !== i) {
      await swap(arr, i, minIdx, ctx);
    }
    markDefault(arr, [minIdx]);
    markSorted(arr, [i]);
  }
  markSorted(arr, [n - 1]);
  ctx.updateArray(arr);
};

export const insertionSort = async (arr: ArrayBar[], ctx: SortingContext) => {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    await ctx.checkPause();
    let j = i;

    while (j > 0) {
      await markComparing(arr, [j, j - 1], ctx);
      ctx.updateStats('comparison');

      if (arr[j].value < arr[j - 1].value) {
        await swap(arr, j, j - 1, ctx);
        j--;
      } else {
        break;
      }
      markDefault(arr, [j, j + 1]);
    }

    // Mark all elements up to i as sorted
    for (let k = 0; k <= i; k++) {
      markSorted(arr, [k]);
    }
  }
  ctx.updateArray(arr);
};

export const quickSort = async (arr: ArrayBar[], ctx: SortingContext, low = 0, high = arr.length - 1) => {
  if (low < high) {
    const pivot = await partition(arr, low, high, ctx);
    markSorted(arr, [pivot]);
    ctx.updateArray(arr);
    
    // Recursively sort elements before and after partition
    await quickSort(arr, ctx, low, pivot - 1);
    await quickSort(arr, ctx, pivot + 1, high);
  } else if (low === high) {
    markSorted(arr, [low]);
    ctx.updateArray(arr);
  }
};

const partition = async (arr: ArrayBar[], low: number, high: number, ctx: SortingContext) => {
  const pivot = arr[high].value;
  let i = low - 1;

  for (let j = low; j < high; j++) {
    await ctx.checkPause();
    await markComparing(arr, [j, high], ctx);
    ctx.updateStats('comparison');

    if (arr[j].value < pivot) {
      i++;
      await swap(arr, i, j, ctx);
    }
    markDefault(arr, [j, high]);
  }

  await swap(arr, i + 1, high, ctx);
  return i + 1;
};

export const mergeSort = async (arr: ArrayBar[], ctx: SortingContext, left = 0, right = arr.length - 1) => {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    
    // Sort first and second halves
    await mergeSort(arr, ctx, left, mid);
    await mergeSort(arr, ctx, mid + 1, right);
    
    // Merge the sorted halves
    await merge(arr, left, mid, right, ctx);
  }
};

const merge = async (arr: ArrayBar[], left: number, mid: number, right: number, ctx: SortingContext) => {
  const n1 = mid - left + 1;
  const n2 = right - mid;
  
  // Create temporary arrays
  const L = arr.slice(left, mid + 1);
  const R = arr.slice(mid + 1, right + 1);
  
  let i = 0, j = 0, k = left;
  
  while (i < n1 && j < n2) {
    await ctx.checkPause();
    await markComparing(arr, [left + i, mid + 1 + j], ctx);
    ctx.updateStats('comparison');
    
    if (L[i].value <= R[j].value) {
      arr[k] = { ...L[i], state: 'swapping' };
      i++;
    } else {
      arr[k] = { ...R[j], state: 'swapping' };
      j++;
    }
    ctx.updateStats('swap');
    ctx.updateArray(arr);
    await ctx.sleep(50);
    k++;
  }
  
  // Copy remaining elements
  while (i < n1) {
    arr[k] = { ...L[i], state: 'swapping' };
    ctx.updateStats('swap');
    ctx.updateArray(arr);
    await ctx.sleep(50);
    i++;
    k++;
  }
  
  while (j < n2) {
    arr[k] = { ...R[j], state: 'swapping' };
    ctx.updateStats('swap');
    ctx.updateArray(arr);
    await ctx.sleep(50);
    j++;
    k++;
  }
  
  // Mark the merged portion as sorted
  for (let m = left; m <= right; m++) {
    markSorted(arr, [m]);
  }
  ctx.updateArray(arr);
};
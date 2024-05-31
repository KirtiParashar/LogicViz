// Bubble Sort
async function bubbleSort(arrayBars, setArrayBars, speed, sortingPaused) {
  const n = arrayBars.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Check if sorting is paused
      while (sortingPaused) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      // Update the state to change color to indicate comparison
      const newArrayBars = [...arrayBars];
      newArrayBars[j].backgroundColor = "#FF4136";
      newArrayBars[j + 1].backgroundColor = "#FF4136";
      setArrayBars(newArrayBars);
      // Pause for visualization
      await new Promise((resolve) => setTimeout(resolve, speed));
      // Compare based on the integer value
      const value1 = newArrayBars[j].value;
      const value2 = newArrayBars[j + 1].value;
      // Swap if needed
      if (value1 > value2) {
        // Update the state to change color to indicate swapping
        newArrayBars[j].backgroundColor = "#2ecc71";
        newArrayBars[j + 1].backgroundColor = "#2ecc71";
        // Perform the swap
        [newArrayBars[j].value, newArrayBars[j + 1].value] = [
          newArrayBars[j + 1].value,
          newArrayBars[j].value,
        ];
        // Pause for visualization
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
      // Reset color after comparison
      newArrayBars[j].backgroundColor = "#3498db";
      newArrayBars[j + 1].backgroundColor = "#3498db";
      setArrayBars(newArrayBars);
    }
    // Change color to indicate the sorted bar
    const newArrayBars = [...arrayBars];
    newArrayBars[n - i - 1].backgroundColor = "#2ecc71";
    setArrayBars(newArrayBars);
  }
  // Change color to indicate the first sorted bar
  const newArrayBars = [...arrayBars];
  newArrayBars[0].backgroundColor = "#2ecc71";
  setArrayBars(newArrayBars);
  // Change color to indicate the entire array is sorted
  const newArrayBarsSorted = arrayBars.map((bar) => {
    return {
      ...bar,
      backgroundColor: "#2ecc71",
    };
  });
  setArrayBars(newArrayBarsSorted);
}

// Quick Sort
async function quickSort(arrayBars, setArrayBars, speed, sortingPaused) {
  // Helper function to partition the array and return the pivot index
  const partition = async (arr, low, high) => {
    // Select the rightmost element as the pivot
    const pivot = arr[high].value;
    let i = low - 1;
    // Iterate through the array and move elements smaller than pivot to the left side
    for (let j = low; j < high; j++) {
      // Check if sorting is paused
      while (sortingPaused) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      // Update the state to change color to indicate comparison
      const newArrayBars = [...arr];
      newArrayBars[j].backgroundColor = "#FF4136"; // Red color for moving bars
      setArrayBars(newArrayBars);
      // Pause for visualization (adjust speed based on user input)
      await new Promise((resolve) => setTimeout(resolve, speed));
      if (arr[j].value < pivot) {
        i++;
        // Swap if needed
        [arr[i], arr[j]] = [arr[j], arr[i]];
        // Perform the swap
        // Check if sorting is paused
        while (sortingPaused) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        // Update the state to change color to indicate swapping
        const swapArrayBars = [...arr];
        swapArrayBars[i].backgroundColor = "#2ecc71"; // Green color for sorted bars
        swapArrayBars[j].backgroundColor = "#2ecc71"; // Green color for sorted bars
        setArrayBars(swapArrayBars);
        // Pause for visualization (adjust speed based on user input)
        await new Promise((resolve) => setTimeout(resolve, speed));
        // Reset color after swapping
        swapArrayBars[i].backgroundColor = "#3498db"; // Blue color for initial bars
        swapArrayBars[j].backgroundColor = "#3498db"; // Blue color for initial bars
        setArrayBars(swapArrayBars);
      }
    }
    // Swap the pivot element with the element at index i+1
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    // Change color to indicate sorted bar
    const newArrayBars = [...arr];
    newArrayBars[i + 1].backgroundColor = "#2ecc71"; // Green color for sorted bars
    setArrayBars(newArrayBars);
    return i + 1;
  };
  // Recursive function to perform quicksort
  const quickSortUtil = async (arr, low, high) => {
    if (low < high) {
      // Partition the array
      const pi = await partition(arr, low, high);
      // Recursively sort the sub-arrays
      await quickSortUtil(arr, low, pi - 1);
      await quickSortUtil(arr, pi + 1, high);
    }
  };
  // Initial call to quickSortUtil
  await quickSortUtil(arrayBars, 0, arrayBars.length - 1);

  // After sorting, set the color of all bars to green
  const newArrayBars = arrayBars.map((bar) => ({
    ...bar,
    backgroundColor: "#2ecc71",
  }));
  setArrayBars(newArrayBars);
}

// Merge Sort
async function mergeSort(arrayBars, setArrayBars, speed, sortingPaused) {
  const merge = async (arr, l, m, r) => {
    const n1 = m - l + 1;
    const n2 = r - m;
    let L = [],
      R = [];
    // Copy data to temporary arrays L[] and R[]
    for (let i = 0; i < n1; i++) L.push(arr[l + i]);
    for (let j = 0; j < n2; j++) R.push(arr[m + 1 + j]);
    let i = 0,
      j = 0,
      k = l;
    // Merge the temporary arrays back into arr[l..r]
    while (i < n1 && j < n2) {
      // Check if sorting is paused
      while (sortingPaused) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      // Update the state to change color to indicate the comparison
      if (arr[l + i] && arr[m + 1 + j]) {
        const newArrayBars = [...arr];
        newArrayBars[l + i].backgroundColor = "#FF4136";
        newArrayBars[m + 1 + j].backgroundColor = "#FF4136";
        setArrayBars(newArrayBars);
        // Pause for visualization (adjust speed based on user input)
        await new Promise((resolve) => setTimeout(resolve, speed));
        // Reset color after comparison
        newArrayBars[l + i].backgroundColor = "#3498db";
        newArrayBars[m + 1 + j].backgroundColor = "#3498db";
        setArrayBars(newArrayBars);
      }
      if (L[i].value <= R[j].value) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
    }
    // Copy the remaining elements of L[], if there are any
    while (i < n1) {
      arr[k] = L[i];
      // Change color to green after merging
      const newArrayBars = [...arr];
      newArrayBars[k].backgroundColor = "#2ecc71";
      setArrayBars(newArrayBars);
      i++;
      k++;
    }
    // Copy the remaining elements of R[], if there are any
    while (j < n2) {
      arr[k] = R[j];
      // Change color to green after merging
      const newArrayBars = [...arr];
      newArrayBars[k].backgroundColor = "#2ecc71";
      setArrayBars(newArrayBars);
      j++;
      k++;
    }
  };
  const mergeSortUtil = async (arr, l, r) => {
    if (l >= r) return;
    const m = l + Math.floor((r - l) / 2);
    await mergeSortUtil(arr, l, m);
    await mergeSortUtil(arr, m + 1, r);
    await merge(arr, l, m, r);
  };
  await mergeSortUtil(arrayBars, 0, arrayBars.length - 1);
  // Change color to indicate the entire array is sorted
  const newArrayBarsSorted = arrayBars.map((bar) => {
    return {
      ...bar,
      backgroundColor: "#2ecc71",
    };
  });
  setArrayBars(newArrayBarsSorted);
}

// Insertion Sort
async function insertionSort(arrayBars, setArrayBars, speed, sortingPaused) {
  const n = arrayBars.length;
  // Traverse through the array starting from the second element
  for (let i = 1; i < n; i++) {
    // Select the current element to be compared
    const key = arrayBars[i].value;
    let j = i - 1;
    // Move elements of array[0..i-1], that are greater than key, to one position ahead of their current position
    while (j >= 0 && arrayBars[j].value > key) {
      // Check if sorting is paused
      while (sortingPaused) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      // Update the state to change color to indicate the comparison
      const newArrayBars = [...arrayBars];
      newArrayBars[j].backgroundColor = "#FF4136";
      newArrayBars[j + 1].backgroundColor = "#FF4136";
      setArrayBars(newArrayBars);
      // Pause for visualization (adjust speed based on user input)
      await new Promise((resolve) => setTimeout(resolve, speed));
      // Swap if needed
      arrayBars[j + 1].value = arrayBars[j].value;
      // Perform the swap
      // Check if sorting is paused
      while (sortingPaused) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      // Update the state to change color to indicate the swap
      const newArrayBarsSwap = [...arrayBars];
      newArrayBarsSwap[j].backgroundColor = "#2ecc71";
      newArrayBarsSwap[j + 1].backgroundColor = "#2ecc71";
      setArrayBars(newArrayBarsSwap);
      // Pause for visualization (adjust speed based on user input)
      await new Promise((resolve) => setTimeout(resolve, speed));
      // Reset color after comparison
      newArrayBarsSwap[j].backgroundColor = "#3498db";
      newArrayBarsSwap[j + 1].backgroundColor = "#3498db";
      setArrayBars(newArrayBarsSwap);
      j = j - 1;
    }
    // Place the key at its correct position in the sorted array
    arrayBars[j + 1].value = key;
    // Change color to indicate the bar is sorted
    const newArrayBarsSorted = [...arrayBars];
    newArrayBarsSorted[j + 1].backgroundColor = "#2ecc71";
    setArrayBars(newArrayBarsSorted);
  }
  // Change color to indicate the entire array is sorted
  const newArrayBarsSorted = arrayBars.map((bar) => {
    return {
      ...bar,
      backgroundColor: "#2ecc71",
    };
  });
  setArrayBars(newArrayBarsSorted);
}

// Selection Sort
async function selectionSort(arrayBars, setArrayBars, speed, sortingPaused) {
  const n = arrayBars.length;
  // Traverse through all array elements
  for (let i = 0; i < n - 1; i++) {
    // Find the minimum element in the unsorted array
    let min_idx = i;
    for (let j = i + 1; j < n; j++) {
      // Check if sorting is paused
      while (sortingPaused) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      // Update the state to change color to indicate the comparison
      const newArrayBars = [...arrayBars];
      newArrayBars[i].backgroundColor = "#FF4136";
      newArrayBars[min_idx].backgroundColor = "#FF4136";
      setArrayBars(newArrayBars);
      // Pause for visualization (adjust speed based on user input)
      await new Promise((resolve) => setTimeout(resolve, speed));
      if (arrayBars[j].value < arrayBars[min_idx].value) {
        min_idx = j;
      }
    }
    // Swap the found minimum element with the first element
    // Swap if needed
    [arrayBars[min_idx], arrayBars[i]] = [arrayBars[i], arrayBars[min_idx]];
    // Perform the swap
    // Check if sorting is paused
    while (sortingPaused) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    // Update the state to change color to indicate the swap
    const newArrayBarsSwap = [...arrayBars];
    newArrayBarsSwap[i].backgroundColor = "#2ecc71";
    newArrayBarsSwap[min_idx].backgroundColor = "#2ecc71";
    setArrayBars(newArrayBarsSwap);
    // Pause for visualization (adjust speed based on user input)
    await new Promise((resolve) => setTimeout(resolve, speed));
    // Reset color after comparison
    newArrayBarsSwap[i].backgroundColor = "#3498db";
    newArrayBarsSwap[min_idx].backgroundColor = "#3498db";
    setArrayBars(newArrayBarsSwap);
    // Change color to indicate the current bar is sorted
    const newArrayBarsSorted = [...arrayBars];
    newArrayBarsSorted[i].backgroundColor = "#2ecc71";
    setArrayBars(newArrayBarsSorted);
  }
  // Change color to indicate the entire array is sorted
  const newArrayBarsSorted = arrayBars.map((bar) => {
    return {
      ...bar,
      backgroundColor: "#2ecc71",
    };
  });
  setArrayBars(newArrayBarsSorted);
}

// Heap Sort
async function heapSort(arrayBars, setArrayBars, speed, sortingPaused) {
  const n = arrayBars.length;
  // Function to perform heapify
  const heapify = async (arr, heapSize, i) => {
    let largest = i; // Initialize largest as root
    let left = 2 * i + 1; // left = 2*i + 1
    let right = 2 * i + 2; // right = 2*i + 2
    // Check if left child exists and is greater than root
    if (left < heapSize && arr[left].value > arr[largest].value) {
      largest = left;
    }
    // Check if right child exists and is greater than largest so far
    if (right < heapSize && arr[right].value > arr[largest].value) {
      largest = right;
    }
    // If largest is not root
    if (largest !== i) {
      // Swap arr[i] and arr[largest]
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      // Change color to indicate the swap
      const newArrayBars = [...arrayBars];
      newArrayBars[i].backgroundColor = "#FF4136";
      newArrayBars[largest].backgroundColor = "#FF4136";
      setArrayBars(newArrayBars);
      // Pause for visualization
      await new Promise((resolve) => setTimeout(resolve, speed));
      // Reset color after comparison
      newArrayBars[i].backgroundColor = "#3498db";
      newArrayBars[largest].backgroundColor = "#3498db";
      setArrayBars(newArrayBars);
      // Recursively heapify the affected sub-tree
      await heapify(arr, heapSize, largest);
    }
  };
  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arrayBars, n, i);
  }
  // One by one extract an element from heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arrayBars[0], arrayBars[i]] = [arrayBars[i], arrayBars[0]];
    // Change color to indicate the swap
    const newArrayBarsSwap = [...arrayBars];
    newArrayBarsSwap[0].backgroundColor = "#2ecc71";
    newArrayBarsSwap[i].backgroundColor = "#2ecc71";
    setArrayBars(newArrayBarsSwap);
    // Pause for visualization
    await new Promise((resolve) => setTimeout(resolve, speed));
    // Reset color after comparison
    newArrayBarsSwap[0].backgroundColor = "#3498db";
    newArrayBarsSwap[i].backgroundColor = "#3498db";
    setArrayBars(newArrayBarsSwap);
    // Check if sorting is paused
    while (sortingPaused) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    // Call max heapify on the reduced heap
    await heapify(arrayBars, i, 0);
  }
  // Change color to indicate the entire array is sorted
  const newArrayBarsSorted = arrayBars.map((bar) => {
    return {
      ...bar,
      backgroundColor: "#2ecc71",
    };
  });
  setArrayBars(newArrayBarsSorted);
}
export {
  bubbleSort,
  mergeSort,
  selectionSort,
  insertionSort,
  quickSort,
  heapSort,
};
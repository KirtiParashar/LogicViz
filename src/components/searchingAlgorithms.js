// Linear Search Algorithm with Visualization Logic
import { mergeSort } from "./sortingAlgorithms";

// Linear Search
async function linearSearch(arrayBars, searchValue, setArrayBars) {
  let found = false;
  for (let i = 0; i < arrayBars.length; i++) {
    // Highlight the current bar being compared
    const newArrayBars = [...arrayBars];
    newArrayBars[i].backgroundColor = "#FF4136"; // Red color for comparison
    setArrayBars(newArrayBars);
    // Pause for visualization
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (arrayBars[i].value === searchValue) {
      // If search value is found, highlight the bar
      const newArrayBars = [...arrayBars];
      newArrayBars[i].backgroundColor = "#FFD700"; // Yellow color for found element
      setArrayBars(newArrayBars);
      found = true;
      break;
    }
    // Reset color after comparison
    newArrayBars[i].backgroundColor = "#3498db"; // Blue color for initial bars
    setArrayBars(newArrayBars);
  }
  if (!found) {
    // If the search value is not found, display a message
    alert("Number not found.");
  }
}

// Binary Search
async function binarySearch(arrayBars, searchValue, setArrayBars) {
  // Sorting the array before performing binary search
  await mergeSort(arrayBars, setArrayBars, 50, false); // Assuming mergeSort is implemented
  let left = 0;
  let right = arrayBars.length - 1;
  let found = false;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // Highlight search value bar during sorting
    const newArrayBars = [...arrayBars];
    newArrayBars[mid].backgroundColor = "#FF4136"; // Red color for comparison
    setArrayBars(newArrayBars);
    // Pause for visualization
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (arrayBars[mid].value === searchValue) {
      found = true;
      break;
    } else if (arrayBars[mid].value < searchValue) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
    // Reset color after comparison
    newArrayBars[mid].backgroundColor = "#3498db"; // Blue color for initial bars
    setArrayBars(newArrayBars);
  }
  if (found) {
    // Highlight the input value number if found
    const newArrayBars = [...arrayBars];
    newArrayBars.forEach((bar) => {
      bar.backgroundColor = bar.value === searchValue ? "#FFD700" : "#3498db"; // Yellow for search value, Blue for others
    });
    setArrayBars(newArrayBars);
    return left;
  } else {
    // If the search value is not found, display a message
    alert("Number not found.");
    return -1;
  }
}
export { linearSearch, binarySearch };
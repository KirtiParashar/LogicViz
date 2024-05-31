import React, { useState, useRef } from "react";
import "./sorting.css";
import {
  bubbleSort,
  quickSort,
  mergeSort,
  insertionSort,
  selectionSort,
  heapSort,
} from "./sortingAlgorithms";
import { linearSearch, binarySearch } from "./searchingAlgorithms";

function SortingVisualizer() {
  const [arrayBars, setArrayBars] = useState([]);
  const [speed, setSpeed] = useState(50);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");
  const [sortingPaused, setSortingPaused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchIndex, setSearchIndex] = useState(-1);
  const [algorithmInfo, setAlgorithmInfo] = useState({
    timeComplexity: "",
    spaceComplexity: "",
    pseudoCode: "",
  });
  const unsortedArray = useRef([]);

  function generateArray() {
    const arraySize = 20;
    const newArrayBars = [];

    for (let i = 0; i < arraySize; i++) {
      const value = Math.floor(Math.random() * 100) + 1;
      newArrayBars.push({ value });
    }

    setArrayBars(newArrayBars);
    unsortedArray.current = [...newArrayBars]; // Save the unsorted array
    setSortingPaused(false); // Reset sorting state
    setSearchIndex(-1); // Reset search index
  }

  async function visualizeSorting() {
    switch (selectedAlgorithm) {
      case "bubble":
        await bubbleSort(arrayBars, setArrayBars, speed, sortingPaused);
        break;
      case "quick":
        await quickSort(arrayBars, setArrayBars, speed, sortingPaused);
        break;
      case "merge":
        await mergeSort(arrayBars, setArrayBars, speed, sortingPaused);
        break;
      case "insertion":
        await insertionSort(arrayBars, setArrayBars, speed, sortingPaused);
        break;
      case "selection":
        await selectionSort(arrayBars, setArrayBars, speed, sortingPaused);
        break;
      case "heap":
        await heapSort(arrayBars, setArrayBars, speed, sortingPaused);
        break;
      // Implement other sorting algorithms similarly
      default:
        break;
    }
    updateAlgorithmInfo(selectedAlgorithm); // Update algorithm information
  }

  async function pauseSorting() {
    setSortingPaused((prevState) => !prevState); // Toggle sorting state
  }

  // function resetSorting() {
  //   setArrayBars([...unsortedArray.current]); // Reset to the unsorted array
  //   setSortingPaused(false); // Reset sorting state
  // }

  function resetArray(restartSorting = false) {
  // Reload the unsorted array
  const newArrayBars = unsortedArray.current.map((bar) => ({
    ...bar,
    backgroundColor: "#3498db", // Reset the color to blue
  }));
  setArrayBars(newArrayBars); // Set the array bars to the unsorted array with blue color
  setSortingPaused(false); // Reset sorting state
  setSearchIndex(-1); // Reset search index
  // If sorting is in progress and the restartSorting flag is true, reset it
  if (restartSorting && sortingPaused) {
    visualizeSorting();
  }
}


  async function visualizeSearching() {
    if (searchValue.trim() === "") return; // If search value is empty, do nothing
    switch (selectedAlgorithm) {
      case "linear":
        const linearIndex = await linearSearch(
          arrayBars,
          parseInt(searchValue, 10),
          setArrayBars
        );
        setSearchIndex(linearIndex);
        setAlgorithmInfo({
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          pseudoCode: `function linearSearch(arr, target)
for i = 0 to arr.length-1
if arr[i] equals target
return i
return -1`,
        });
        break;
      case "binary":
        const binaryIndex = await binarySearch(
          arrayBars,
          parseInt(searchValue, 10),
          setArrayBars
        );
        setSearchIndex(binaryIndex);
        setAlgorithmInfo({
          timeComplexity: "O(log n)",
          spaceComplexity: "O(1)",
          pseudoCode: `for i = 0 to n-1
for j = 0 to n-i-1
if arr[j] > arr[j+1]
swap(arr[j], arr[j+1])`,
        });
        break;
      default:
        break;
    }
  }

  // Function to update algorithm information
  function updateAlgorithmInfo(algorithm) {
    let info;
    switch (algorithm) {
      case "bubble":
        info = {
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
          pseudoCode: `for i = 0 to n-1
  for j = 0 to n-i-1
    if arr[j] > arr[j+1]
      swap(arr[j], arr[j+1])
`,
        };
        break;
      case "quick":
        info = {
          timeComplexity: "O(n log n) average, O(n^2) worst case",
          spaceComplexity: "O(log n)",
          pseudoCode: `function quickSort(arr, low, high)
  if low < high
    pi = partition(arr, low, high)
      quickSort(arr, low, pi - 1)
      quickSort(arr, pi + 1, high)
  
function partition(arr, low, high)
  pivot = arr[high]
    i = low - 1
    for j = low to high-1
      if arr[j] < pivot
        i++
    swap(arr[i], arr[j])
    swap(arr[i + 1], arr[high])
  return i + 1`,
        };
        break;
      case "merge":
        info = {
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(n)",
          pseudoCode: `function mergeSort(arr, l, r)
  if l < r
    m = (l+r)/2
    mergeSort(arr, l, m)
  mergeSort(arr, m+1, r)
merge(arr, l, m, r)
  
function merge(arr, l, m, r)
  n1 = m - l + 1
  n2 = r - m
  L[0...n1], R[0...n2]
  for i = 0 to n1-1
    L[i] = arr[l + i]
    for j = 0 to n2-1
      R[j] = arr[m + 1+ j]
    i = 0
    j = 0
    k = l
    while i < n1 and j < n2
      if L[i] <= R[j]
        arr[k] = L[i]
        i++
      else
        arr[k] = R[j]
        j++
      k++
    while i < n1
      arr[k] = L[i]
      i++
      k++
    while j < n2
      arr[k] = R[j]
      j++
    k++`,
        };
        break;
      case "insertion":
        info = {
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
          pseudoCode: `function insertionSort(arr)
  n = arr.length
  for i = 1 to n-1
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key
      arr[j + 1] = arr[j]
      j = j - 1
      arr[j + 1] = key`,
        };
        break;
      case "selection":
        info = {
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
          pseudoCode: `function selectionSort(arr)
  n = arr.length
    for i = 0 to n-1
      min_index = i
      for j = i+1 to n
        if arr[j] < arr[min_index]
          min_index = j
          swap(arr[min_index], arr[i])`,
        };
        break;
      case "heap":
        info = {
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(1)",
          pseudoCode: `function heapify(arr, n, i)
  largest = i
  l = 2*i + 1
  r = 2*i + 2
  if l < n and arr[l] > arr[largest]
    largest = l
    if r < n and arr[r] > arr[largest]
      largest = r
      if largest != i
        swap(arr[i], arr[largest])
        heapify(arr, n, largest)
  
function heapSort(arr)
  n = arr.length
  for i = n/2 - 1 down to 0
    heapify(arr, n, i)
    for i = n-1 down to 0
      swap(arr[0], arr[i])
      heapify(arr, i, 0)`,
        };
        break;
      case "linear":
        info = {
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          pseudoCode: `function linearSearch(arr, target)
  for i = 0 to arr.length-1
    if arr[i] equals target
      return i
    return -1`,
        };
        break;
      case "binary":
        info = {
          timeComplexity: "O(log n)",
          spaceComplexity: "O(1)",
          pseudoCode: `for i = 0 to n-1
  for j = 0 to n-i-1
    if arr[j] > arr[j+1]
      swap(arr[j], arr[j+1])`,
        };
        break;
      default:
        break;
    }
    setAlgorithmInfo(info);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", minHeight: "85vh" }}>
      <div className="container">
        <h2>Sorting & Searching Visualizer</h2>
        <div id="array-container">
          {arrayBars.map((bar, index) => (
            <div
              key={index}
              className="array-bar"
              style={{
                height: `${bar.value * 3}px`,
                backgroundColor: bar.backgroundColor || "#3498db",
                border: searchIndex === index ? "2px solid red" : "none", // Highlight search index
              }}
            >
              <span>{bar.value}</span>
            </div>
          ))}
        </div>
        <div className="controls">
          <div>
            <label htmlFor="algorithm-select">Select Algorithm:</label>
            <select
              id="algorithm-select"
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
            >
              <option value="bubble">Bubble Sort</option>
              <option value="quick">Quick Sort</option>
              <option value="merge">Merge Sort</option>
              <option value="insertion">Insertion Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="heap">Heap Sort</option>
              <option value="linear">Linear Search</option>
              <option value="binary">Binary Search</option>
              {/* Add options for other sorting algorithms */}
            </select>
            <label htmlFor="speed-range">Speed:</label>
            <input
              type="range"
              id="speed-range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
            />
          </div>
          <br />
          {(selectedAlgorithm === "linear" ||
            selectedAlgorithm === "binary") && (
            <>
              <label htmlFor="search-value">Search Value:</label>
              <input
                type="number"
                id="search-value"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </>
          )}

          <button onClick={generateArray}>Generate New Array</button>

          {selectedAlgorithm === "linear" || selectedAlgorithm === "binary" ? (
            <button onClick={visualizeSearching}>Visualize Searching</button>
          ) : (
            <>
              <button onClick={visualizeSorting}>Visualize Sorting</button>
              <button onClick={pauseSorting}>
                {sortingPaused ? "Resume Sorting" : "Pause Sorting"}
              </button>
            </>
          )}
          {/* <button onClick={resetSorting}>Reset Sorting</button> */}
          <button onClick={resetArray}>Reset Array</button>
        </div>
        <h3>Time Complexity: {algorithmInfo.timeComplexity}</h3>
        <h3>Space Complexity: {algorithmInfo.spaceComplexity}</h3>
      </div>
      <div className="container2">
        <h3>Pseudo Code:</h3>
        <pre style={{ fontSize: "large" }}>{algorithmInfo.pseudoCode}</pre>
      </div>
    </div>
  );
}

export default SortingVisualizer;

// LandingPage.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import mergesort from "./mergesort.png";
import bubblesort from "./bubblesort.png";
import selectionsort from "./selectionsort.png";
import insertionsort from "./insertionsort.png";
import heapsort from "./heapsort.png";
import quicksort from "./quicksort.png";
import linearsort from "./linearsort.jpeg";
import binarysearch from "./binarysearch.jpeg";

function LandingPage() {
  const [showSorting, setShowSorting] = useState(true);

  const toggleSorting = () => {
    setShowSorting(true);
  };

  const toggleSearching = () => {
    setShowSorting(false);
  };

  return (
    <div className="landing">
      <h1>Welcome to LogicViz</h1>
      <h1>Visualize Code Logic with Clarity and Insight</h1>
      <p className="intro_para">
        LogicViz is a powerful tool for visualizing algorithms and data structures, making it easier for developers to understand and optimize their code.<br />
        Whether you're a beginner learning programming concepts or an experienced developer looking to optimize your algorithms, LogicViz has you covered.
      </p>
      <div className="algorithm">
        <Link to="#" className="sort" onClick={toggleSorting}>
          <h3>Sorting</h3>
          <p>Sorting</p>
        </Link>
        <Link to="#" className="search" onClick={toggleSearching}>
          <h3>Searching</h3>
          <p>Searching</p>
        </Link>
      </div>
      {showSorting ? (
        <div className="algorithm-options">
          <Link to="/visualization">
            <img className="image" src={bubblesort} alt="Bubble Sort" />
            <h3>Bubble Sort</h3>
            <p>
              A simple sorting algorithm that repeatedly steps through the list,
              compares adjacent elements, and swaps them if they are in the
              wrong order.
            </p>
          </Link>
          <Link to="/visualization">
            <img className="image" src={mergesort} alt="Merge Sort" />
            <h3>Merge Sort</h3>
            <p>
              An efficient, stable, and comparison-based sorting algorithm that
              works on the principle of divide and conquer.
            </p>
          </Link>
          <Link to="/visualization">
            <img className="image" src={insertionsort} alt="Insertion Sort" />
            <h3>Insertion Sort</h3>
            <p>
              A simple sorting algorithm that builds the final sorted array one
              item at a time. It is much less efficient on large lists than more
              advanced algorithms.
            </p>
          </Link>
          <Link to="/visualization">
            <img className="image" src={selectionsort} alt="Selection Sort" />
            <h3>Selection Sort</h3>
            <p>
              An in-place comparison sorting algorithm. It divides the input
              list into a sorted and an unsorted region, and repeatedly selects
              the smallest (or largest) element from the unsorted region and
              swaps it with the first element of the unsorted region.
            </p>
          </Link>
          <Link to="/visualization">
            <img className="image" src={quicksort} alt="Quick Sort" />
            <h3>Quick Sort</h3>
            <p>
              An efficient sorting algorithm that uses a divide-and-conquer
              strategy to divide the input array into smaller sub-arrays.
            </p>
          </Link>
          <Link to="/visualization">
            <img className="image" src={heapsort} alt="Heap Sort" />
            <h3>Heap Sort</h3>
            <p>
              A comparison-based sorting algorithm that uses a binary heap data
              structure to build a max-heap and then progressively reduce it to
              a sorted array.
            </p>
          </Link>
        </div>
      ) : (
        <div className="algorithm-options">
          <Link to="/visualization">
            <img src={linearsort} alt="Linear Search" />
            <h3>Linear Search</h3>
            <p>
              Linear search, the simplest search algorithm, is mainly used to
              find the element from an unordered list. It is also known by
              another name called sequential search algorithm.
            </p>
          </Link>
          <Link to="/visualization">
            <img src={binarysearch} alt="Binary Search" />
            <h3>Binary Search</h3>
            <p>
              Binary search follows the divide and conquer approach in which the
              list is divided into two halves, and the item is compared with the
              middle element of the list. If the match is found then, the
              location of the middle element is returned. Otherwise, we search
              into either of the halves depending upon the result produced
              through the match.
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
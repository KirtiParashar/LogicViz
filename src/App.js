// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import AlgorithmVisualization from "./components/AlgorithmVisualization";
import "./App.css";
// import AlgorithmVisualizer from "./components/AlgorithmVisualization";
import SortingVisualizer from "./components/sortingVisualizer";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/visualization"
            element={<SortingVisualizer />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

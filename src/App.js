import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PerceptronVisualizer from "./components/PerceptronVisualizer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <PerceptronVisualizer />
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
    </div>
  );
}

export default App;

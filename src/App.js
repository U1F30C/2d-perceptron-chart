import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NeuronVisualizer from "./components/NeuronVisualizer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <NeuronVisualizer />
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
    </div>
  );
}

export default App;

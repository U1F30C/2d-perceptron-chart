import React from "react";
import "./App.css";
import PerceptronVisualizer from "./components/PerceptronVisualizer";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <PerceptronVisualizer />
      </header>
    </div>
  );
}

export default App;

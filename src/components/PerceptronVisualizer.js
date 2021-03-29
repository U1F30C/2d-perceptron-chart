import React, { Component } from "react";
import ParametersForm from "./ParametersForm";
import { Neuron } from "./../utils/Neuron";

import { Scatter } from "react-chartjs-2";
import { generateLine } from "../utils/math";

class PerceptronVisualizer extends Component {
  state = { line: [], positive: [], negative: [] };
  constructor(props) {
    super(props);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.neuron = new Neuron(1, (x) => (x > 0 ? 1 : 0));
  }
  neuron;
  converges(data) {
    for (const [inputs, outputs] of data) {
      const desired = outputs.slice(-1)[0];
      const actual = this.neuron.predict(inputs);
      console.log(inputs, desired, actual);
      if (actual != desired) {
        return false;
      }
    }
    return true;
  }

  async train(data) {
    const learningRate = 0.3;
    while (!this.converges(data)) {
      data.forEach(([inputs, outputs]) => {
        const gradient =
          (-this.neuron.predict(inputs) + outputs[0]) * learningRate;
        this.neuron.adjust(gradient);
      });
      await this.sleep(0.1);
    }
  }
  sleep(seconds) {
    return new Promise((resolve, _reject) => {
      setTimeout(resolve, 1000 * seconds);
    });
  }
  separateSet(data, label) {
    return data
      .filter(([_, outputs]) => outputs.slice(-1)[0] == label)
      .map(([inputs]) => {
        let [x, y] = inputs;
        return { x, y };
      });
  }
  async handleDataChange(data) {
    await this.train(data);
    const positive = this.separateSet(data, 1);
    const negative = this.separateSet(data, 0);
    this.setState({
      line: generateLine(...this.neuron.weights),
      positive,
      negative,
    });
  }
  render() {
    return (
      <div>
        <ParametersForm onChange={this.handleDataChange} />
        <Scatter
          data={{
            datasets: [
              {
                label: "Hyperplano",
                data: this.state.line,
                type: "line",
                backgroundColor: "rgba(255,255,255, 0)",
                borderColor: "rgba(0,100,255, 1)",
                hoverBackgroundColor: "rgba(230, 236, 235, 0.75)",
                hoverBorderColor: "rgba(230, 236, 235, 0.75)",
              },
              {
                label: "Positivos",
                data: this.state.positive,
                type: "scatter",
                backgroundColor: "rgba(0,255,0, 1)",
                borderColor: "rgba(0,255,0, 1)",
                hoverBackgroundColor: "rgba(230, 236, 235, 0.75)",
                hoverBorderColor: "rgba(230, 236, 235, 0.75)",
              },
              {
                label: "Negativos",
                data: this.state.negative,
                type: "scatter",
                backgroundColor: "rgba(255,0,0, 1)",
                borderColor: "rgba(255,0,0, 1)",
                hoverBackgroundColor: "rgba(230, 236, 235, 0.75)",
                hoverBorderColor: "rgba(230, 236, 235, 0.75)",
              },
            ],
            options: {
              scales: {
                yAxes: [{}],
                xAxes: [
                  {
                    type: "linear",
                    position: "bottom",
                  },
                ],
              },
              responsive: true,
            },
          }}
          width={200}
          height={200}
        />
      </div>
    );
  }
}

export default PerceptronVisualizer;

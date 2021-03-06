import React, { Component } from "react";
import ParametersForm from "./ParametersForm";
import { range } from "lodash";

import { Line, Scatter } from "react-chartjs-2";

class NeuronVisualizer extends Component {
  state = { error: [], lines: [] };
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
  }

  updateState({ error: currentError, lines, categories }) {
    const { error } = this.state;
    this.setState({
      error: [...error, { x: error.length, y: currentError }],
      lines: categories,
    });
  }

  render() {
    return (
      <div>
        <ParametersForm onSubmit={this.updateState} />
        {/* <Line
          data={{
            labels: [...Array(this.state.error.length)].map((_, i) => i + ""),
            datasets: [
              {
                label: "Error",
                data: this.state.error,
                // type: "line",
                backgroundColor: "rgba(255,255,255, 0)",
                borderColor: "rgba(0,100,255, 1)",
                hoverBackgroundColor: "rgba(230, 236, 235, 0.75)",
                hoverBorderColor: "rgba(230, 236, 235, 0.75)",
              },
            ],
            options,
          }}
          width={300}
          height={300}
        /> */}

        <Scatter
          data={{
            labels: range(-6, 6, 0.5),
            datasets: this.state.lines,
            options,
          }}
          width={300}
          height={300}
        />
      </div>
    );
  }
}

let options = {
  scales: {
    yAxes: [{}],
    xAxes: [
      {
        type: "linear",
        // position: "bottom",
        display: true, // mandatory
        scaleLabel: {
          display: true, // mandatory
          labelString: "Your label", // optional
        },
      },
    ],
  },
  responsive: true,
};

export default NeuronVisualizer;

import React, { Component } from "react";
import ParametersForm from "./ParametersForm";

import { Scatter } from "react-chartjs-2";

class PerceptronVisualizer extends Component {
  state = { line: [], positive: [], negative: [] };
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
  }

  updateState(state) {
    console.log(state);
    this.setState(state);
  }
  render() {
    return (
      <div>
        <ParametersForm onSubmit={this.updateState} />
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

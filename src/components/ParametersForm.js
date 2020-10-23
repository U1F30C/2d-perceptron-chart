import React, { Component } from "react";
import { Perceptron } from "./../utils/Perceptron";
import { unzip } from "lodash";

class ParametersForm extends Component {
  state = {
    inputs: "0,0\n0,1\n1,0\n1,1",
    outputs: "0,0,0,1\n1,0,0,1\n1,0,1,0\n1,1,1,0",
  };
  handleChange = this.handleChange.bind(this);
  calculateWeights = this.calculateWeights.bind(this);

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async _calculateWeights(perceptrons) {
    let layerError;
    let actualOutputs;
    while (!perceptrons.every((perceptron) => perceptron.converges())) {
      layerError = 0;
      actualOutputs = [];
      perceptrons.forEach((perceptron) => {
        perceptron.train();
        layerError += perceptron.error();
        actualOutputs.push(perceptron.currentPredictions());
      });
      actualOutputs = unzip(actualOutputs);
      actualOutputs = actualOutputs
        .map((actualOutput) => actualOutput.join(","))
        .join("\n");

        let lines = perceptrons.map(this.generateLine).map((line, i) => ({
          label: "Hyperplano " + i,
          data: line,
          type: "line",
          backgroundColor: "rgba(255,255,255, 0)",
          borderColor: "rgba(0,100,255, 1)",
          hoverBackgroundColor: "rgba(230, 236, 235, 0.75)",
          hoverBorderColor: "rgba(230, 236, 235, 0.75)",
        }));
        this.props.onSubmit({ error: layerError, lines });
      this.setState({ actualOutputs });
      await this.sleep(0.1);
    }

    layerError = 0;
    actualOutputs = [];
    perceptrons.forEach((perceptron) => {
      layerError += Math.pow(perceptron.error(), 2);
      actualOutputs.push(perceptron.currentPredictions());
    });
    actualOutputs = unzip(actualOutputs);
    actualOutputs = actualOutputs
      .map((actualOutput) => actualOutput.join(","))
      .join("\n");

    let lines = perceptrons.map(this.generateLine).map((line, i) => ({
      label: "Hyperplano " + i,
      data: line,
      type: "line",
      backgroundColor: "rgba(255,255,255, 0)",
      borderColor: "rgba(0,100,255, 1)",
      hoverBackgroundColor: "rgba(230, 236, 235, 0.75)",
      hoverBorderColor: "rgba(230, 236, 235, 0.75)",
    }));
    this.props.onSubmit({ error: layerError, lines });
    this.setState({ actualOutputs });
  }

  generateLine(perceptron) {
    const [w1, w2] = perceptron.weights;
    const bias = perceptron.bias;
    // y = b/w2 - w1x1/w2
    let leftLimit = -1,
      rightLimit = 2;

    let p1 = { x: leftLimit, y: bias / w2 - (w1 * leftLimit) / w2 };
    let p2 = { x: rightLimit, y: bias / w2 - (w1 * rightLimit) / w2 };
    return [p1, p2];
  }

  async calculateWeights(e) {
    e.preventDefault();
    let { inputs: _inputs, outputs: _outputs } = this.state;
    _inputs = _inputs.split("\n").map((rule) => rule.split(",").map((e) => +e));
    _outputs = _outputs
      .split("\n")
      .map((output) => output.split(",").map((output) => +output));
    _outputs = unzip(_outputs);

    const perceptrons = _outputs.map((outputColumn) => {
      let perceptron = this.getPerceptron(_inputs[0]?.length);
      _inputs.forEach((inputRow, i) =>
        perceptron.addRule({ inputs: inputRow, target: outputColumn[i] })
      );
      return perceptron;
    });

    this._calculateWeights(perceptrons);
  }

  getPerceptron(length) {
    return Perceptron(
      Array.from(Array(length)).map((_) => Math.random()),
      Math.random()
    );
  }

  sleep(seconds) {
    return new Promise((resolve, _reject) => {
      setTimeout(resolve, 1000 * seconds);
    });
  }

  render() {
    return (
      <form>
        <label>
          Entradas:
          <textarea
            name="inputs"
            value={this.state.inputs}
            onChange={this.handleChange}
            style={{ width: 100, height: 150 }}
          />
        </label>
        <label>
          Salidas esperadas:
          <textarea
            name="outputs"
            value={this.state.outputs}
            onChange={this.handleChange}
            style={{ width: 70, height: 150 }}
          />
        </label>
        <label>
          Salidas reales:
          <textarea
            name="actualOutputs"
            value={this.state.actualOutputs}
            style={{ width: 70, height: 150 }}
          />
        </label>
        <br />
        <button onClick={this.calculateWeights}>Calcular</button>
      </form>
    );
  }
}

export default ParametersForm;

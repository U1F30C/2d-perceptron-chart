import React, { Component } from "react";
import { Layer } from "./../utils/Layer";
import { unzip, groupBy, mapValues, entries } from "lodash";
import randomColor from "randomcolor";

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

  async _calculateWeights(layer, inputs) {
    let actualOutputs;
    while (!layer.converges()) {
      actualOutputs = layer.train();
      actualOutputs = unzip(actualOutputs);
      actualOutputs = actualOutputs
        .map((actualOutput) => actualOutput.join(","))
        .join("\n");

      let lines = layer.neurons.map(this.generateLine).map((line, i) => ({
        label: "Hyperplano " + i,
        data: line,
        type: "line",
        backgroundColor: "rgba(255,255,255, 0)",
        borderColor: "rgba(0,100,255, 1)",
        hoverBackgroundColor: "rgba(230, 236, 235, 0.75)",
        hoverBorderColor: "rgba(230, 236, 235, 0.75)",
      }));
      const categories = entries(
        groupBy(inputs, (input) => layer.categorize(input))
      ).map(([category, categorized]) => {
        const color = randomColor();
        return {
          label: "Categoria " + category,
          data: categorized.map(([x, y]) => ({ x, y })),
          type: "scatter",
          backgroundColor: color,
          borderColor: color,
          hoverBackgroundColor: "rgba(230, 236, 235, 0.75)",
          hoverBorderColor: "rgba(230, 236, 235, 0.75)",
        };
      });
      this.props.onSubmit({ error: layer.error, lines, categories });
      this.setState({ actualOutputs });
      await this.sleep(0.1);
    }
  }

  generateLine(neuron) {
    const [w1, w2] = neuron.weights;
    const bias = neuron.bias;
    // y = b/w2 - w1x1/w2
    let leftLimit = -2,
      rightLimit = 3;

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
    const layer = Layer(_inputs, _outputs);
    this._calculateWeights(layer, _inputs);
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

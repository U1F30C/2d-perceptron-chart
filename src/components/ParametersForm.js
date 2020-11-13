import React, { Component } from "react";
import { Layer } from "./../utils/Layer";
import { unzip, groupBy, entries, flatMap, range } from "lodash";
import randomColor from "randomcolor";
import { Network } from "../utils/Network";

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
    // while (!layer.converges()) {
    actualOutputs = layer.train();
    actualOutputs = unzip(actualOutputs);
    actualOutputs = actualOutputs
      .map((actualOutput) => actualOutput.join(","))
      .join("\n");

    inputs = flatMap(
      range(-30, 30, 1).map((x) => range(-30, 30, 1).map((y) => [x, y]))
    );
    const network = Network(null, null, [2, 1]);
    const categories = entries(
      groupBy(inputs, (input) => Math.round(network.forward(input)))
    ).map(([category, categorized]) => {
      return generateSet(
        (category == 1 ? "Unos " : "Ceros ") + category,
        categorized.map(([x, y]) => ({ x, y })),
        "scatter"
      );
    });
    this.props.onSubmit({ error: layer.error, lines: null, categories });
    this.setState({ actualOutputs });
    await this.sleep(0.1);
    // }
  }

  async calculateWeights(e) {
    e.preventDefault();
    let { inputs: _inputs, outputs: _outputs } = this.state;
    _inputs = _inputs.split("\n").map((rule) => rule.split(",").map((e) => +e));
    _outputs = _outputs
      .split("\n")
      .map((output) => output.split(",").map((output) => +output));
    _outputs = unzip(_outputs);
    const layer = Layer(_inputs[0].length);
    layer.addTrainingData(_inputs, _outputs);
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

function generateSet(label, data, type) {
  const color = randomColor();

  return {
    label,
    data,
    type,
    backgroundColor: color,
    borderColor: color,
    hoverBackgroundColor: "rgba(230, 236, 235, 0.75)",
    hoverBorderColor: "rgba(230, 236, 235, 0.75)",
  };
}

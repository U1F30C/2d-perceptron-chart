import React, { Component } from "react";
import { groupBy, entries, flatMap, range } from "lodash";
import randomColor from "randomcolor";
import { Network } from "../utils/Network";

class ParametersForm extends Component {
  state = {
    inputs: "0,0\n0,1\n1,0\n1,1",
    outputs: "0\n1\n1\n0",
  };
  handleChange = this.handleChange.bind(this);
  train = this.train.bind(this);

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async _train(network, inputSet) {
    let actualOutputs;
    let i = 0;
    while (!network.converges(0.1)) {
      network.train();
      actualOutputs = inputSet
        .map((input) =>
          network
            .forward(input)
            .map((x) => Math.round(x))
            .join(",")
        )
        .join("\n");
      if (i == 1000) {
        console.log(network.error);
        i = 0;
        this.setState({ actualOutputs });
        await this.sleep(0.1);
      }
      i++;
    }

    const upper = 5;
    const lower = -upper;
    const step = upper / 5;
    const inputs = flatMap(
      range(lower, upper, step).map((x) =>
        range(lower, upper, step).map((y) => [x, y])
      )
    );
    const categories = entries(
      groupBy(inputs, (input) => Math.round(network.forward(input)[0]))
    ).map(([category, categorized]) => {
      return generateSet(
        (category == 1 ? "Unos " : "Ceros ") + category,
        categorized.map(([x, y]) => ({ x, y })),
        "scatter"
      );
    });
    this.props.onSubmit({ error: network.error, lines: null, categories });
  }

  async train(e) {
    e.preventDefault();
    let { inputs: _inputs, outputs: _outputs } = this.state;
    _inputs = _inputs.split("\n").map((rule) => rule.split(",").map((e) => +e));
    _outputs = _outputs
      .split("\n")
      .map((output) => output.split(",").map((output) => +output));
    const network = Network([3, _outputs[0].length], 0.9);
    network.trainingData = _inputs.map((inputSet, i) => [
      inputSet,
      _outputs[i],
    ]);
    this._train(network, _inputs);
  }

  sleep(time) {
    return new Promise((resolve, _reject) => {
      setTimeout(resolve, time);
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
        <button onClick={this.train}>Calcular</button>
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

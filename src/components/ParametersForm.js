import React, { Component } from "react";
import { Perceptron } from "./../utils/Perceptron";
import { minBy, maxBy } from "lodash";

class ParametersForm extends Component {
  state = { inputs: "0,0\n0,1\n1,0\n1,1", outputs: "0\n1\n1\n1" };
  handleChange = this.handleChange.bind(this);
  calculateWeights = this.calculateWeights.bind(this);

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async _calculateWeights(trainingRules) {
    let perceptron = Perceptron([Math.random(), Math.random()], Math.random());
    while (!perceptron.converges(trainingRules)) {
      trainingRules.forEach((rule) => {
        perceptron.train(rule);
      });
      await this.sleep(0.1);
      this.props.onSubmit(perceptron.error(trainingRules));
    }
  }

  async calculateWeights(e) {
    e.preventDefault();
    let { inputs, outputs } = this.state;
    inputs = inputs.split("\n").map((rule) => rule.split(",").map((e) => +e));
    outputs = outputs.split("\n").map((output) => +output);

    const rules = inputs.map((a, i) => [...a, outputs[i]]);
    this._calculateWeights(rules);
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
            style={{ width: 300, height: 300 }}
          />
        </label>
        <label>
          Salidas:
          <textarea
            name="outputs"
            value={this.state.outputs}
            onChange={this.handleChange}
            style={{ width: 50, height: 300 }}
          />
        </label>
        <br />
        <button onClick={this.calculateWeights}>Calcular</button>
      </form>
    );
  }
}

export default ParametersForm;

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
    let perceptron = Perceptron(
      Array.from(Array(trainingRules[0]?.inputs.length)).map((_) =>
        Math.random()
      ),
      Math.random()
    );
    trainingRules.forEach((rule) => {
      perceptron.addRule(rule);
    });
    while (!perceptron.converges(trainingRules)) {
      perceptron.train();
      this.props.onSubmit(perceptron.error(trainingRules));
      await this.sleep(0.1);
    }
    const actual = trainingRules.map((rule) => perceptron.predict(rule.inputs));
    this.setState({ actualOutputs: actual.join("\n") });
  }

  async calculateWeights(e) {
    e.preventDefault();
    let { inputs, outputs } = this.state;
    inputs = inputs.split("\n").map((rule) => rule.split(",").map((e) => +e));
    outputs = outputs.split("\n").map((output) => +output);

    const rules = inputs.map((a, i) => ({ inputs: a, target: outputs[i] }));
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
            style={{ width: 100, height: 150 }}
          />
        </label>
        <label>
          Salidas esperadas:
          <textarea
            name="outputs"
            value={this.state.outputs}
            onChange={this.handleChange}
            style={{ width: 50, height: 150 }}
          />
        </label>
        <label>
          Salidas reales:
          <textarea
            name="actualOutputs"
            value={this.state.actualOutputs}
            // onChange={this.handleChange}
            style={{ width: 50, height: 150 }}
          />
        </label>
        <br />
        <button onClick={this.calculateWeights}>Calcular</button>
      </form>
    );
  }
}

export default ParametersForm;

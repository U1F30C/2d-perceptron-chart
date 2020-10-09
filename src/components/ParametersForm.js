import React, { Component } from "react";
import { Perceptron } from "./../utils/Perceptron";
import { minBy, maxBy } from "lodash";

class ParametersForm extends Component {
  state = { rules: "0,0,0\n0,1,1\n1,0,1\n1,1,1" };
  handleChange = this.handleChange.bind(this);
  calculateWeights = this.calculateWeights.bind(this);

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  separateSet(rules, label) {
    return rules
      .split("\n")
      .map((rule) => rule.split(","))
      .filter((rule) => rule.slice(-1) == label)
      .map((rule) => {
        let [x, y] = rule.map((v) => +v);
        return { x, y };
      });
  }

  async calculateWeights(e) {
    e.preventDefault();
    let { rules } = this.state;
    let trainingRules = rules
      .split("\n")
      .map((rule) => rule.split(",").map((e) => +e));
    let perceptron = Perceptron([Math.random(), Math.random()], Math.random());
    while (!perceptron.converges(trainingRules)) {
      trainingRules.forEach((rule) => {
        perceptron.train(rule);
      });
      await this.sleep(0.1);
      this.props.onSubmit(perceptron.error(trainingRules));
    }
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
          Reglas:
          <textarea
            name="rules"
            value={this.state.rules}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <button onClick={this.calculateWeights}>Calcular</button>
      </form>
    );
  }
}

export default ParametersForm;

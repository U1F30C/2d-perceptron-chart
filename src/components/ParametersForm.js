import React, { Component } from "react";
import { Perceptron, converges } from "./../utils/Perceptron";

class ParametersForm extends Component {
  state = { weights: "1,1", bias: "1", rules: "0,0,0\n0,1,1\n1,0,1\n1,1,1" };
  handleChange = this.handleChange.bind(this);
  calculateWeights = this.calculateWeights.bind(this);

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, () => {
      let result = {};
      let { rules, bias, weights } = this.state;
      bias = +bias;
      let [w1, w2] = weights.split(",").map((v) => +v);
      result.positive = this.separateSet(rules, "1");
      result.negative = this.separateSet(rules, "0");

      result.line = this.generateLine(w1, w2, bias);

      this.props.onSubmit(result);
    });
  }

  generateLine(w1, w2, bias) {
    // y = b/w2 - w1x1/w2
    let leftLimit = -1,
      rightLimit = 2;

    let p1 = { x: leftLimit, y: bias / w2 - (w1 * leftLimit) / w2 };
    let p2 = { x: rightLimit, y: bias / w2 - (w1 * rightLimit) / w2 };
    return [p1, p2];
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

    let result = {};
    let { rules } = this.state;
    result.positive = this.separateSet(rules, "1");
    result.negative = this.separateSet(rules, "0");

    let step = 0.01;
    let bias = Math.random();
    let w = [Math.random(), Math.random()];
    let training = rules
      .split("\n")
      .map((rule) => rule.split(",").map((e) => +e));
    let perceptron = Perceptron(w, +bias);
    while (!converges(training, perceptron)) {
      perceptron = Perceptron(w, +bias);

      training.forEach((rule) => {
        let target = rule.slice(-1)[0];
        let actual = perceptron(rule.slice(0, -1));
        if (actual != target) {
          let error = target - actual;
          let diff = step * error;
          bias -= diff;
          for (let i = 0; i < w.length; i++) {
            w[i] = w[i] + diff * rule[i];
          }
        }
      });
      await this.sleep(0.1);
      result.line = this.generateLine(w[0], w[1], bias);
      this.props.onSubmit(result);
      this.setState({ weights: w.join(","), bias: bias.toString() });
    }

    result.line = this.generateLine(w[0], w[1], bias);
    this.props.onSubmit(result);
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
          Pesos:
          <input
            type="text"
            name="weights"
            value={this.state.weights}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Umbral:
          <input
            type="text"
            name="bias"
            value={this.state.bias}
            onChange={this.handleChange}
          />
        </label>
        <br />
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

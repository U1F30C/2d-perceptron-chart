import React, { Component } from "react";

class ParametersForm extends Component {
  state = { weights: "1,1", bias: "1", rules: "0,0,0;0,1,1;1,0,1;1,1,1" };
  handleChange = this.handleChange.bind(this);

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, () => {
      let result = {};
      let { rules, bias, weights } = this.state;
      bias = +bias;
      let [w1, w2] = weights.split(",").map((v) => +v);
      let x1 = -1,
        x2 = 2;
      result.positive = rules
        .split(";")
        .map((rule) => rule.split(","))
        .filter((rule) => rule.slice(-1) == "1")
        .map((rule) => {
          let [x, y] = rule.map((v) => +v);
          return { x, y };
        });
      result.negative = rules
        .split(";")
        .map((rule) => rule.split(","))
        .filter((rule) => rule.slice(-1) == "0")
        .map((rule) => {
          let [x, y] = rule.map((v) => +v);
          return { x, y };
        });

      // y = b/w2 - w1x1/w2

      let p1 = { x: x1, y: bias / w2 - (w1 * x1) / w2 };
      let p2 = { x: x2, y: bias / w2 - (w1 * x2) / w2 };

      result.line = [p1, p2];

      this.props.onSubmit(result);
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
          <input
            type="text"
            name="rules"
            value={this.state.rules}
            onChange={this.handleChange}
          />
        </label>
        <br />
      </form>
    );
  }
}

export default ParametersForm;

import { dot } from "./math";
import { times, random } from "lodash";

class Neuron {
  constructor(inputQuantity = 1, activate) {
    this.weights = times(inputQuantity + 1, () => random(-1, 1, true));
    this.activate = activate;
  }
  inputs = null;
  output = null;

  _predict(inputs) {
    return dot(this.weights, inputs);
  }

  predict(inputs) {
    inputs = [...inputs, 1];
    while (inputs.length > this.weights.length)
      this.weights.push(random(-1, 1, true));
    this.inputs = inputs;
    this.output = this.activate(this._predict(inputs));

    return this.output;
  }

  adjust(amount) {
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += amount * this.inputs[i];
    }
  }
}

export { Neuron };

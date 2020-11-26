import { dot, activations } from "./math";

function Neuron(inputQuantity = 1, type = "linear") {
  let [weights, bias] = [
    Array.from(Array(inputQuantity)).map((_) => Math.random()),
    Math.random(),
  ];

  let neuron = {
    weights,
    bias,
    predict,
    adjust,
    inputs: null,
    output: null,
    deltaFunction: activations[type].delta,
  };

  function _predict(inputs) {
    return dot(neuron.weights, inputs) - neuron.bias;
  }

  function predict(inputs) {
    while (inputs.length > neuron.weights.length)
      neuron.weights.push(Math.random());
    neuron.inputs = inputs;
    neuron.output = activations[type].function(_predict(inputs));

    return neuron.output;
  }

  function adjust(delta) {
    neuron.bias -= delta;
    for (let i = 0; i < neuron.weights.length; i++) {
      neuron.weights[i] += delta * neuron.inputs[i];
    }
  }

  return neuron;
}

export { Neuron };

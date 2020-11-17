import { Neuron } from "./../utils/Neuron";

function Layer(descriptor) {
  let layer = {
    neurons: Array.from(Array(descriptor)).map(Neuron),
    error: Infinity,
    predict,
  };
  function predict(inputs) {
    layer.output = layer.neurons.map((neuron) => neuron.predict(inputs));
    return layer.output;
  }
  return layer;
}

export { Layer };

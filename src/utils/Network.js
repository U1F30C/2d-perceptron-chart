import { Layer } from "./Layer";
import { delta, mse } from "./math";
import { sum } from "lodash";

function Network(layerDescriptors, learningRate = 0.5) {
  let layers = [];
  let trainingData = [];
  layers = layerDescriptors.map(Layer);

  const network = {
    layers,
    forward,
    error: Infinity,
    trainingData,
    train,
    converges,
  };


  function forward(inputs) {
    const layerOutputs = [layers[0].predict(inputs)];
    layers.slice(1).forEach((layer) => {
      layerOutputs.push(layer.predict(layerOutputs.slice(-1)[0]));
    });
    return layerOutputs.slice(-1)[0];
  }

  function converges(acceptableError = 0.05) {
    return network.error < acceptableError;
  }

  function train() {
    const outLayer = network.layers.slice(-1)[0];
    network.trainingData.forEach(([inputs, outputs]) => {
      network.forward(inputs);
      outLayer.neurons.forEach((neuron, i) => {
        neuron.error = outputs[i] - neuron.output;
        neuron.delta = neuron.deltaFunction(neuron.output, neuron.error);
      });

      for (let l = network.layers.length - 2; l >= 0; l--) {
        network.layers[l].neurons.forEach((neuron, i) => {
          neuron.error = sum(
            network.layers[l + 1].neurons.map(function (n) {
              return n.weights[i] * n.delta;
            })
          );

          neuron.delta =  neuron.deltaFunction(neuron.output, neuron.error);

          network.layers[l + 1].neurons.forEach((nextNeur) =>
            nextNeur.adjust(nextNeur.inputs, learningRate * nextNeur.delta)
          );
        });
      }
    });
    network.error = mse(outLayer.neurons.map((n) => n.error));
  }

  return network;
}

export { Network };

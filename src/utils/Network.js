import { Layer } from "./Layer";

function Network(inputs, outputs, layerDescriptors) {
  let layers = [];
  layers = layerDescriptors.map(Layer);

  let layerOutputs = [];

  function forward(inputs) {
    layerOutputs = [layers[0].predict(inputs)];
    layers.slice(1).forEach((layer) => {
      layerOutputs.push(layer.predict(layerOutputs.slice(-1)[0]));
    });
    return layerOutputs.slice(-1)[0];
  }
  const network = { layers, forward };
  return network;
}

export { Network };

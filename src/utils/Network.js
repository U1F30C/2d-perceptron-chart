import { Layer } from "./Layer";

function Network(inputs, outputs, layerDescriptors) {
  const layers = layerDescriptors.map(Layer);
  const network = { layers };
  return network;
}

export { Network };

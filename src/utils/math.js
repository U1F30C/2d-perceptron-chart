import { sumBy } from "lodash";

function dot(v1, v2) {
  let result = 0;
  for (let i = 0; i < v1.length; i++) {
    result += v1[i] * v2[i];
  }
  return result;
}

function stepActivation(output) {
  return output > 0 ? 1 : 0;
}

function sigmoidActivation(output) {
  const ex = Math.exp(output);
  return ex / (ex + 1);
}

function delta(output, error) {
  return output * (1 - output) * error;
}

function generateLine(neuron) {
  const [w1, w2] = neuron.weights;
  const bias = neuron.bias;
  // y = b/w2 - w1x1/w2
  let leftLimit = -2,
    rightLimit = 3;

  let p1 = { x: leftLimit, y: bias / w2 - (w1 * leftLimit) / w2 };
  let p2 = { x: rightLimit, y: bias / w2 - (w1 * rightLimit) / w2 };
  return [p1, p2];
}

function mse(arr) {
  return sumBy(arr, (x) => Math.pow(x, 2)) / arr.length;
}

export { dot, sigmoidActivation, delta, mse };

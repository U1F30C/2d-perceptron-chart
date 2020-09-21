function Neuron(weights, bias) {
  return function (values) {
    let result = 0;
    for (let i = 0; i < weights.length; i++) {
      result += weights[i] * values[i];
    }
    return result - bias >= 0 ? 1 : 0;
  };
}

let orPerceptron = Neuron([1, 1], 1);

console.log(orPerceptron([0, 0])); // 0
console.log(orPerceptron([0, 1])); // 1
console.log(orPerceptron([1, 0])); // 1
console.log(orPerceptron([1, 1])); // 1

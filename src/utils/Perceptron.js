function dot(v1, v2) {
  let result = 0;
  for (let i = 0; i < v1.length; i++) {
    result += v1[i] * v2[i];
  }
  return result;
}

function Perceptron(weights, bias, step = 0.01) {
  let perceptron = { weights, bias };
  perceptron.predict = function (inputs) {
    if (inputs.length !== perceptron.weights.length) return null;
    return dot(perceptron.weights, inputs) - perceptron.bias > 0 ? 1 : 0;
  };
  perceptron.converges = function (rules) {
    for (const rule of rules) {
      let desired = rule.slice(-1)[0];

      if (perceptron.predict(rule.slice(0, -1)) != desired) {
        return false;
      }
    }
    return true;
  };
  perceptron.train = function (rule) {
    let target = rule.slice(-1)[0];
    let actual = perceptron.predict(rule.slice(0, -1));
    if (actual != target) {
      let error = target - actual;
      let diff = step * error;
      perceptron.bias -= diff;
      for (let i = 0; i < perceptron.weights.length; i++) {
        perceptron.weights[i] = perceptron.weights[i] + diff * rule[i];
      }
    }
  };
  return perceptron;
}

export { Perceptron };

// let orPerceptron = Perceptron([1, 1], 1);

// console.log(orPerceptron([0, 0])); // 0
// console.log(orPerceptron([0, 1])); // 1
// console.log(orPerceptron([1, 0])); // 1
// console.log(orPerceptron([1, 1])); // 1

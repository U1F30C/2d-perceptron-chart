function dot(v1, v2) {
  let result = 0;
  for (let i = 0; i < v1.length; i++) {
    result += v1[i] * v2[i];
  }
  return result;
}

function Perceptron(weights, bias) {
  return function (values) {
    return dot(weights, values) - bias > 0 ? 1 : 0;
  };
}

function converges(sets, perceptron) {
  for (const set of sets) {
    let desired = set.slice(-1)[0];

    if (perceptron(set.slice(0, -1)) != desired) {
      return false;
    }
  }
  return true;
}

export { converges, Perceptron, dot };

// let orPerceptron = Perceptron([1, 1], 1);

// console.log(orPerceptron([0, 0])); // 0
// console.log(orPerceptron([0, 1])); // 1
// console.log(orPerceptron([1, 0])); // 1
// console.log(orPerceptron([1, 1])); // 1

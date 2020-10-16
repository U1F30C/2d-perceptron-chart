function dot(v1, v2) {
  let result = 0;
  for (let i = 0; i < v1.length; i++) {
    result += v1[i] * v2[i];
  }
  return result;
}

function Perceptron(weights, bias, step = 0.01) {
  let perceptron = { weights, bias, rules: [] };

  function _predict(inputs) {
    return dot(perceptron.weights, inputs) - perceptron.bias;
  }

  perceptron.predict = function (inputs) {
    if (inputs.length !== perceptron.weights.length) return null;
    return _predict(inputs) > 0 ? 1 : 0;
  };

  perceptron.converges = function () {
    for (const rule of perceptron.rules) {
      let desired = rule.target;

      if (perceptron.predict(rule.inputs) != desired) {
        return false;
      }
    }
    return true;
  };

  perceptron.error = function () {
    let accum = 0;
    perceptron.rules.forEach((rule) => {
      let target = rule.target;
      let actual = _predict(rule.inputs);
      accum += Math.pow(target - actual, 2);
    });
    return accum / perceptron.rules.length;
  };

  const train = function (rule) {
    let target = rule.target;
    let actual = perceptron.predict(rule.inputs);
    if (actual != target) {
      let error = target - actual;
      let diff = step * error;
      perceptron.bias -= diff;
      for (let i = 0; i < perceptron.weights.length; i++) {
        perceptron.weights[i] = perceptron.weights[i] + diff * rule.inputs[i];
      }
    }
  };

  perceptron.addRule = function (rule) {
    perceptron.rules.push(rule);
  };

  perceptron.train = function () {
    perceptron.rules.forEach((rule) => {
      train(rule);
    });
  };

  return perceptron;
}

export { Perceptron };

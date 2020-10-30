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

function Neuron(weights, bias, step = 0.01) {
  let neuron = { weights, bias, rules: [] };

  function _predict(inputs) {
    return dot(neuron.weights, inputs) - neuron.bias;
  }

  neuron.predict = function (inputs) {
    if (inputs.length !== neuron.weights.length) return null;
    return stepActivation(_predict(inputs));
  };

  neuron.converges = function () {
    for (const rule of neuron.rules) {
      let desired = rule.target;

      if (neuron.predict(rule.inputs) != desired) {
        return false;
      }
    }
    return true;
  };

  neuron.currentPredictions = function () {
    return neuron.rules.map((rule) => neuron.predict(rule.inputs));
  };

  neuron.error = function () {
    let accum = 0;
    neuron.rules.forEach((rule) => {
      let target = rule.target;
      let actual = neuron.predict(rule.inputs);
      accum += Math.pow(target - actual, 2);
    });
    return accum / neuron.rules.length;
  };

  const train = function (rule) {
    let target = rule.target;
    let actual = neuron.predict(rule.inputs);
    if (actual != target) {
      let error = target - actual;
      let diff = step * error;
      neuron.bias -= diff;
      for (let i = 0; i < neuron.weights.length; i++) {
        neuron.weights[i] += diff * rule.inputs[i];
      }
    }
  };

  neuron.addRule = function (rule) {
    neuron.rules.push(rule);
  };

  neuron.train = function () {
    neuron.rules.forEach((rule) => {
      train(rule);
    });
  };

  return neuron;
}

export { Neuron };

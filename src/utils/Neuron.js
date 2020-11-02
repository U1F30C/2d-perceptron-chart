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

function Neuron(inputQuantity = 2, step = 0.5) {
  let [weights, bias] = [
    Array.from(Array(inputQuantity)).map((_) => Math.random()),
    Math.random(),
  ];

  let neuron = {
    weights,
    bias,
    predict,
    training: {
      rules: [],
      addRule,
      train,
      error,
      currentPredictions,
      converges,
    },
  };

  function _predict(inputs) {
    return dot(neuron.weights, inputs) - neuron.bias;
  }

  function predict(inputs) {
    while (inputs.length > neuron.weights.length)
      neuron.weights.push(Math.random());

    return sigmoidActivation(_predict(inputs));
  }

  function converges() {
    for (const rule of neuron.training.rules) {
      let desired = rule.target;

      if (neuron.predict(rule.inputs) != desired) {
        return false;
      }
    }
    return true;
  }

  function currentPredictions() {
    return neuron.training.rules.map((rule) => neuron.predict(rule.inputs));
  }

  function error() {
    let accum = 0;
    neuron.training.rules.forEach((rule) => {
      let target = rule.target;
      let actual = neuron.predict(rule.inputs);
      accum += Math.pow(target - actual, 2);
    });
    return accum / neuron.training.rules.length;
  }

  function addRule(rule) {
    neuron.training.rules.push(rule);
  }

  function train() {
    neuron.training.rules.forEach((rule) => {
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
    });
  }

  return neuron;
}

export { Neuron };

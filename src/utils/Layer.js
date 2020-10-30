import { Neuron } from "./../utils/Neuron";

function getNeuron(length) {
  return Neuron(
    Array.from(Array(length)).map((_) => Math.random()),
    Math.random()
  );
}

function Layer(inputs, outputs) {
  const neurons = outputs.map((outputColumn) => {
    let neuron = getNeuron(inputs[0]?.length);
    inputs.forEach((inputRow, i) =>
      neuron.addRule({ inputs: inputRow, target: outputColumn[i] })
    );
    return neuron;
  });
  let layer = { neurons, error: Infinity };

  layer.categorize = function (input) {
    return neurons.reduce((acc, neuron) => acc + neuron.predict(input), "");
  };

  layer.converges = function (error = 0.0001) {
    return layer.error < error
  };

  layer.train = function () {
    const actualOutputs = [];
    let _error = 0;
    neurons.forEach((neuron) => {
      neuron.train();
      _error += Math.pow(neuron.error(), 2);
      actualOutputs.push(neuron.currentPredictions());
    });
    layer.error = _error / neurons.length;
    return actualOutputs;
  };
  return layer;
}

export { Layer };

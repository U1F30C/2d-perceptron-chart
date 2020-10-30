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
  let layer = { neurons, error: 0 };

  layer.categorize = function (input) {
    return neurons.reduce((acc, neuron) => acc + neuron.predict(input), "");
  };

  layer.converges = function () {
    return neurons.every((neuron) => neuron.converges());
  };

  layer.train = function () {
    const actualOutputs = [];
    layer.error = 0;
    neurons.forEach((neuron) => {
      neuron.train();
      layer.error += neuron.error();
      actualOutputs.push(neuron.currentPredictions());
    });
    return actualOutputs;
  };
  return layer;
}

export { Layer };

import { Neuron } from "./../utils/Neuron";

function Layer(descriptor) {
  let layer = {
    neurons: Array.from(Array(descriptor)).map(Neuron),
    error: Infinity,
  };

  layer.addTrainingData = function (inputs, outputs) {
    layer.neurons = outputs.map((outputColumn) => {
      let neuron = Neuron();
      inputs.forEach((inputRow, i) =>
        neuron.training.addRule({ inputs: inputRow, target: outputColumn[i] })
      );
      return neuron;
    });
  };

  layer.categorize = function (input) {
    return layer.neurons.reduce(
      (acc, neuron) => acc + Math.round(neuron.predict(input)),
      ""
    );
  };

  layer.converges = function (acceptableError = 0.0001) {
    return layer.error < acceptableError;
  };

  layer.train = function () {
    const actualOutputs = [];
    let _error = 0;
    layer.neurons.forEach((neuron) => {
      neuron.training.train();
      _error += Math.pow(neuron.training.error(), 2);
      actualOutputs.push(neuron.training.currentPredictions());
    });
    layer.error = _error / layer.neurons.length;
    return actualOutputs;
  };

  layer.predict = function (inputs) {
    return layer.neurons.map((neuron) => neuron.predict(inputs));
  };
  return layer;
}

export { Layer };

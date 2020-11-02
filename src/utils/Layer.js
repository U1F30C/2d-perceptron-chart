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
        neuron.addRule({ inputs: inputRow, target: outputColumn[i] })
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

  layer.converges = function (error = 0.0001) {
    return layer.error < error;
  };

  layer.train = function () {
    const actualOutputs = [];
    let _error = 0;
    layer.neurons.forEach((neuron) => {
      neuron.train();
      _error += Math.pow(neuron.error(), 2);
      actualOutputs.push(neuron.currentPredictions());
    });
    layer.error = _error / layer.neurons.length;
    return actualOutputs;
  };
  return layer;
}

export { Layer };

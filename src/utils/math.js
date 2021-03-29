function dot(v1, v2) {
  let result = 0;
  for (let i = 0; i < v1.length; i++) {
    result += v1[i] * v2[i];
  }
  return result;
}

function generateLine(w1, w2, bias, leftLimit = -1, rightLimit = 2) {
  // y = b/w2 - w1x1/w2

  let p1 = { x: leftLimit, y: bias / w2 - (w1 * leftLimit) / w2 };
  let p2 = { x: rightLimit, y: bias / w2 - (w1 * rightLimit) / w2 };
  return [p1, p2];
}

function normalize(x, min, max) {
  return (x - min) / (max - min);
}

function denormalize(x, min, max) {
  return x * (max - min) + min;
}

export { generateLine, dot, normalize, denormalize };

function dot(v1, v2) {
  let result = 0;
  for (let i = 0; i < v1.length; i++) {
    result += v1[i] * v2[i];
  }
  return result;
}

function generateLine(w1, w2, bias) {
  // y = b/w2 - w1x1/w2
  let leftLimit = -1,
    rightLimit = 2;

  let p1 = { x: leftLimit, y: bias / w2 - (w1 * leftLimit) / w2 };
  let p2 = { x: rightLimit, y: bias / w2 - (w1 * rightLimit) / w2 };
  return [p1, p2];
}

function normalize(data) {
  const min = min(data);
  const max = max(data);
  return data.map((x) => {
    return (x - min) / max;
  });
}

export { generateLine, dot };

class Probe {
  constructor(config) {
    const { matrixSize } = config || {};
    this.x = 0;
    this.y = 0;
    this.matrixSize = matrixSize || [5, 5];
  }
}

exports.Probe = Probe;

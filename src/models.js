class Probe {
  constructor(config) {
    const { matrixSize } = config || {};
    this.direction = Probe.RIGTH;
    this.x = 0;
    this.y = 0;
    this.matrixSize = matrixSize || [5, 5];
  }
}

Probe.LEFT = 'E';
Probe.RIGTH = 'D';
Probe.UP = 'C';
Probe.DOWN = 'B';

exports.Probe = Probe;

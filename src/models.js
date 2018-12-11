class Probe {
  constructor(config) {
    const { matrixSize } = config || {};
    this.direction = Probe.RIGTH;
    this.x = 0;
    this.y = 0;
    this.matrixSize = matrixSize || [5, 5];
  }

  static rotate(direction, value) {
    return ({
      [Probe.LEFT]: {
        [Probe.TURN_LEFT]: Probe.DOWN,
        [Probe.TURN_RIGTH]: Probe.UP,
      },
      [Probe.RIGTH]: {
        [Probe.TURN_LEFT]: Probe.UP,
        [Probe.TURN_RIGTH]: Probe.DOWN,
      },
      [Probe.UP]: {
        [Probe.TURN_LEFT]: Probe.LEFT,
        [Probe.TURN_RIGTH]: Probe.RIGTH,
      },
      [Probe.DOWN]: {
        [Probe.TURN_LEFT]: Probe.RIGTH,
        [Probe.TURN_RIGTH]: Probe.LEFT,
      },
    })[direction][value];
  }
}

Probe.LEFT = 'E';
Probe.RIGTH = 'D';
Probe.UP = 'C';
Probe.DOWN = 'B';
Probe.TURN_LEFT = 'left';
Probe.TURN_RIGTH = 'rigth';

exports.Probe = Probe;

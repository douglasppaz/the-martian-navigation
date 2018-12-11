const { InvalidCommand, LeftTheMatrix } = require('./errors');


class Probe {
  constructor(config) {
    const { matrixSize } = config || {};
    this.direction = Probe.RIGHT;
    this.x = 0;
    this.y = 0;
    this.matrixSize = matrixSize || [5, 5];
  }

  static rotate(direction, value) {
    return ({
      [Probe.LEFT]: {
        [Probe.TURN_LEFT]: Probe.DOWN,
        [Probe.TURN_RIGHT]: Probe.UP,
      },
      [Probe.RIGHT]: {
        [Probe.TURN_LEFT]: Probe.UP,
        [Probe.TURN_RIGHT]: Probe.DOWN,
      },
      [Probe.UP]: {
        [Probe.TURN_LEFT]: Probe.LEFT,
        [Probe.TURN_RIGHT]: Probe.RIGHT,
      },
      [Probe.DOWN]: {
        [Probe.TURN_LEFT]: Probe.RIGHT,
        [Probe.TURN_RIGHT]: Probe.LEFT,
      },
    })[direction][value];
  }

  static move(x, y, direction) {
    const vector = ({
      [Probe.LEFT]: [-1, 0],
      [Probe.RIGHT]: [1, 0],
      [Probe.UP]: [0, 1],
      [Probe.DOWN]: [0, -1],
    })[direction];
    return [
      (x + vector[0]),
      (y + vector[1]),
    ];
  }

  calculate(command, x, y, direction) {
    switch (command) {
      case Probe.COMMAND_TURN_LEFT:
        return [x, y, Probe.rotate(direction, Probe.TURN_LEFT)];
      case Probe.COMMAND_TURN_RIGHT:
        return [x, y, Probe.rotate(direction, Probe.TURN_RIGHT)];
      case Probe.COMMAND_MOVE: {
        const [outX, outY] = Probe.move(x, y, direction);
        if (
          outX >= this.matrixSize[0]
          || outX < 0
          || outY >= this.matrixSize[1]
          || outY < 0
        ) {
          throw new LeftTheMatrix();
        }
        return [outX, outY, direction];
      }
      default:
        throw new InvalidCommand();
    }
  }

  exec(commands) {
    const [x, y, direction] = commands.reduce(
      (current, command) => {
        const [currentX, currentY, currentDirection] = current;
        return this.calculate(
          command,
          currentX,
          currentY,
          currentDirection,
        );
      },
      [this.x, this.y, this.direction],
    );
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
}

Probe.LEFT = 'E';
Probe.RIGHT = 'D';
Probe.UP = 'C';
Probe.DOWN = 'B';
Probe.TURN_LEFT = 'left';
Probe.TURN_RIGHT = 'right';
Probe.COMMAND_TURN_LEFT = 'GE';
Probe.COMMAND_TURN_RIGHT = 'GD';
Probe.COMMAND_MOVE = 'R';

exports.Probe = Probe;

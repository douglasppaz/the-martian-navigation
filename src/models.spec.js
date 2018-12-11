/* eslint-env mocha */
const { expect } = require('chai');
const { Probe } = require('./models');
const { LeftTheMatrix, InvalidCommand } = require('./errors');

describe('class Probe', () => {
  describe('simple instance', () => {
    let instance;

    beforeEach(() => {
      instance = new Probe();
    });

    it('initial direction is right', () => {
      expect(instance.direction).to.equal(Probe.RIGHT);
    });

    it('initial position is (0, 0)', () => {
      expect(instance.x).to.equal(0);
      expect(instance.y).to.equal(0);
    });

    it('default matrix size is 5x5', () => {
      expect(instance.matrixSize[0]).to.equal(5);
      expect(instance.matrixSize[1]).to.equal(5);
    });

    describe('calculate()', () => {
      describe('command turn left', () => {
        let x;
        let y;
        let direction;

        beforeEach(() => {
          [x, y, direction] = instance.calculate(
            Probe.COMMAND_TURN_LEFT,
            instance.x,
            instance.y,
            instance.direction,
          );
        });

        it('direction is up', () => {
          expect(direction).to.equal(Probe.UP);
        });

        it('x is instance.x and y is instance.y', () => {
          expect(x).to.equal(instance.x);
          expect(y).to.equal(instance.y);
        });

        describe('command turn left again', () => {
          beforeEach(() => {
            [x, y, direction] = instance.calculate(
              Probe.COMMAND_TURN_LEFT,
              instance.x,
              instance.y,
              direction,
            );
          });

          it('direction is left', () => {
            expect(direction).to.equal(Probe.LEFT);
          });
        });
      });

      describe('command turn right', () => {
        let x;
        let y;
        let direction;

        beforeEach(() => {
          [x, y, direction] = instance.calculate(
            Probe.COMMAND_TURN_RIGHT,
            instance.x,
            instance.y,
            instance.direction,
          );
        });

        it('direction is down', () => {
          expect(direction).to.equal(Probe.DOWN);
        });

        it('x is instance.x and y is instance.y', () => {
          expect(x).to.equal(instance.x);
          expect(y).to.equal(instance.y);
        });
      });

      describe('command move', () => {
        let x;
        let y;
        let direction;

        beforeEach(() => {
          [x, y, direction] = instance.calculate(
            Probe.COMMAND_MOVE,
            instance.x,
            instance.y,
            instance.direction,
          );
        });

        it('direction is instance.direction', () => {
          expect(direction).to.equal(instance.direction);
        });

        it('x is instance.x + 1 and y is instance.y', () => {
          expect(x).to.equal(instance.x + 1);
          expect(y).to.equal(instance.y);
        });
      });

      describe('instance.x = 4 and instance.y = 0', () => {
        beforeEach(() => {
          instance.x = 4;
          instance.y = 0;
        });

        describe('command move', () => {
          let fn;

          beforeEach(() => {
            fn = () => instance.calculate(
              Probe.COMMAND_MOVE,
              instance.x,
              instance.y,
              instance.direction,
            );
          });

          it('throws LeftTheMatrix', () => {
            expect(fn).to.throws(LeftTheMatrix);
          });
        });
      });

      describe('invalid command', () => {
        let fn;

        beforeEach(() => {
          fn = () => instance.calculate(
            'invalid',
            instance.x,
            instance.y,
            instance.direction,
          );
        });

        it('throws InvalidCommand', () => {
          expect(fn).to.throws(InvalidCommand);
        });
      });
    });

    describe('exec()', () => {
      describe('commands turn left, move, move, move, turn right, move and move', () => {
        beforeEach(() => {
          instance.exec([
            Probe.COMMAND_TURN_LEFT,
            Probe.COMMAND_MOVE,
            Probe.COMMAND_MOVE,
            Probe.COMMAND_MOVE,
            Probe.COMMAND_TURN_RIGHT,
            Probe.COMMAND_MOVE,
            Probe.COMMAND_MOVE,
          ]);
        });

        it('instance.x is 2', () => {
          expect(instance.x).to.equal(2);
        });

        it('instance.y is 3', () => {
          expect(instance.x).to.equal(2);
        });
      });

      describe('commands turn right, move and move', () => {
        let fn;

        beforeEach(() => {
          fn = () => instance.exec([
            Probe.COMMAND_TURN_RIGHT,
            Probe.COMMAND_MOVE,
            Probe.COMMAND_MOVE,
          ]);
        });

        it('throws LeftTheMatrix', () => {
          expect(fn).throws(LeftTheMatrix);
        });
      });
    });
  });

  describe('instance with matrix size 4x3', () => {
    let instance;

    beforeEach(() => {
      instance = new Probe({
        matrixSize: [4, 3],
      });
    });

    it('matrix size is 4x3', () => {
      expect(instance.matrixSize[0]).to.equal(4);
      expect(instance.matrixSize[1]).to.equal(3);
    });
  });

  describe('static rotate()', () => {
    describe('direction is left', () => {
      let fn;

      beforeEach(() => {
        fn = value => Probe.rotate(Probe.LEFT, value);
      });

      describe('turn left', () => {
        it('returns down', () => {
          expect(fn(Probe.TURN_LEFT)).to.equal(Probe.DOWN);
        });
      });

      describe('turn right', () => {
        it('returns up', () => {
          expect(fn(Probe.TURN_RIGHT)).to.equal(Probe.UP);
        });
      });
    });

    describe('direction is right', () => {
      let fn;

      beforeEach(() => {
        fn = value => Probe.rotate(Probe.RIGHT, value);
      });

      describe('turn left', () => {
        it('returns up', () => {
          expect(fn(Probe.TURN_LEFT)).to.equal(Probe.UP);
        });
      });

      describe('turn right', () => {
        it('returns down', () => {
          expect(fn(Probe.TURN_RIGHT)).to.equal(Probe.DOWN);
        });
      });
    });

    describe('direction is up', () => {
      let fn;

      beforeEach(() => {
        fn = value => Probe.rotate(Probe.UP, value);
      });

      describe('turn left', () => {
        it('returns left', () => {
          expect(fn(Probe.TURN_LEFT)).to.equal(Probe.LEFT);
        });
      });

      describe('turn right', () => {
        it('returns right', () => {
          expect(fn(Probe.TURN_RIGHT)).to.equal(Probe.RIGHT);
        });
      });
    });

    describe('direction is down', () => {
      let fn;

      beforeEach(() => {
        fn = value => Probe.rotate(Probe.DOWN, value);
      });

      describe('turn left', () => {
        it('returns right', () => {
          expect(fn(Probe.TURN_LEFT)).to.equal(Probe.RIGHT);
        });
      });

      describe('turn right', () => {
        it('returns left', () => {
          expect(fn(Probe.TURN_RIGHT)).to.equal(Probe.LEFT);
        });
      });
    });
  });

  describe('static move()', () => {
    describe('x is 1 and y is 1', () => {
      let fn;

      beforeEach(() => {
        fn = direction => Probe.move(1, 1, direction);
      });

      describe('direction left', () => {
        it('returns (0, 1)', () => {
          expect(fn(Probe.LEFT)).to.deep.equal([0, 1]);
        });
      });

      describe('direction right', () => {
        it('returns (2, 1)', () => {
          expect(fn(Probe.RIGHT)).to.deep.equal([2, 1]);
        });
      });

      describe('direction up', () => {
        it('returns (1, 2)', () => {
          expect(fn(Probe.UP)).to.deep.equal([1, 2]);
        });
      });

      describe('direction down', () => {
        it('returns (1, 0)', () => {
          expect(fn(Probe.DOWN)).to.deep.equal([1, 0]);
        });
      });
    });
  });
});

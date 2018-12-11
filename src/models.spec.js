/* eslint-env mocha */
const { expect } = require('chai');
const { Probe } = require('./models');

describe('class Probe', () => {
  describe('simple instance', () => {
    let instance;

    beforeEach(() => {
      instance = new Probe();
    });

    it('initial position is (0, 0)', () => {
      expect(instance.x).to.equal(0);
      expect(instance.y).to.equal(0);
    });

    it('default matrix size is 5x5', () => {
      expect(instance.matrixSize[0]).to.equal(5);
      expect(instance.matrixSize[1]).to.equal(5);
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
});

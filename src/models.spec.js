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
  });
});

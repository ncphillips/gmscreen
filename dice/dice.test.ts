import { D20 } from './dice';

describe('D20', () => {
  describe('a roll', () => {
    it('is greater than or equal to 1', () => {
      expect(D20.roll()).toBeGreaterThanOrEqual(1);
    });

    it('is less than or equal to 20', () => {
      expect(D20.roll()).toBeLessThanOrEqual(20);
    });
  });
});

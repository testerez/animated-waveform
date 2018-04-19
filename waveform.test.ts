import { mixColors } from './waveform';

describe('mixColors', () => {
  it('mixes 50%', () => {
    expect(mixColors([0, 0, 0], [100, 100, 100], 0.5)).toEqual([50, 50, 50]);
    expect(mixColors([100, 100, 100], [0, 0, 0], 0.5)).toEqual([50, 50, 50]);
  });
  it('mixes 10%', () => {
    expect(mixColors([0, 0, 0], [100, 100, 100], 0.1)).toEqual([10, 10, 10]);
    expect(mixColors([100, 100, 100], [0, 0, 0], 0.1)).toEqual([90, 90, 90]);
  });
});

import { mixColors, resample } from './waveform';

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

describe('resample', () => {
  it('downsample', () => {
    expect(resample([1, 2, 3, 4], 2)).toEqual([2, 4]);
  });
  it('downsample negative', () => {
    expect(resample([1, -2, -3, -4], 2)).toEqual([-2, -4]);
  });
  it('downsample odd', () => {
    expect(resample([1, 2, 3, 4, 5], 2)).toEqual([3, 5]);
  });
  it('upscale', () => {
    expect(resample([1], 2)).toEqual([1, 1]);
  });
});

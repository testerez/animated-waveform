import { maxBy, clamp, flow } from 'lodash';

const barWidth = 2;
const barSpacing = 2;

type RgbColor = [number, number, number];

const barTopColors: RgbColor[] = [[207, 168, 84], [152, 98, 20]];
const barBottomColors: RgbColor[] = [[116, 91, 47], [92, 60, 19]];

const backgroundColor = '#29211A';
const maxAmplitude = 0.7;

const colorToString = (c: RgbColor) => `rgb(${c.join(',')})`;

export const mixColors = (colorA: RgbColor, colorB: RgbColor, amount: number) =>
  colorA.map((valueA, i) =>
    Math.round(valueA + (colorB[i] - valueA) * amount)
  ) as RgbColor;

export const resample = (data: number[], n: number) => {
  const frameLenght = data.length / n;
  return new Array<number>(n).fill(0).map((_, i) => {
    const start = Math.floor(i * frameLenght);
    // makes sure we always have at least one value
    const end = Math.max(1, start + Math.round(frameLenght));
    // for each frame take the hiest value (positive of negative)
    return maxBy(data.slice(start, end), value => Math.abs(value))!;
  });
};

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

const easingBackOut = (t: number) => {
  var s = 2;
  return --t * t * ((s + 1) * t + s) + 1;
};

export const getBarScaleFactor = (t: number, waveLength = 0.7) => (
  songPosition: number
) => {
  const travelDistance = 1 + waveLength;
  const waveStart = travelDistance * t - waveLength;
  return 1 - clamp((songPosition - waveStart) / waveLength, 0, 1);
};

export const drawWaveform = (
  rawData: number[],
  canvas: HTMLCanvasElement,
  t = 1
) => {
  const canvasWidth = canvas.offsetWidth;
  const canvasHeight = canvas.offsetHeight;
  const ctx = canvas.getContext('2d')!;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  const barsCount = Math.floor(
    (canvasWidth - barSpacing * 2) / (barWidth + barSpacing)
  );

  const getEasedBarScaleFactor = flow(
    getBarScaleFactor(easeInOutCubic(t)),
    easingBackOut
  );

  const drawBar = (i: number, data: number[], colors: RgbColor[]) => {
    const progress = i / barsCount;
    const x = barSpacing + i * (barSpacing + barWidth);
    const rawH = data[i] * maxAmplitude * canvasHeight / 2;
    const h = rawH * getEasedBarScaleFactor(progress);
    const y = canvasHeight / 2;
    ctx.fillStyle = colorToString(mixColors(colors[0], colors[1], progress));
    ctx.fillRect(x, y, barWidth, h);
  };

  const positiveData = resample(rawData.filter(v => v >= 0), barsCount);
  const negativeData = resample(rawData.filter(v => v <= 0), barsCount);
  for (let i = 0; i < barsCount; i++) {
    drawBar(i, positiveData, barBottomColors);
    drawBar(i, negativeData, barTopColors);
  }
};

import { max, clamp, flow } from 'lodash';

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
    const end = Math.max(1, start + Math.round(frameLenght));
    return max(data.slice(start, end))!;
  });
};

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

const easingBackOut = (t: number) => {
  var s = 2;
  return --t * t * ((s + 1) * t + s) + 1;
};

export const getFadeFactor = (t: number, waveLength = 0.7) => (
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
  const barsCount = Math.floor(
    (canvasWidth - barSpacing * 2) / (barWidth + barSpacing)
  );
  const dataTop = resample(rawData.filter(v => v >= 0), barsCount);
  const dataBottom = resample(
    rawData.filter(v => v <= 0).map(v => -v),
    barsCount
  );

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  // var g = ctx.createLinearGradient(0, 0, canvasWidth, 0);
  // g.addColorStop(0, colorToString(barBottomColors[0]));
  // g.addColorStop(1, colorToString(barBottomColors[1]));
  // ctx.fillStyle = g;

  const getEasedFadeFactor = flow(
    getFadeFactor(easeInOutCubic(t)),
    easingBackOut
  );

  const drawBar = (
    position: number,
    data: number[],
    colors: RgbColor[],
    isBottom: boolean
  ) => {
    const x = barSpacing + position * (barSpacing + barWidth);
    const rawH = data[position] * maxAmplitude * canvasHeight / 2;
    const h = rawH * getEasedFadeFactor(position / barsCount);

    const y = canvasHeight / 2 + (isBottom ? 0 : -h);
    ctx.fillStyle = colorToString(
      mixColors(colors[0], colors[1], position / data.length)
    );
    ctx.fillRect(x, y, barWidth, h);
  };

  for (let i = 0; i < barsCount; i++) {
    drawBar(i, dataTop, barTopColors, false);
    drawBar(i, dataBottom, barBottomColors, true);
  }
};

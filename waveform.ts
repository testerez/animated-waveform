const barWidth = 2;
const barSpacing = 2;

type RgbColor = [number, number, number];

const barTopColors: RgbColor[] = [[207, 168, 84], [152, 98, 20]];
const barBottomColors: RgbColor[] = [[116, 91, 47], [92, 60, 19]];

const backgroundColor = '#29211A';
const maxAmplitude = 0.8;

const colorToString = (c: RgbColor) => `rgb(${c.join(',')})`;

export const mixColors = (colorA: RgbColor, colorB: RgbColor, amount: number) =>
  colorA.map((valueA, i) =>
    Math.round(valueA + (colorB[i] - valueA) * amount)
  ) as RgbColor;

export const drawWaveform = (data: number[], canvas: HTMLCanvasElement) => {
  const canvasWidth = canvas.offsetWidth;
  const canvasHeight = canvas.offsetHeight;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  // var g = ctx.createLinearGradient(0, 0, canvasWidth, 0);
  // g.addColorStop(0, colorToString(barBottomColors[0]));
  // g.addColorStop(1, colorToString(barBottomColors[1]));
  // ctx.fillStyle = g;

  data.forEach((value, i) => {
    const h = Math.abs(value * maxAmplitude * canvasHeight / 2);
    const x = barSpacing + Math.floor(i / 2) * (barSpacing + barWidth);
    const y = canvasHeight / 2 + (i % 2 ? -h : 0);
    const colors = i % 2 ? barTopColors : barBottomColors;
    if (i % 2) {
      console.log(
        colorToString(mixColors(colors[0], colors[1], i / data.length))
      );
    }
    ctx.fillStyle = colorToString(
      mixColors(colors[0], colors[1], i / data.length)
    );
    ctx.fillRect(x, y, barWidth, h);
  });
};

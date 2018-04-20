import { drawWaveform } from './waveform';
import waveformData from './waveformData';

// waveformData = [1, -1];

const range = document.getElementById('range') as HTMLInputElement;
range.oninput = () => draw();

const draw = () => {
  drawWaveform(
    waveformData,
    document.getElementById('canvas') as HTMLCanvasElement,
    Number(range.value)
  );
};

window.onload = () => {
  window.onresize = () => draw();
};

draw();

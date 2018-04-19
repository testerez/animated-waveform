import { drawWaveform } from './waveform';
import waveformData from './waveformData';

const draw = () => {
  drawWaveform(waveformData.slice(0, 800), document.getElementById(
    'canvas'
  ) as HTMLCanvasElement);
};

window.onload = () => {
  window.onresize = draw;
};

draw();

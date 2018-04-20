import { drawWaveform } from './waveform';
import waveformData from './waveformData';

// waveformData = [1, -1];

const range = document.getElementById('range') as HTMLInputElement;
const playButton = document.getElementById('play') as HTMLInputElement;
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
range.oninput = () => draw();

const draw = () => {
  drawWaveform(waveformData, canvas, Number(range.value));
};

let runningAnimation: number;
const startAnimation = (duration = 800) => {
  if (runningAnimation) {
    cancelAnimationFrame(runningAnimation);
  }
  let start: number;
  const step = (timestamp: number) => {
    canvas.style.transition = 'transform 400ms ease-in-out';
    canvas.style.transform = '';
    start = start || timestamp;
    var progress = (timestamp - start) / duration;
    range.value = '' + progress;
    draw();
    if (progress < 1) {
      runningAnimation = window.requestAnimationFrame(step);
    }
  };

  canvas.style.transition = '';
  canvas.style.transform = 'scaleY(0)';
  setTimeout(() => (runningAnimation = window.requestAnimationFrame(step)), 0);
};

playButton.onclick = () => startAnimation();

window.onload = () => {
  window.onresize = () => draw();
};

draw();

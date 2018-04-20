import { drawWaveform } from './waveform';
import waveformData from './waveformData';

// waveformData = [1, -1];

const range = document.getElementById('range') as HTMLInputElement;
const playButton = document.getElementById('play') as HTMLInputElement;

range.oninput = () => draw();

const draw = () => {
  drawWaveform(
    waveformData,
    document.getElementById('canvas') as HTMLCanvasElement,
    Number(range.value)
  );
};

let runningAnimation: number;
const startAnimation = (duration = 800) => {
  if (runningAnimation) {
    cancelAnimationFrame(runningAnimation);
  }
  let start: number;
  const step = (timestamp: number) => {
    start = start || timestamp;
    var progress = (timestamp - start) / duration;
    range.value = '' + progress;
    draw();
    if (progress < 1) {
      runningAnimation = window.requestAnimationFrame(step);
    }
  };

  runningAnimation = window.requestAnimationFrame(step);
};

playButton.onclick = () => startAnimation();

window.onload = () => {
  window.onresize = () => draw();
};

draw();

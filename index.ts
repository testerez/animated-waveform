import { drawWaveform } from "./waveform";
import waveformData from "./waveformData";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

drawWaveform(waveformData, ctx);

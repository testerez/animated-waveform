import { drawWaveform } from "./waveform";
import waveformData from "./waveformData";

drawWaveform(waveformData, document.getElementById('canvas') as HTMLCanvasElement);

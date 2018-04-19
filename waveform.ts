const walk = (arr: number[], n: number, fn) => {
  for (var i = 0; i < arr.length; i += n)
      fn(arr.slice(i, i + n));
}

const sum = (arr: number[], divider: number) => (arr.reduce((a, b) => a + b) / divider)

const pasrseData = (waveformData: number[]) => {
const result = [] as number[];
walk(waveformData, waveformData.length / 55, (item) => {
  let highest = [];
  let lowest = [];      
  item.map(e => Math.sign(e) > 0 ? highest.push(e) : lowest.push(e))
   
  result.push({
    high: Math.max(
      ...highest
    ),
    low: Math.max(
      ...lowest
    ),
  });
})
return result;
}

const calcYPos = (value, height) => value * height / 2 * 0.5 + height / 2;


export const drawWaveform = (waveformData: number[], ctx: CanvasRenderingContext2D) => {
  const pasrsedData =  pasrseData(waveformData);

  ctx.fillStyle = '#1b1b1b'
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  pasrsedData.map((bucket, i) => {
    ctx.fillStyle = "#dcad54";
    ctx.fillRect(
      (i / pasrsedData.length * canvas.width) + 5,
      calcYPos(bucket.high, canvas.height), 
      canvas.width / 100 + 10,
      -calcYPos(bucket.low + -0.25, canvas.height),
     )
    ctx.fill();
    ctx.stroke();
  })

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#fff';
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
  ctx.closePath();
}

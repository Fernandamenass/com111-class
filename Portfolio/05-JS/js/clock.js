//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();

  // Draw the edge circle with gradient
  // TODO: (Optional) add a gradient circle
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
  var grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
  grad.addColorStop(0, 'pink');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, 'purple');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius * 0.1;
  ctx.stroke();

  // Center circle
  // TODO: make the central black circle
  // Same as the first circle, just making the radius a little bit smaller
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = "Black";
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";

  //TODO: Make sure you show all the numbers
  for (var num =1; num <= 12; num++){
    ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius) {
  // TODO: Calculate the angles of every hand depending on the time
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  hour = hour % 12;
  //hour
  //var hourAngle = (hour * Math.PI / 6); No me gusto pq se queda en la hora, entonces voy a agregar los minutos para que se vea mas real
  //Dividimos entre 6 y no entre 12 porque lo estamos calculando en radianes
  var hourAngle = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)); 
  drawHand(ctx, hourAngle, radius * 0.5, radius * 0.07);
  //minute
  var minuteAngle = (minute * Math.PI / 30);
  drawHand(ctx, minuteAngle, radius * 0.8, radius * 0.07);
  // second
  var secongAngle = (second * Math.PI / 30)
  drawHand(ctx, secongAngle, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

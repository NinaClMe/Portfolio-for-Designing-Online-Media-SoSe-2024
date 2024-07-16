const canvas = document.getElementById('kaleidoscopeCanvas');
const ctx = canvas.getContext('2d');

let shapes = [];
let backgroundColor = '#ffffff';
let mirrorType = 0;

// Function to add a shape
function addShape(type) {
  const size = Math.random() * 50 + 20;
  const x = Math.random() * (canvas.width / 2 - size);
  const y = Math.random() * (canvas.height / 2 - size);
  const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const rotation = Math.random() * 2 * Math.PI;

  shapes.push({ type, x, y, size, color, rotation });
  drawShapes();
  changeBackgroundGradient();
}

// Function to draw all shapes
function drawShapes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  shapes.forEach(shape => {
    ctx.save();
    ctx.translate(shape.x + shape.size / 2, shape.y + shape.size / 2);
    ctx.rotate(shape.rotation);
    ctx.fillStyle = shape.color;
    ctx.strokeStyle = shape.color;
    if (shape.type === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape.type === 'square') {
      ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
    } else if (shape.type === 'triangle') {
      ctx.beginPath();
      ctx.moveTo(0, -shape.size / 2);
      ctx.lineTo(-shape.size / 2, shape.size / 2);
      ctx.lineTo(shape.size / 2, shape.size / 2);
      ctx.closePath();
      ctx.fill();
    } else if (shape.type === 'line') {
      ctx.beginPath();
      ctx.moveTo(-shape.size / 2, 0);
      ctx.lineTo(shape.size / 2, 0);
      ctx.stroke();
    }
    ctx.restore();
  });
}

// Function to change the background color randomly
function changeBackgroundColor() {
  backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  drawShapes();
}

// Function to change the background gradient
function changeBackgroundGradient() {
  document.body.style.background = `linear-gradient(135deg, #${Math.floor(Math.random() * 16777215).toString(16)} 0%, #${Math.floor(Math.random() * 16777215).toString(16)} 100%)`;
  document.body.style.backgroundSize = '400% 400%';
  document.body.style.animation = 'gradient 15s ease infinite';
}

// Function to mirror the canvas content
function mirrorCanvas() {
  const width = canvas.width / 2;
  const height = canvas.height / 2;
  const imageData = ctx.getImageData(0, 0, width, height);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (mirrorType === 0) {
    // Draw original image
    ctx.putImageData(imageData, 0, 0);

    // Horizontal mirror
    ctx.save();
    ctx.translate(width * 2, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(canvas, 0, 0, width, height, 0, 0, width, height);
    ctx.restore();

    // Vertical mirror
    ctx.save();
    ctx.translate(0, height * 2);
    ctx.scale(1, -1);
    ctx.drawImage(canvas, 0, 0, width, height, 0, 0, width, height);
    ctx.restore();

    // Both horizontal and vertical mirror
    ctx.save();
    ctx.translate(width * 2, height * 2);
    ctx.scale(-1, -1);
    ctx.drawImage(canvas, 0, 0, width, height, 0, 0, width, height);
    ctx.restore();
  } else {
    // Complex mirroring
    ctx.putImageData(imageData, 0, 0);

    // Draw original mirrored image
    ctx.save();
    ctx.translate(width * 2, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(canvas, 0, 0, width, height, 0, 0, width, height);
    ctx.restore();

    ctx.save();
    ctx.translate(0, height * 2);
    ctx.scale(1, -1);
    ctx.drawImage(canvas, 0, 0, width, height, 0, 0, width, height);
    ctx.restore();

    ctx.save();
    ctx.translate(width * 2, height * 2);
    ctx.scale(-1, -1);
    ctx.drawImage(canvas, 0, 0, width, height, 0, 0, width, height);
    ctx.restore();

    // Additional mirroring
    const newImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.putImageData(newImageData, 0, 0);
    ctx.restore();

    ctx.save();
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    ctx.putImageData(newImageData, 0, 0);
    ctx.restore();

    ctx.save();
    ctx.translate(canvas.width, canvas.height);
    ctx.scale(-1, -1);
    ctx.putImageData(newImageData, 0, 0);
    ctx.restore();
  }

  // Cycle through mirror types
  mirrorType = (mirrorType + 1) % 2;
}

// Function to save the canvas content
function saveCanvas() {
  const link = document.createElement('a');
  link.download = 'kaleidoscope.png';
  link.href = canvas.toDataURL();
  link.click();
}


// Initial draw
drawShapes();

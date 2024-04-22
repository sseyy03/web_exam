document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  let heartX = width / 2;
  let heartY = height / 2;
  let heartRotationAngle = 0;
  const speed = 10;

  let starX = Math.random() * (width - 100) + 50;
  let starY = Math.random() * (height - 100) + 50;

// 캔버스에 타이틀 텍스트를 그립니다.
function drawTitle() {
  ctx.font = '48px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#000';
  ctx.fillText('중간고사게임', canvas.width / 2, canvas.height / 2);
}

drawTitle(); // 페이지 로드 시 타이틀을 그립니다.

  function drawHeart() {
    ctx.save();
    ctx.translate(width / 2, height / 2); // 캔버스 중앙에 하트를 그립니다.
    ctx.rotate(heartRotationAngle); // 하트를 회전시킵니다.
    const heartScale = 3;
    ctx.beginPath();
    for (let t = -Math.PI; t < Math.PI; t += 0.01) {
      let x = 16 * Math.pow(Math.sin(t), 3) * heartScale;
      let y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * heartScale;
      ctx.lineTo(x, y);
    }
    ctx.fillStyle = 'rgb(192, 0, 0)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  function drawStar() {
    ctx.save();
    ctx.translate(starX - heartX + width / 2, starY - heartY + height / 2); // 별의 위치를 조정합니다.
    ctx.beginPath();
    const spikes = 5;
    const outerRadius = 30;
    const innerRadius = 15;
    let rot = Math.PI / 2 * 3;
    let x = 0;
    let y = -outerRadius;
    const step = Math.PI / spikes;

    ctx.moveTo(x, y);
    for (let i = 0; i < spikes; i++) {
      x = Math.cos(rot) * outerRadius;
      y = Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = Math.cos(rot) * innerRadius;
      y = Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(0, -outerRadius);
    ctx.closePath();
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.restore();
  }

  function drawScene() {
    ctx.clearRect(0, 0, width, height);
    drawStar(); // 별을 먼저 그리고
    drawHeart(); // 하트를 그립니다.
  }

  function updateHeartPosition(direction) {
    switch (direction) {
      case 'up': heartY -= speed; break;
      case 'down': heartY += speed; break;
      case 'left': heartX -= speed; break;
      case 'right': heartX += speed; break;
    }
    drawScene();
  }

  document.addEventListener('keydown', function(e) {
    switch (e.key) {
      case 'ArrowUp': updateHeartPosition('up'); break;
      case 'ArrowDown': updateHeartPosition('down'); break;
      case 'ArrowLeft': updateHeartPosition('left'); break;
      case 'ArrowRight': updateHeartPosition('right'); break;
    }
  });

  function updateHeartRotation() {
    heartRotationAngle += 0.01; // 회전 속도를 조절
    drawScene();
  }

  function animate() {
    requestAnimationFrame(animate);
    updateHeartRotation();
  }

  animate(); // 애니메이션 시작

  document.addEventListener('keydown', function(e) {
    if (e.key === 'F5') {
      e.preventDefault();
      starX = Math.random() * (width - 100) + 50;
      starY = Math.random() * (height - 100) + 50;
      drawScene();
    }
  });
});

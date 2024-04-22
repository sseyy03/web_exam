var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// 캔버스의 중앙에 위치할 하트의 시작점을 계산합니다.
const startX = canvas.width / 2;
const startY = canvas.height / 2;

const width = canvas.width;
const height = canvas.height;

// 하트 회전 각도
let heartRotationAngle = 0;

// 하트를 그리는 함수입니다.
function drawHeart() {
  // 하트 모양을 그릴 때 사용할 변수들을 초기화합니다.
  const heartRadius = 20; // 이 값으로 하트의 크기를 조정할 수 있습니다.
  const heartScale = heartRadius / 10; // 심장의 크기를 위한 스케일 값입니다.
  const pi = Math.PI; // 파이 값을 변수로 저장합니다.

  ctx.beginPath(); // 새로운 경로를 시작합니다.
  ctx.moveTo(startX, startY); // 경로를 시작할 위치를 지정합니다.

  // 좌측 상단의 커브를 그립니다.
  for(let t = -pi; t < pi; t += 0.01) {
    let x = 16 * Math.pow(Math.sin(t), 3);
    let y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    x *= heartScale;
    y *= heartScale;
    ctx.lineTo(startX + x, startY + y);
  }
  ctx.lineWidth = 2; // 외곽선의 두께를 설정합니다.
  ctx.strokeStyle = 'black'; // 외곽선 색상을 설정합니다.
  ctx.stroke(); // 경로의 외곽선을 그립니다.
  ctx.closePath(); // 경로를 닫습니다.
  ctx.fillStyle = 'rgb(192, 0, 0)'; // 채우기 색상을 설정합니다.
  ctx.fill(); // 경로 내부를 채웁니다.
  
}



function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }

  function drawRandomStar() {
    const newCx = Math.random() * (width - 100) + 50;
    const newCy = Math.random() * (height - 100) + 50;
    drawStar(newCx, newCy, 5, 30, 15);
  }

  function drawScene() {
    ctx.clearRect(0, 0, width, height); // 캔버스를 지웁니다.
    drawHeart(); // 하트를 그립니다.
    drawRandomStar(); // 별의 위치를 랜덤하게 지정하여 그립니다.
  }

  drawScene(); // 캔버스에 모양들을 그립니다.

  // 사용자가 F5를 눌렀을 때 별의 위치를 랜덤하게 다시 그립니다.
  document.addEventListener('keydown', function(e) {
    if (e.key === 'F5') {
      e.preventDefault(); // 기본 새로고침 동작을 방지합니다.
      drawScene(); // 하트는 같은 위치에, 별은 새로운 위치에 그립니다.
    }
  });
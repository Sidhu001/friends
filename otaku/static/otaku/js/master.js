class Shape {
    constructor(id) {
    this.id = id;
    this.r = 4;
    this.a = 1;
    this.x = Math.floor(Math.random() * WIDTH);
    this.y = Math.floor(Math.random() * HEIGHT);
    this.color = "rgba(" + c1 + "," + c2 + "," + c3 + "," + this.a + ")";
    this.dir = Math.floor(Math.random() * 4);
    this.speed = 1;
    this.s = Math.floor(Math.random() * 2);
    this.aReduction = .002;
  }

  walkLine() {
    if (this.dir == 0) {
      this.x += this.speed;
      this.y += this.speed;
    }
    if (this.dir == 1) {
      this.x += this.speed;
      this.y -= this.speed;
    }
    if (this.dir == 2) {
      this.x -= this.speed;
      this.y += this.speed;
    }
    if (this.dir == 3) {
      this.x -= this.speed;
      this.y -= this.speed;
    }

    this.draw();
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.r, this.r);
    ctx.closePath();
    if (this.a > 0) this.a -= this.aReduction;
    if (this.a <= 0) {
      this.a = 0;
      this.die();
    }
    this.color = "rgba(" + c1 + "," + c2 + "," + c3 + "," + this.a + ")";
  }

  changeDir() {
    var newDir = Math.floor(Math.random() * 4);
    if (this.dir == newDir ||
      (this.dir == 0 && newDir == 3) ||
      (this.dir == 1 && newDir == 2) ||
      (this.dir == 2 && newDir == 1) ||
      (this.dir == 3 && newDir == 0)) {
      this.changeDir();
      return;
    } else {
      this.dir = newDir;
    }
  }

  die() {
    shapes[this.id] = null;
    delete shapes[this.id];
  }
}

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    WIDTH,
    HEIGHT,
    shapes = [],
  c1 = 43,
  c1S = 1,
  c2 = 205,
  c2S = 1,
  c3 = 255,
  c3S = 1,
  yS = 1,
  it = 0,
  totIt = 0,
  changeFreq = 100,
  popInterval = 75,
  gCOchangeFreq = 1000,
  maxPopulation = 300;

resize();
window.addEventListener('resize', resize);

function animate() {
  it++;
  totIt++;

  if (totIt % gCOchangeFreq == 0) {
    if (ctx.globalCompositeOperation == "lighter") {
      ctx.globalCompositeOperation = "source-over";
      gCOchangeFreq = 250;
    } else {
      ctx.globalCompositeOperation = "lighter";
      gCOchangeFreq = 1000;
    }
  }
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(0,0,0,.03)";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.shadowColor = "rgb(" + c1 + ", " + c2 + ", " + c3 + ")";
  ctx.shadowBlur = 25;

  for (var i in shapes) {
    if (it == changeFreq) {
      shapes[i].changeDir();
    }
    shapes[i].walkLine();
  }
  if (it == changeFreq) it = 0;

  changeColor();
  requestAnimationFrame(animate);
}

function changeColor() {
  if (c1 == 0 || c1 == 255) c1S *= -1;
  if (c2 == 0 || c2 == 255) c2S *= -1;
  if (c3 == 0 || c3 == 255) c3S *= -1;
  c1 += 1 * c1S;
  c2 += 1 * c2S;
  c3 += 1 * c3S;
}

init();

function init() {
  ctx.globalCompositeOperation = "lighter";
  for (var i = 0; i < 1; i++) {
    shapes[i] = new Shape(i);
    if (i == 0) shapes[i].dir = 0;
    if (i == 1) shapes[i].dir = 1;
    if (i == 2) shapes[i].dir = 2;
    if (i == 3) shapes[i].dir = 3;

    animate();
  }
  setInterval(function() {
    shapes[shapes.length] = new Shape();
  }, popInterval);
}

function degToRad(deg) {
  return deg * (Math.PI / 180);
}

function resize() {
  WIDTH = document.documentElement.clientWidth;
  HEIGHT = document.documentElement.clientHeight;

  canvas.width = WIDTH;
  canvas.height = HEIGHT;
}

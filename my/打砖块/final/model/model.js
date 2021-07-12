// class GameImage {
//   constructor(img) {
//     this.img = img;
//     this.img.w = img.width;
//     this.img.h = img.height;
//   }
// }

class BaseModel {
  constructor(img, x, y) {
    this.img = img;
    this.img.w = img.width;
    this.img.h = img.height;
    this.x = x;
    this.y = y;
  }
}

class Paddle extends BaseModel {
  constructor(img, x, y, speed) {
    super(img, x, y);
    this.speed = speed ? speed : 5;
  }
  moveLeft() {
    this.x -= this.speed;
    if (this.x <= 0) {
      this.x = 0;
    }
  }
  moveRight() {
    this.x += this.speed;
    if (this.x + this.img.w >= dict.w) {
      this.x = dict.w - this.img.w;
    }
  }
}

class Ball extends BaseModel {
  constructor(img, x, y, speedX, speedY) {
    super(img, x, y);
    this.speedX = speedX ? speedX : 4;
    this.speedY = speedY ? speedY : 3;
    this.isFire = false;
    this.alive = true;
  }
  fire() {
    this.isFire = true;
  }
  move() {
    if (this.x >= dict.w || this.x <= 0) {
      this.speedX = -this.speedX;
    }
    if (this.y >= dict.h || this.y <= 0) {
      this.speedY = -this.speedY;
    }
    this.x += this.speedX;
    this.y += this.speedY;
  }
  rebound() {
    this.speedY *= -1;
  }
}

class Block extends BaseModel {
  constructor(img, x, y, lifes, score) {
    super(img, x, y);
    this.lifes = lifes ? lifes : 1;
    this.alive = true;
    this.score = score;
  }
  kill() {
    if (this.lifes > 0) {
      this.lifes--;
    }
    if (this.lifes === 0) {
      this.alive = false;
    } else {
      this.switchLifesImg();
    }
  }
  switchLifesImg() {
    var img;
    switch (this.lifes) {
      case 1:
        img = window.xing.resources.block1;
        break;
    }
    if (img) {
      this.img = img;
    }
  }
}

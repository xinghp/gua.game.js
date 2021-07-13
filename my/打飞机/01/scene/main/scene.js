class Scene extends GuaScene {
  constructor(gua) {
    super(gua);
    this.init();
  }

  init = () => {
    // 每帧移动 帧一张
    this.bgSpeed = 2;
    // 依次下移两个的临界标志  移动一个需要imgH/speed帧
    this.singleBgFrameCount = 500 / this.bgSpeed;
    this.bgs = [];
    for (var i = 0; i < 2; i++) {
      var b = new GuaImage(imageFromPath("img/bg.png"), 0, -500 * i);
      this.bgs.push(b);
    }

    this.player = new Player();

    this.gua.registerAction("a", () => {
      this.player.moveLeft();
    });
    this.gua.registerAction("d", () => {
      this.player.moveRight();
    });
    this.gua.registerAction("w", () => {
      this.player.moveTop();
    });
    this.gua.registerAction("s", () => {
      this.player.moveBottom();
    });
  };
  update() {
    if (window.paused) {
      // 暂停功能，不更新状态，一直绘制一个状态就是暂停
      return;
    }
    // 依次下移n个，再一次性上移n个
    this.singleBgFrameCount--;
    this.bgSpeed = 2;
    if (this.singleBgFrameCount === 0) {
      this.singleBgFrameCount = 500 / this.bgSpeed;
      this.bgSpeed = -500;
    }
    for (var i = 0; i < this.bgs.length; i++) {
      var b = this.bgs[i];
      b.y += this.bgSpeed;
    }
  }

  draw() {
    // 绘制图片
    this.bgs.forEach((b) => {
      this.gua.drawImage(b);
    });
    this.gua.drawImage(this.player);
  }
}

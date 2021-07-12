class StartScene extends Scene {
  constructor(game) {
    super(game);
    this.init();
  }

  init() {
    this.keyEvent = (e) => {
      if (e.key === "k") {
        // 开始游戏
        this.game.replaceScene(new MainScene(this.game, window.xing.currLevel));
      }
    };
  }

  draw() {
    this.game.drawText({
      text: `按 k 开始游戏
      按 f 发射小球`,
      x: this.game.w / 2 - 100,
      y: this.game.h / 2,
    });
  }

  addEventListeners() {
    window.addEventListener("keydown", this.keyEvent);
  }

  removeEventListeners() {
    window.removeEventListener("keydown", this.keyEvent);
  }
}

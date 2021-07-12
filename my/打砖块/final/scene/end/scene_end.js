class SceneEnd extends Scene {
  constructor(game, totalScore) {
    super(game);
    this.totalScore = totalScore;
    this.init();
  }

  init() {
    this.keyEvent = (e) => {
      if (e.key === "r") {
        // 返回到开始界面
        this.game.replaceScene(new StartScene(this.game));
      }
    };
  }

  draw() {
    this.game.drawText({
      text: `game over
      分数：${this.totalScore}
      按 r 返回到开始界面`,
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

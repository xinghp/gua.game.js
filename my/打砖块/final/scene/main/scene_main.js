class MainScene extends Scene {
  constructor(game, level) {
    super(game);
    this.level = level;
    this.init();
  }

  init() {
    var res = window.xing.resources;
    var g = this.game;
    this.ball = new Ball(res.ball, (g.w - res.ball.width) / 2, g.h - 60);
    this.paddle = new Paddle(
      res.paddle,
      (g.w - res.paddle.width) / 2,
      g.h - 50,
      10
    );
    this.blocks = loadLevel(this.level).blocks;
    this.totalScore = 0;

    g.registerAction("a", () => {
      this.paddle.moveLeft();
    });
    g.registerAction("d", () => {
      this.paddle.moveRight();
    });
    g.registerAction("f", () => {
      this.ball.fire();
    });
  }

  updateAfterAction() {
    var ball = this.ball;
    var paddle = this.paddle;
    var blocks = this.blocks;
    var totalScore = this.totalScore;
    var g = this.game;
    if (window.pause) {
      return;
    }
    if (window.xing.editor) {
      return;
    }
    if (ball.isFire) {
      ball.move();
      if (utils.collide(ball, paddle)) {
        ball.rebound();
      }
      if (utils.overY(ball, paddle)) {
        // gameover
        setTimeout(() => {
          var s = new SceneEnd(g, totalScore);
          g.replaceScene(s);
        }, 200);
      }
    }

    blocks.forEach((block) => {
      if (utils.collide(ball, block) && block.alive) {
        ball.rebound();
        block.kill();
        if (!block.alive) {
          this.totalScore += block.score;
        }
      }
    });
  }

  draw() {
    var g = this.game;
    var blocks = this.blocks;
    var totalScore = this.totalScore;
    var paddle = this.paddle;
    var ball = this.ball;

    // g.ctx.fillStyle = "#554";
    // g.ctx.fillRect(0, 0, g.w, g.h);
    g.drawImage(paddle);
    g.drawImage(ball);
    blocks.forEach((block) => {
      if (block.alive) {
        g.drawImage(block);
      }
    });
    g.drawText({
      text: "分数：" + totalScore,
      x: g.w - 50,
      y: g.h - 10,
    });
  }

  removeActions() {
    var g = this.game;
    g.removeAction("a");
    g.removeAction("d");
    g.removeAction("f");
  }
}

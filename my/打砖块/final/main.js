var __main = () => {
  window.xing.currLevel = 2;
  var res = {
    ball: "./img/ball.png",
    block1: "./img/block_1.png",
    block2: "./img/block_2.png",
    paddle: "./img/paddle.png",
  };
  var xing = Game.instance("#game", res, (g) => {
    g.initScene(new StartScene(g));
  });
  xing.__start();

  window.xing.game = xing;
  window.addEventListener("keydown", (e) => {
    if (e.key === "p") {
      window.pause = !window.pause;
    }
  });
};
__main();

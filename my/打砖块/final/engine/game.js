class Game {
  // resources {key: value } key是资源的名字 value是路径
  // runCallBack 是为了拿到 game 对象，即 this
  constructor(selector, resources, runCallBack) {
    this.runCallBack = runCallBack;
    this.resources = resources;
    this.canvas = document.querySelector(selector);
    this.ctx = this.canvas.getContext("2d");
    this.canvas = this.canvas;
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.ctx = this.ctx;
    this.keydowns = {};
    this.actions = {};
    this.init();
  }

  init() {
    window.addEventListener("keydown", (e) => {
      this.keydowns[e.key] = true;
    });
    window.addEventListener("keyup", (e) => {
      this.keydowns[e.key] = false;
    });
  }

  static instance(...args) {
    // 保证只实例化一次
    if (!this.i) {
      this.i = new Game(...args);
    }
    return this.i;
  }

  registerAction(key, callback) {
    this.actions[key] = callback;
  }

  removeAction(key) {
    delete this.actions[key];
  }

  drawImage(obj) {
    this.ctx.drawImage(obj.img, obj.x, obj.y);
  }

  drawText(obj) {
    this.ctx.fillText(obj.text + "", obj.x, obj.y);
  }

  initScene(scene) {
    this.scene = scene;
    this.scene.addEventListeners();
  }

  replaceScene(replace) {
    // 模板类的好处
    this.scene.removeActions();
    this.scene.removeEventListeners();
    this.scene = replace;
    this.scene.addEventListeners();
  }

  updateAfterAction() {
    this.scene.updateAfterAction();
  }

  draw() {
    this.scene.draw();
  }

  run() {
    Object.keys(this.actions).forEach((key) => {
      // 用一个flag标记按下的案件
      if (this.keydowns[key]) {
        this.actions[key]();
      }
    });
    this.updateAfterAction();
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.draw();
    setTimeout(() => {
      this.run();
    }, 1000 / (window.fps ? window.fps : 30));
  }

  loadResources = (loadCallback) => {
    var r = {};
    var count = 0;
    var names = Object.keys(this.resources);
    names.forEach((imgName) => {
      var img = utils.getImgFromPath(this.resources[imgName]);
      img.onload = () => {
        count++;
        r[imgName] = img;
        if (count === names.length) {
          // 所有资源加载完毕之后执行
          window.xing.resources = r;
          loadCallback(r);
        }
      };
    });
  };

  __start() {
    this.loadResources(() => {
      this.runCallBack(this);
      this.run();
    });
  }
}

var editorApp = new Vue({
  el: "#editor",
  data: {
    show: false,
    fps: 60,
    levelNo: window.xing.currLevel,
    xing: {},
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      window.fps = Number(this.fps);
    },
    changeSpeed(v) {
      window.fps = Number(v);
    },
    switchLevelNo(v) {
      blocks = loadLevel(v).blocks;
      this.xing.game.scene.blocks = blocks;
    },
    showEditor(v) {
      window.xing.editor = v;
      this.xing = window.xing;
      var g = this.xing.game;
      if (v) {
        g.replaceScene(new MainScene(g, window.xing.currLevel));
        this.initDragListener();
      } else {
        g.replaceScene(new StartScene(g));
      }
    },
    addBlock(v) {
      var g = this.xing.game;
      var scene = g.scene;
      var res = this.xing.resources;
      var b = {};
      switch (v) {
        case 1:
          b = new Block(res.block1, (g.w - res.block1.width) / 2, 130, 1, 5);
          break;
        case 2:
          b = new Block(res.block2, (g.w - res.block2.width) / 2, 130, 2, 10);
          break;
      }
      scene.blocks.push(b);
    },
    initDragListener() {
      var g = this.xing.game;
      var scene = g.scene;
      var drag = {};
      g.canvas.addEventListener("mousedown", (e) => {
        var x = e.offsetX;
        var y = e.offsetY;
        // 找出拖拽的砖块
        log(123);
        for (var i = 0; i < scene.blocks.length; i++) {
          var b = scene.blocks[i];
          if (b.text) {
            continue;
          }
          if (utils.hasPoint(x, y, b)) {
            drag = {
              hit: true,
              o: b,
            };
            return;
          }
        }
      });
      // 实时更新坐标
      g.canvas.addEventListener("mousemove", (e) => {
        var x = e.offsetX;
        var y = e.offsetY;
        if (drag.hit) {
          drag.o.x = x;
          drag.o.y = y;
        }
      });
      g.canvas.addEventListener("mouseup", (e) => {
        drag = {};
      });
    },
    saveLevel() {
      // [前两个值是砖块坐标，生命值，分数]
      var blocks = this.xing.game.scene.blocks;
      var d = [];
      blocks.forEach((v) => {
        d.push([v.x, v.y, v.lifes, v.score]);
      });
      var k = dict.editor_level_data;
      var levelData = JSON.parse(localStorage.getItem(k));
      if (levelData && levelData.length > 0) {
        if (levelData.length >= this.levelNo) {
          log("替换关卡数据");
          levelData[this.levelNo - 1] = { blocks: d };
        } else {
          log("新增关卡数据");
          levelData.push({ blocks: d });
        }
        localStorage.setItem(k, JSON.stringify(levelData));
      } else {
        log("第一次编辑关卡");
        localStorage.setItem(k, JSON.stringify([{ blocks: d }]));
      }
      ELEMENT.Message("保存成功，刷新页面开始游戏");
    },
  },
});

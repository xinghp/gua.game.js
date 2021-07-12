var log = function () {
  console.log.apply(console, arguments);
};

var dict = {
  w: 400,
  h: 300,
  editor_level_data: "editor_level_data",
};

var utils = {
  // a相撞b
  collide(a, b) {
    var overX = a.x >= b.x && a.x <= b.x + b.img.width;
    var overY = a.y >= b.y && a.y <= b.y + b.img.height;
    if (overX && overY) {
      // log("相撞");
      return true;
    }
    return false;
  },
  // 点x,y是否在obj内
  hasPoint(x, y, obj) {
    var space = 5;
    var inX = x >= obj.x - space && x <= obj.x + obj.img.width + space;
    var inY = y >= obj.y - space && y <= obj.y + obj.img.height + space;
    return inX && inY;
  },
  // obj1的y超过obj2的y
  overY(obj1, obj2) {
    var b = obj1.y + obj1.img.height > obj2.y + obj2.img.height;
    return b;
  },
  getImgFromPath(path) {
    var img = new Image();
    img.src = path;
    return img;
  },
};

// bind commons
window.xing = {};

var levelData = [
  // 第n关，[前两个值是砖块坐标，生命值，分数]
  {
    blocks: [
      [0, 0, 1, 5],
      [100, 0, 2, 10],
      [200, 0, 1, 5],
    ],
  },
  {
    blocks: [
      [0, 0, 1, 5],
      [200, 0, 2, 10],
      [50, 100, 2, 10],
      [150, 100, 2, 10],
    ],
  },
];

var loadLevel = (v) => {
  var level = levelData[v - 1];
  var k = dict.editor_level_data;
  var local = JSON.parse(localStorage.getItem(k));
  if (local) {
    log("local data");
    level = local[v - 1];
  }
  if (!level) {
    ELEMENT.Message("没有该关卡");
    return {
      blocks: [],
    };
  }
  var blocks = [];
  level.blocks.forEach((data) => {
    var lifes = data[2];
    if (lifes && lifes >= 1) {
      var img = window.xing.resources[`block${lifes}`];
      var b = new Block(img, data[0], data[1], data[2], data[3]);
      blocks.push(b);
    }
  });
  return {
    blocks: blocks,
  };
};

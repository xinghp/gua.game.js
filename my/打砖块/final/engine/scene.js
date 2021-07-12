class Scene {
  constructor(game) {
    this.game = game;
    this.elements = [];
  }
  // 把elements里的元素全部画出来
  // todo 更新、删除很麻烦
  // addElement(e) {
  //   this.elements.push(e);
  // }
  updateAfterAction() {}
  draw() {
    // this.elements.forEach((e) => {
    //   if (e.img) {
    //     this.game.drawImage(e);
    //   }
    //   if (e.text) {
    //     this.game.drawText(e);
    //   }
    // });
  }
  addEventListeners() {}
  removeEventListeners() {}
  removeActions() {}
}

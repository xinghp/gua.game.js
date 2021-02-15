class SceneEnd extends GuaScene {

    constructor(gua) {
        super(gua)
        gua.registerAction('r', function () {
            gua.replaceScene(new SceneTitle(gua))
        })
    }

    draw = () => {
        var score = document.querySelector('.class-score').innerText
        this.gua.context.fillText(score + ' 按 r 重新开始游戏', 50, 100);
    }
}
class SceneTitle extends GuaScene {

    constructor(gua) {
        super(gua)
        gua.registerAction('k', function () {
            gua.replaceScene(new Scene(gua))
        })
    }

    draw = () => {
        this.gua.context.fillText('按 k 游戏开始', 50, 50);
    }
}
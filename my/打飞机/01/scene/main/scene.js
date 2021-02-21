class Scene extends GuaScene {

    constructor(gua) {
        super(gua)
        this.init()
    }

    init = () => {
        this.bg = new GuaImage(imageFromPath('img/bg.png'), 0, 0)
        this.bgSpeed = 3
        this.player = new Player()

        this.gua.registerAction('a', () => {
            this.player.moveLeft()
        })
        this.gua.registerAction('d', () => {
            this.player.moveRight()
        })
        this.gua.registerAction('w', () => {
            this.player.moveTop()
        })
        this.gua.registerAction('s', () => {
            this.player.moveBottom()
        })
    }
    update() {

        if (window.paused) {
            // 暂停功能，不更新状态，一直绘制一个状态就是暂停
            return
        }
        this.bg.y += this.bgSpeed
    }

    draw() {
        // 绘制图片
        this.gua.drawImage(this.bg)
        if (this.bg.y >= this.gua.canvas.height) {
            this.bg.y = 0
        }
        this.gua.drawImage(this.player)
    }

}
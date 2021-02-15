
class Scene extends GuaScene {

    constructor(gua) {
        super(gua)
        this.blocks = this.loadLevel(1)
        this.paddle = Paddle()
        this.ball = Ball()
        this.score = 0
        this.enableDebugMode(true, this.ball)
        this.init()
    }

    init = () => {
        this.gua.registerAction('a', () => {
            this.paddle.moveLeft()
        })
        this.gua.registerAction('d', () => {
            this.paddle.moveRight()
        })
        this.gua.registerAction('f', () => {
            this.ball.fire()
        })
        this.gua.registerAction('s', () => {
            this.ball.stop()
        })
    }

    // 加载关卡
    loadLevel = n => {
        var level = levels[n - 1]
        var blocks = []
        for (var i = 0; i < level.length; i++) {
            var p = level[i]
            var b = Block(p)
            blocks.push(b)
        }
        return blocks
    }

    setScore = score => {
        document.querySelector('.class-score').innerText = '分数：' + score
    }

    enableDebugMode = (enable, ball) => {
        if (!enable) {
            return
        }
        // 关卡
        window.addEventListener('keyup', e => {
            if ('12345'.includes(e.key)) {
                this.blocks = this.loadLevel(Number(e.key))
            }
        })

        // fps 调节器
        document.querySelector('#id-input').addEventListener('change', e => {
            window.fps = Number(document.querySelector('#id-input').value)
        })

        // 球拖动
        var isBall = false
        window.addEventListener('mousedown', e => {
            var x = e.offsetX
            var y = e.offsetY
            // log(x, y, 'down')
            if (this.ball.inMouseDown(x, y)) {
                isBall = true
            }
        })
        window.addEventListener('mousemove', e => {
            var x = e.offsetX
            var y = e.offsetY
            // log(x, y, 'move')
            if (isBall) {
                this.ball.x = x
                this.ball.y = y
            }
        })
        window.addEventListener('mouseup', e => {
            // log(x, y, 'mouseup')
            isBall = false
        })
    }

    update() {
        if (window.paused) {
            // 暂停功能，不更新状态，一直绘制一个状态就是暂停
            return
        }
        this.ball.move()
        // 球与挡板相撞
        if (this.paddle.collide(this.ball)) {
            this.ball.reverse()
        }

        this.blocks.forEach(block => {
            // 球与砖块相撞
            if (block.collide(this.ball)) {
                block.kill()
                this.ball.reverse()
                // 加分数
                this.score += 100
                this.setScore(this.score)
            }
        })

        // 游戏结束
        if (this.ball.y > this.paddle.y + this.paddle.image.height) {
            // log('over', paddle.image.height)
            this.gua.replaceScene(new SceneEnd(this.gua))
        }
    }

    draw() {
        // 绘制图片
        this.gua.drawImage(this.ball)
        this.gua.drawImage(this.paddle)
        this.blocks.forEach(block => {
            if (block.alive) {
                this.gua.drawImage(block)
            }
        })
    }

}
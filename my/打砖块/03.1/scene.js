// 加载关卡
var loadLevel = function (n) {
    var level = levels[n - 1]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(p)
        blocks.push(b)
    }
    return blocks
}

var setScore = function (score) {
    document.querySelector('.class-score').innerText = '分数：' + score
}

// 是否允许 debug 功能
var enableDebugMode = function (enable, ball) {
    if (!enable) {
        return
    }
    // 关卡
    window.addEventListener('keyup', function (e) {
        if ('12345'.includes(e.key)) {
            blocks = loadLevel(Number(e.key))
        }
    })

    // fps 调节器
    document.querySelector('#id-input').addEventListener('change', function (e) {
        window.fps = Number(document.querySelector('#id-input').value)
    })

    // 球拖动
    var isBall = false
    window.addEventListener('mousedown', e => {
        var x = e.offsetX
        var y = e.offsetY
        // log(x, y, 'down')
        if (ball.inMouseDown(x, y)) {
            isBall = true
        }
    })
    window.addEventListener('mousemove', e => {
        var x = e.offsetX
        var y = e.offsetY
        // log(x, y, 'move')
        if (isBall) {
            ball.x = x
            ball.y = y
        }
    })
    window.addEventListener('mouseup', e => {
        // log(x, y, 'mouseup')
        isBall = false
    })
}

var blocks = loadLevel(1)

var Scene = function (gua) {
    var scene = {}

    var paddle = Paddle()
    var ball = Ball()
    var score = 0

    enableDebugMode(true, ball)

    gua.registerAction('a', function () {
        paddle.moveLeft()
    })
    gua.registerAction('d', function () {
        paddle.moveRight()
    })
    gua.registerAction('f', function () {
        ball.fire()
    })
    gua.registerAction('s', function () {
        ball.stop()
    })

    scene.update = function () {
        if (window.paused) {
            // 暂停功能，不更新状态，一直绘制一个状态就是暂停
            return
        }
        ball.move()
        // 球与挡板相撞
        if (paddle.collide(ball)) {
            ball.reverse()
        }

        blocks.forEach(block => {
            // 球与砖块相撞
            if (block.collide(ball)) {
                block.kill()
                ball.reverse()
                // 加分数
                score += 100
                setScore(score)
            }
        })

        // 游戏结束
        if (ball.y > paddle.y + paddle.image.height) {
            // log('over', paddle.image.height)
            gua.replaceScene(sceneEnd(gua))
        }
    }

    scene.draw = function () {
        // 绘制图片
        gua.drawImage(ball)
        gua.drawImage(paddle)
        blocks.forEach(block => {
            if (block.alive) {
                gua.drawImage(block)
            }
        })
    }
    return scene
}
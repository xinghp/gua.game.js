var GuaGame = function () {
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')

    window.fps = 30
    var gua = {
        context: context,
        actions: {},
        keydowns: {},
    }

    gua.drawImage = function (guaImg) {
        gua.context.drawImage(guaImg.image, guaImg.x, guaImg.y)
    }

    window.addEventListener('keydown', event => {
        gua.keydowns[event.key] = true
    })

    window.addEventListener('keyup', event => {
        gua.keydowns[event.key] = false
    })

    gua.registerAction = function (key, callback) {
        gua.actions[key] = callback
    }

    var runLoop = function () {
        // 哪个键被按下则执行对应的回调函数
        for (var key in gua.keydowns) {
            if (gua.keydowns[key] && gua.actions[key]) {
                gua.actions[key]()
            }
        }
        gua.update()
        context.clearRect(0, 0, canvas.width, canvas.height)
        gua.draw()

        setTimeout(() => {
            runLoop()
        }, 1000 / window.fps)
    }

    setTimeout(() => {
        runLoop()
    }, 100)
    return gua
}
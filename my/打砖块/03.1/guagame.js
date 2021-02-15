var GuaGame = function (callBack) {
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')

    window.fps = 30
    var gua = {
        currentScene: null,
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

    gua.update = function () {
        gua.currentScene.update()
    }

    gua.draw = function () {
        gua.currentScene.draw()
    }

    var runLoop = function () {
        // 哪个键被按下则执行对应的回调函数
        for (var key in gua.keydowns) {
            if (gua.keydowns[key] && gua.actions[key]) {
                gua.actions[key]()
            }
        }
        // 更新
        gua.update()
        // 清空画布重新绘制
        context.clearRect(0, 0, canvas.width, canvas.height)
        gua.draw()

        setTimeout(() => {
            // 递归
            runLoop()
        }, 1000 / window.fps)
    }

    gua.runWithScene = function (scene) {
        // setTimeout(() => {
        gua.currentScene = scene
        runLoop()
        // }, 100)
    }

    gua.replaceScene = function (scene) {
        gua.currentScene = scene
    }

    // guagame初始化完成后调用
    callBack(gua)
    return gua
}
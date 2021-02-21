var Ball = function () {
    var o = {
        x: 200,
        y: 200,
        speedX: 5,
        speedY: 5,
        image: imageFromPath('img/ball.png'),
        active: false
    }
    o.move = function () {
        if (o.active) {
            if (o.x > 450 || o.x < 0) {
                o.speedX = -o.speedX
            }
            if (o.y > 350 || o.y < 0) {
                o.speedY = -o.speedY
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.fire = function () {
        o.active = true
    }
    o.stop = function () {
        o.active = false
    }
    // 方向翻转
    o.reverse = function () {
        o.speedY *= -1
    }
    // 鼠标是否点中球
    o.inMouseDown = function (x, y) {
        var inX = x >= o.x && x <= o.x + o.image.width
        var inY = y >= o.y && y <= o.y + o.image.height
        return inX && inY
    }
    return o
}
var Ball = function () {
    var o = {
        x: 200,
        y: 300,
        speedX: 5,
        speedY: 5,
        image: imageFromPath('ball.png'),
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
    o.reverse = function () {
        o.speedY *= -1
    }
    return o
}
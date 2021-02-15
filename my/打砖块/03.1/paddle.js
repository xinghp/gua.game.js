var Paddle = function () {
    var o = {
        x: 250,
        y: 300,
        speed: 8,
        image: imageFromPath('paddle.png')
    }
    o.moveLeft = function () {
        o.x -= o.speed
    }
    o.moveRight = function () {
        o.x += o.speed
    }
    o.collide = function (ball) {
        if (ball.x >= o.x && ball.x + ball.image.width <= o.x + o.image.width) {
            if (ball.y >= o.y && ball.y + ball.image.height <= o.y + o.image.height) {
                return true
            }
        }
        return false
    }

    return o
}
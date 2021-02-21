var Player = function () {
    var o = {
        x: 150,
        y: 200,
        speed: 8,
        image: imageFromPath('img/player.png')
    }
    o.moveLeft = function () {
        o.x -= o.speed
    }
    o.moveRight = function () {
        o.x += o.speed
    }
    o.moveTop = function () {
        o.y -= o.speed
    }
    o.moveBottom = function () {
        o.y += o.speed
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
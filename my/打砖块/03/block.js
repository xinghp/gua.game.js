var Block = function (position) {
    var p = position
    var o = {
        x: p[0],
        y: p[1],
        image: imageFromPath('block.png'),
        alive: true
    }
    o.kill = function () {
        o.alive = false
    }
    o.collide = function (ball) {
        if (ball.x >= o.x && ball.x <= o.x + o.image.width) {
            if (ball.y >= o.y && ball.y <= o.y + o.image.height) {
                return true && o.alive
            }
        }
        return false && o.alive
    }
    return o
}
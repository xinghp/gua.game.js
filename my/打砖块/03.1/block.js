var Block = function (position) {
    var p = position
    var o = {
        x: p[0],
        y: p[1],
        image: imageFromPath('block.png'),
        alive: true,
        life: p[2] || 1,
    }
    o.kill = function () {
        if (o.life <= 0) {
            o.alive = false
        }
    }
    // 球和砖块相撞
    o.collide = function (ball) {
        if (ball.x >= o.x && ball.x <= o.x + o.image.width) {
            if (ball.y >= o.y && ball.y <= o.y + o.image.height) {
                // && o.alive 防止空气墙
                o.life--
                return true && o.alive
            }
        }
        return false && o.alive
    }

    return o
}
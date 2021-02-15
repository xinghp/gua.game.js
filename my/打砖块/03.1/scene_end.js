var sceneEnd = function (gua) {
    var scene = {}
    scene.update = function () {
    }

    scene.draw = function () {
        var score = document.querySelector('.class-score').innerText
        gua.context.fillText(score, 50, 100);
    }
    return scene
}
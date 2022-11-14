window.onload = function()
{
    var config =
    {
        width: 854,
        height: 480,
        backgroundColor: 0x000000,
        scene: [Scene1, Scene2, Scene3, Scene4],
        scale: {
            parent: 'game',
            autoCenter: Phaser.Scale.CENTER_BOTH,
            //mode: Phaser.Scale.RESIZE,
        },
        fps: 60
    }
    var game = new Phaser.Game(config);
}
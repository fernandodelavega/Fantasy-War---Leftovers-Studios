var config = {

    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Inicio, GameScene]
};

var game = new Phaser.Game(config);
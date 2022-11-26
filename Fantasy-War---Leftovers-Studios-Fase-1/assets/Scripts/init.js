import { Inicio } from './Inicio.js';
import { GameScene } from './GameScene.js';
import { player1W } from './player1W.js';
import { player2W } from './player2W.js';
import { draw } from './draw.js';

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
    scene: [Inicio, GameScene, player1W, player2W, draw]
};

var game = new Phaser.Game(config);
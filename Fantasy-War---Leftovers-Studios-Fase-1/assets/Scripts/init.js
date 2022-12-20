import {Intro} from './Intro.js'
import { Inicio } from './Inicio.js';
import { GameScene } from './GameScene.js';
import { player1W } from './player1W.js';
import { player2W } from './player2W.js';
import { draw } from './draw.js';
import { credits } from './credits.js';

var config = {

    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    pixelArt: true,
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Intro, Inicio, GameScene, player1W, player2W, draw, credits]
};

var game = new Phaser.Game(config);
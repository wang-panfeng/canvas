// import test from './test'
// test.test();
import Game from '../贪吃蛇'
// import basic from '../基本图形/basic'
const canvas = document.getElementById('canvas')
const radius = 10;
const game = new Game(radius, canvas);
game.start();
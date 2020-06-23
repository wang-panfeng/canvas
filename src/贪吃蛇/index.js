const DIRECTION = {
    UP: {
        x: 0,
        y: -1
    },
    DOWN: {
        x: 0,
        y: 1
    },
    LEFT: {
        x: -1,
        y: 0
    },
    RIGHT: {
        x: 1,
        y: 0
    }
}

const KEY_CODE = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
}
class DoobleSnake {

    constructor(radius = 5, bodies = [{ x: 100, y: 100 }], direction = "RIGHT", context) {
        this.radius = radius
        this.speed = radius // 简化模型每次移动一个身体节体位
        this.bodies = bodies
        this.context = context
        this.direction = direction;
    }
    setContext(context) {
        this.context = context
    }
    setDirection(direction) {
        this.direction = direction
    }
    paint() {

        this.bodies.forEach(body => {
            this.context.beginPath();
            this.context.fillStyle = "pink"
            this.context.arc(body.x, body.y, this.radius, 0, Math.PI * 2)
            this.context.fill();
            this.context.closePath();

        })



    }
    move() {
        if (!this.timer) {
            this.timer = setInterval(() => {
                let head = this.bodies[0]
                let newHead = {
                    x: head.x + DIRECTION[this.direction].x * this.speed * 2,
                    y: head.y + DIRECTION[this.direction].y * this.speed * 2,
                }
                this.bodies = [newHead].concat(this.bodies.slice(0, -1));
            }, 250)
        }

    }
    eat() {
        const tail = this.bodies[0]
        this.bodies.push(1)
        console.log(this.bodies);

    }
    isEatSelf() {
        const head = this.bodies[0]
        return this.bodies.some((body, index) => {
            if (index === 0) {
                return false;
            }
            if (head.x === body.x && head.y === body.y) {
                return true;
            }
        })
    }

}
class Enemy {
    constructor(x, y, radius = 5, conext) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.context = conext
    }
    setContext(context) {
        this.context = context
    }
    paint() {
        this.context.beginPath();
        this.context.fillStyle = "black"
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        this.context.fill();
        this.context.closePath();
    }

}


export default class Game {
    constructor(radius, canvas) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
        this.generateSnake(radius, this.context) //生成贪吃蛇
        this.generateEnemy(radius, this.context) //生成目标对象
    }
    generateEnemy(radius, context) {
        const width = this.canvas.width
        const height = this.canvas.height;
        let x = parseInt(Math.random() * width, 10);
        let y = parseInt(Math.random() * height, 10);
        this.enemy = new Enemy(x, y, radius, context);
        while (this.isEatEnemy()) { // 生成的新目标如果被和贪吃蛇碰撞，则重新生成
            let x = parseInt(Math.random() * width, 10);
            let y = parseInt(Math.random() * height, 10);
            this.enemy = new Enemy(x, y, radius, context);
        }
    }
    generateSnake(radius, context) {
        const width = this.canvas.width
        const height = this.canvas.height;
        let x = parseInt(Math.random() * width, 10);
        let y = parseInt(Math.random() * height, 10);
        this.snake = new DoobleSnake(radius, [{ x, y }], "RIGHT", context)
    }
    setConext(context) {
        this.snake.setConext(context)
        this.enemy.setConext(context)
    }
    clearScene() { //清空场景
        this.canvas.width = this.canvas.width
    }
    paint() {
        this.clearScene();
        this.snake.paint();
        this.enemy.paint();
    }
    start() {
        let requestID = null;
        this.bindkeyBoardEvt();
        const render = () => {
            this.paint();
            if (this.isGameOver()) {
                window.cancelAnimationFrame(requestID)
                this.offKeyBoardEvt()
                clearInterval(this.snake.timer)
                alert('gameOver')
            } else {
                if (this.isEatEnemy()) {
                    console.log('eat');

                    this.snake.eat();
                    this.generateEnemy(this.snake.radius, this.context)
                }
                this.snake.move()
                requestID = window.requestAnimationFrame(render)
            }
        }
        requestID = window.requestAnimationFrame(render)
    }
    isEatEnemy() {
        const snakeHead = this.snake.bodies[0]
        const distance = Math.sqrt((snakeHead.x - this.enemy.x) * (snakeHead.x - this.enemy.x) + (snakeHead.y - this.enemy.y) * (snakeHead.y - this.enemy.y))
        return distance <= this.snake.radius * 2
    }
    isGameOver() {
        const snakeHead = this.snake.bodies[0]
            //在边界外，说明撞墙
        if (snakeHead.x < 0 || snakeHead.x > this.canvas.width || snakeHead.y < 0 || snakeHead.y > this.canvas.height) {
            return true;
        }
        //碰到了自己
        if (this.snake.isEatSelf()) {
            return true;
        }
        //否则游戏继续
        return false;

    }
    bindkeyBoardEvt() {
        this.keyBoardEvt = (e) => {
            if (e.keyCode === KEY_CODE.UP && (this.snake.direction !== "UP" && this.snake.direction !== "DOWN")) {
                this.snake.setDirection("UP")
            }
            if (e.keyCode === KEY_CODE.DOWN && (this.snake.direction !== "UP" && this.snake.direction !== "DOWN")) {
                this.snake.setDirection("DOWN")
            }
            if (e.keyCode === KEY_CODE.LEFT && (this.snake.direction !== "RIGHT" && this.snake.direction !== "LEFT")) {
                this.snake.setDirection("LEFT")
            }
            if (e.keyCode === KEY_CODE.RIGHT && (this.snake.direction !== "RIGHT" && this.snake.direction !== "LEFT")) {
                this.snake.setDirection("RIGHT")
            }
        }
        document.addEventListener('keyup', this.keyBoardEvt)
    }
    offKeyBoardEvt() {
        document.removeEventListener('keyup', this.keyBoardEvt);
        this.keyBoardEvt = null;
    }
}
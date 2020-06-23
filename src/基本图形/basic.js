//get canvas object
const canvas = document.getElementById('canvas')
    //get context
const context = canvas.getContext('2d')
    //paint
context.moveTo(50, 50)
context.lineTo(450, 50)
context.lineTo(450, 150)
context.lineTo(250, 150)
context.stroke();
console.log(canvas.width);
console.log(context.width); //undefined
// setTimeout(() => {
//     canvas.width = 400
// }, 200)
context.beginPath();
context.fillStyle = 'pink'
context.rect(150, 50, 100, 100)
context.fill();
context.save();
context.beginPath();
context.translate(150, 50);
context.rotate(Math.PI * 15 / 180)
context.translate(-150, -50);
context.fillStyle = 'yellow'
    // context.restore();
context.rect(150, 50, 100, 100)
    //! 变形转换改变了坐标原点。save和restore发挥重要作用

context.globalCompositeOperation = 'lighter';

context.fill();

const imageData = context.getImageData(50, 100, 100, 100);
console.log(imageData);
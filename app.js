
const gridSize = 21

function outsideGrid(position){
return (
    position.x < 1 || position.x > gridSize ||
    position.y < 1 || position.y > gridSize 
    )
}
let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0 }

window.addEventListener('keydown', e => {

    switch(e.key){
        case 'ArrowUp':
            if(lastInputDirection.y !== 0) break
            inputDirection = {x: 0, y: -1}
                break
        case 'ArrowDown':
            if(lastInputDirection.y !== 0) break
            inputDirection = {x: 0, y: 1}
                break
        case 'ArrowLeft':
            if(lastInputDirection.x !== 0) break
            inputDirection = {x: -1, y: 0}  
                break
        case 'ArrowRight':
            if(lastInputDirection.x !== 0) break
            inputDirection = {x: 1, y: 0}
                break
    }
})

function getInputDirection() {
    lastInputDirection = inputDirection
    return inputDirection
}

let snakeSpeed = [8]

const snakeBody = [{x: 11, y: 11}]
let newSegment = 0




function updateSnake() {
    addSegments()

    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y

}

function drawSnake(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElem = document.createElement('div')
        snakeElem.style.gridRowStart = segment.y
        snakeElem.style.gridColumnStart = segment.x
        snakeElem.classList.add('snake')
        gameBoard.appendChild(snakeElem)
    })
}

let segmentTotal = 1

function expandSnake(amount){

newSegment += amount
segmentTotal++
document.getElementById("header").innerHTML = "Score: " + segmentTotal
}


function onSnake(position, { ignoreHead = false } = {}){
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPosition(segment, position)
    })
}

function getSnakeHead(){
return snakeBody[0]
}
function snakeIntersect(){
    return onSnake(snakeBody[0], { ignoreHead: true })
}

function equalPosition(pos1, pos2){
return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
for (let i = 0; i < newSegment; i++){
snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
}
newSegment = 0
}

function randomGridPos(){
    return {
    x: Math.floor(Math.random() * gridSize) + 1,
    y: Math.floor(Math.random() * gridSize) + 1
    }
}

let food = getRandomFoodPos()
const expansionRate = 1

function updateFood() {
    if (onSnake(food)) {
        expandSnake(expansionRate)
        food = getRandomFoodPos()
    }
}

function drawFood(gameBoard) {
        const foodElem = document.createElement('div')
        foodElem.style.gridRowStart = food.y
        foodElem.style.gridColumnStart = food.x
        foodElem.classList.add('food')
        gameBoard.appendChild(foodElem)
    }


function getRandomFoodPos(){
let newFoodPos
while (newFoodPos == null || onSnake(newFoodPos)){
    newFoodPos = randomGridPos()
}
return newFoodPos
}


let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

function newSpeed(speed){
    return snakeSpeed.unshift(speed)
    }

    
let easyLevel = document.getElementById("easy").addEventListener("click", () => newSpeed(8))
let mediumLevel = document.getElementById("medium").addEventListener("click", () => newSpeed(13))
let hardLevel = document.getElementById("hard").addEventListener("click", () => newSpeed(20))
console.log(snakeSpeed)

function clock(currentTime) {

    if(gameOver) {
        if (confirm(segmentTotal + " troopers? Not enough to kill Yoda. Try Again?")){
            window.location.reload()
        }
        return
    }


    window.requestAnimationFrame(clock)
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000
    if (secondsSinceLastRender < 1 / snakeSpeed[0]) {
        return
    }
    
    lastRenderTime = currentTime
    
    update()
    draw()
}
window.requestAnimationFrame(clock) 


function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = " "
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersect()
}
const target = document.getElementById("start");
const startButton = document.getElementById("start_button")

startButton.addEventListener('click', () => target.style.opacity = '0', gameBoard.style.display = "grid", document.getElementById('myVideo').style.display = "none")



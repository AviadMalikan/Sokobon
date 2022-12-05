'use strict'

const WALL = 'WALL';
const FLOOR = 'FLOOR';
const TARGET = 'TARGET'
const GAMER = 'GAMER';
const BOX = 'BOX'
const CLOCK = 'CLOCK'
const GOLD = 'GOLD'
const GLUE = 'GLUE'

const GAMER_IMG = '<img src="img/gamer.png" />'
const BOX_IMG = '<img src="img/box.png" />'
const CLOCK_IMG = '<img src="img/clock.png" />'
const GOLD_IMG = '<img src="img/gold.png" />'
const GLUE_IMG = '<img src="img/glue.png" />'

var gBoard
var gNumOfBoxes = 5
var gGamerPos
var gStepsLeft
var gTenSteps

var gIsGameOn
var gIsGlued
var gIsWin
var gIsGlued
var gIsClocked

var gClockInterval
var gGoldInterval
var gGlueInterval

function initGame() {
    gGamerPos = { i: 1, j: 1 };
    gBoard = buildBoard();

    addBoxes(gNumOfBoxes)
    addTargets(gNumOfBoxes)
    renderBoard(gBoard)

    resetValue()
    clearIntervals()

    gGoldInterval = setInterval(addGold, 10000)
    gClockInterval = setInterval(addClock, 10000)
    gGlueInterval = setInterval(addGlue, 10000)
}

function chooseDifficult(num) {
    gNumOfBoxes = num
    initGame()
}

function gameOver() {
    gIsGameOn = false
    clearIntervals()

    var winOrLoseMsg = (gIsWin) ? 'WIN! 😃' : 'LOOSE! 😖'
    setTimeout(() => alert(`You ${winOrLoseMsg}!`), 500)
}

function checkGameOver() {
    var isGameOver = true
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell.type === TARGET && currCell.gameElement !== BOX) isGameOver = false
        }
    }
    if (isGameOver) {
        gIsWin = true
        gameOver()
    }
    if (gStepsLeft <= 0) {
        gIsWin = false
        gameOver()
    }
}

function moveTo(i, j) {

    var targetCell = gBoard[i][j]
    if (gIsGlued || !gIsGameOn) return
    if (targetCell.type === WALL) return

    //  חישוב שהמרחק הוא לא ערך מוחלט
    var iDiff = i - gGamerPos.i
    var jDiff = j - gGamerPos.j
    // Calculate distance to make sure we are moving to a neighbor cell
    var iAbsDiff = Math.abs(i - gGamerPos.i)
    var jAbsDiff = Math.abs(j - gGamerPos.j)
    // If the clicked Cell is one of the four allowed
    if ((iAbsDiff === 1 && jAbsDiff === 0) ||
        (jAbsDiff === 1 && iAbsDiff === 0)) {
        switch (gBoard[i][j].gameElement) {
            case BOX:
                // if (gBoard[i][j].gameElement === BOX) {
                if (gBoard[i + iDiff][j + jDiff].type !== WALL &&
                    gBoard[i + iDiff][j + jDiff].gameElement === null
                ) {
                    gBoard[i][j].gameElement = null
                    gBoard[i + iDiff][j + jDiff].gameElement = BOX
                    renderCell({ i: i + iDiff, j: j + jDiff }, BOX_IMG)
                } else return
                break
            case GOLD:
                gStepsLeft += 100
                addClass('bonus', i, j)
                setTimeout(() => {
                    removeClass('bonus', i, j)
                }, 3000)
                break
            case CLOCK:
                gIsClocked = true
                break
            case GLUE:
                gIsGlued = true
                gStepsLeft -= 5
                addClass('glue', i, j)
                setTimeout(() => {
                    gIsGlued = false
                    removeClass('glue', i, j)
                }, 5000)
                break
        }
        if (gIsClocked) {
            removeClass('bonus', gGamerPos.i, gGamerPos.j)
            gTenSteps++
            console.log('tenSteps: ', gTenSteps)
            if (gTenSteps === 10) {
                gIsClocked = false
                gTenSteps = 0
            }
        } else gStepsLeft--

        // Update the Model:
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null
        // DOM:
        renderCell(gGamerPos, '')
        // Update the Model:
        targetCell.gameElement = GAMER
        gGamerPos = { i, j }

        // DOM:
        renderCell(gGamerPos, GAMER_IMG)
        if (gIsClocked) addClass('bonus', gGamerPos.i, gGamerPos.j)


        var elScore = document.querySelector('h2')
        elScore.innerText = 'Steps left: ' + gStepsLeft
        // console.log(`this is your ${gStepsLeft} move`)
        // console.log('gStepsLeft: ', gStepsLeft)

        checkGameOver()
    }
}

function handleKey(event) {
    var i = gGamerPos.i
    var j = gGamerPos.j

    switch (event.key) {
        case 'ArrowLeft':
            moveTo(i, j - 1)
            break
        case 'ArrowRight':
            moveTo(i, j + 1)
            break
        case 'ArrowUp':
            moveTo(i - 1, j)
            break
        case 'ArrowDown':
            moveTo(i + 1, j)
            break
    }
}
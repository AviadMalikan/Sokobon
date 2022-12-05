'use strict'


function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function getRandomInt(min, max) { // Inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function getEmptyCell() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell.type === FLOOR && currCell.gameElement === null) {
                var pos = { i: i, j: j }
                emptyCells.push(pos)
            }
        }
    }
    // console.log('emptyCells: ', emptyCells)
    var randomIdx = getRandomInt(0, emptyCells.length - 1)
    return emptyCells[randomIdx]
}

function getEmptyCellForBox() {
    var emptyCells = []
    for (var i = 2; i < gBoard.length - 2; i++) {
        for (var j = 2; j < gBoard[0].length - 2; j++) {
            var currCell = gBoard[i][j]
            if (currCell.type === FLOOR && currCell.gameElement === null) {
                var pos = { i: i, j: j }
                emptyCells.push(pos)
            }
        }
    }
    var randomIdx = getRandomInt(0, emptyCells.length - 1)
    return emptyCells[randomIdx]
}

function addElement(element, elementIMG) {
    var emptyCell = getEmptyCell()
    // console.log('emptyCell: ', emptyCell)
    gBoard[emptyCell.i][emptyCell.j].gameElement = element
    renderCell(emptyCell, elementIMG)
    return emptyCell
}

function removeElement(emptyCell) {
    if (gBoard[emptyCell.i][emptyCell.j].gameElement !== GAMER) {
        gBoard[emptyCell.i][emptyCell.j].gameElement = null
        renderCell(emptyCell, '')
    }
}

function addClass(element, i, j) {
    var cellSelector = '.' + getClassName({ i: i, j: j })
    var elCell = document.querySelector(cellSelector);
    elCell.classList.add(element)
}

function removeClass(element, i, j) {
    var cellSelector = '.' + getClassName({ i: i, j: j })
    var elCell = document.querySelector(cellSelector);
    elCell.classList.remove(element)
}

function resetValue() {
    gStepsLeft = 100
    gIsGameOn = true
    gIsWin = true
    gIsGlued = false
    gIsClocked = false
    gTenSteps = 0
}

function clearIntervals() {
    clearInterval(gGoldInterval)
    clearInterval(gClockInterval)
    clearInterval(gGlueInterval)
}
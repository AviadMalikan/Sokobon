'use strict'

function buildBoard() {
    var board = createMat(12, 12)

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = { type: FLOOR, gameElement: null };
            if (i === 0 || i === board.length - 1
                || j === 0 || j === board[0].length - 1) {
                cell.type = WALL;
            }
            board[i][j] = cell;
        }
    }
    board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

    // add random walls
    // board[getRandomInt(2,10)][getRandomInt(2,10)].type = WALL
    board[3][3].type = WALL
    board[3][4].type = WALL
    board[4][4].type = WALL
    board[4][3].type = WALL

    board[7][7].type = WALL
    board[7][8].type = WALL
    board[8][7].type = WALL
    board[8][8].type = WALL


    return board
}

function addBoxes(num) {
    for (var i = 0; i < num; i++) {
        var emptyCell = getEmptyCellForBox()
        // console.log('emptyCell: ', emptyCell)
        gBoard[emptyCell.i][emptyCell.j].gameElement = BOX
    }
}

function addTargets(num) {
    for (var i = 0; i < num; i++) {
        var emptyCell = getEmptyCell()
        // console.log('emptyCell: ', emptyCell)
        gBoard[emptyCell.i][emptyCell.j].type = TARGET
    }
}

function addGold() {
    var cell = addElement(GOLD, GOLD_IMG)
    setTimeout(() => removeElement(cell), 5000)
}

function addClock() {
    var cell = addElement(CLOCK, CLOCK_IMG)
    setTimeout(() => removeElement(cell), 5000)
}

function addGlue() {
    var cell = addElement(GLUE, GLUE_IMG)
	setTimeout(() => removeElement(cell), 5000)
}

function renderBoard(board) {
    var strHTML = '';

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            var cellClass = getClassName({ i: i, j: j })
            switch (currCell.type) {
                case FLOOR:
                    cellClass += ' floor'
                    break
                case WALL:
                    cellClass += ' wall'
                    break
                case TARGET:
                    cellClass += ' target'

            }
            strHTML += '\t<td class="cell ' + cellClass +
                '"  onclick="moveTo(' + i + ',' + j + ')" >\n';
            switch (currCell.gameElement) {
                case GAMER:
                    strHTML += GAMER_IMG;
                    break
                case BOX:
                    strHTML += BOX_IMG;
                    break
                // case GOLD:
                //     strHTML += GOLD_IMG
            }
            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}

function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}
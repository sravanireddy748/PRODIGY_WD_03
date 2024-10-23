Tic tac toe js
const vsButtons = document.querySelector('.vs-button');
const twoPlayers = document.getElementById('twoPlayers');
const vsComputer = document.getElementById('vsComputer');
const twoPlayersSection = document.querySelector('.two-players');
const vsComputerSection = document.querySelector('.vs-computer');
const restartButton = document.getElementById('restartButton');
const resultBoard = document.getElementById('resultBoard');

const win1Text = document.getElementById('win1');
const win2Text = document.getElementById('win2');
const tieText = document.getElementById('tie');
let infoText;

let player1_wins = 0;
let player2_wins = 0;
let players_ties = 0;
let startPlayer = 'X';
let currentPlayer = startPlayer;
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let gameOver = false;
let isOnePlayerGame = 0;

/* Two players game */
function twoPlayersGame() {
    twoPlayersSection.style.display = "";
    vsComputerSection.remove();
    vsButtons.style.display = "none";
    restartButton.style.display = "";
    infoText = document.getElementById('infoText');
    infoText.textContent = ${currentPlayer}'s turn!;
    resultBoard.style.display = 'flex';
    document.getElementById('big-heading').style.display = 'none';
    document.getElementById('sub-heading').style.display = 'none';
}
twoPlayers.addEventListener('click', twoPlayersGame);

/* One player game vs computer */
function vsComputerGame() {
    vsComputerSection.style.display = "";
    twoPlayersSection.remove();
    vsButtons.style.display = "none";
    restartButton.style.display = "";
    document.getElementById('p1-label').textContent = 'Player (X)';
    document.getElementById('p2-label').textContent = 'Computer (O)';
    infoText = document.getElementById('infoText');
    infoText.textContent = ${currentPlayer}'s turn!;
    isOnePlayerGame = 1;
    resultBoard.style.display = 'flex';
    document.getElementById('big-heading').style.display = 'none';
    document.getElementById('sub-heading').style.display = 'none';
}
vsComputer.addEventListener('click', vsComputerGame);

/* To handle player click on one player game */
function twoPlayerMakeMove(row, col) {
    if (!gameOver && board[row][col] === '') {
        board[row][col] = currentPlayer;
        document.querySelector(.row:nth-child(${row + 1}) .cell:nth-child(${col + 1}).textContent = currentPlayer;

        if (checkWin()) {
            infoText.textContent = ${currentPlayer} wins!;
            if (currentPlayer === 'X') {
                player1_wins += 1;
                win1Text.innerHTML = player1_wins;
            } else {
                player2_wins += 1;
                win2Text.innerHTML = player2_wins;
            }
            gameOver = true;
        } else if (checkTie()) {
            infoText.textContent = "It's a tie!";
            players_ties += 1;
            tieText.innerHTML = players_ties;
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            infoText.textContent = ${currentPlayer}'s turn!;
        }
    }
}

/* To handle click on one player vs computer game */
function vsComputerMakeMove(row, col) {
    if (!gameOver && board[row][col] === '') {
        board[row][col] = currentPlayer;
        document.querySelector(.row:nth-child(${row + 1}) .cell:nth-child(${col + 1}).textContent = currentPlayer;

        if (checkWin()) {
            infoText.textContent = ${currentPlayer} wins!;
            if (currentPlayer === 'X') {
                player1_wins += 1;
                win1Text.innerHTML = player1_wins;
            } else {
                player2_wins += 1;
                win2Text.innerHTML = player2_wins;
            }
            gameOver = true;
        } else if (checkTie()) {
            infoText.textContent = "It's a tie!";
            players_ties += 1;
            tieText.innerHTML = players_ties;
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            infoText.textContent = ${currentPlayer}'s turn!;

            if (!gameOver && currentPlayer === 'O') {

                setTimeout(function() {
                    let bestMove = findBestMove(board);
                    vsComputerMakeMove(bestMove[0], bestMove[1]);
                }, 400);

            }
        }
    }
}

/* Check for moves left on board */
function isMovesLeft(board) {
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (board[i][j] == '')
                return true;

    return false;
}

/* Evaluation in Minimax */
function evaluate(b) {
    for (let row = 0; row < 3; row++) {
        if (b[row][0] == b[row][1] &&
            b[row][1] == b[row][2]) {
            if (b[row][0] == currentPlayer)
                return +10;

            else if (b[row][0] != '')
                return -10;
        }
    }

    for (let col = 0; col < 3; col++) {
        if (b[0][col] == b[1][col] &&
            b[1][col] == b[2][col]) {
            if (b[0][col] == currentPlayer)
                return +10;

            else if (b[0][col] != '')
                return -10;
        }
    }

    if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) {
        if (b[0][0] == currentPlayer)
            return +10;

        else if (b[0][0] != '')
            return -10;
    }

    if (b[0][2] == b[1][1] &&
        b[1][1] == b[2][0]) {
        if (b[0][2] == currentPlayer)
            return +10;

        else if (b[0][2] != '')
            return -10;
    }

    return 0;
}

/* Minimax algorithm */
function minimax(board, depth, isMax) {
    let score = evaluate(board);

    if (score == 10)
        return score;

    if (score == -10)
        return score;

    if (isMovesLeft(board) == false)
        return 0;

    if (isMax) {
        let best = -1000;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                if (board[i][j] == '') {

                    board[i][j] = currentPlayer;

                    best = Math.max(best, minimax(board,
                        depth + 1, !isMax));

                    board[i][j] = '';
                }
            }
        }
        return best;
    } else {
        let best = 1000;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                if (board[i][j] == '') {

                    board[i][j] = currentPlayer == 'X' ? 'O' : 'X';

                    best = Math.min(best, minimax(board,
                        depth + 1, !isMax));

                    board[i][j] = '';
                }
            }
        }
        return best;
    }
}

/* Find best move through Minimax algorithm */
function findBestMove(board) {
    let bestVal = -1000;
    row = -1;
    col = -1;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {

            if (board[i][j] == '') {

                board[i][j] = currentPlayer;

                let moveVal = minimax(board, 0, false);

                board[i][j] = '';

                if (moveVal > bestVal) {
                    row = i;
                    col = j;
                    bestVal = moveVal;
                }
            }
        }
    }
    return [row, col];
}

/* Styling board upon match conditions */
function addDimStyle(i, j) {
    document.querySelector(.row:nth-child(${i+1}) .cell:nth-child(${j+1}).classList.add('dim-color');
}

function removeDimStyle() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            document.querySelector(.row:nth-child(${row+1}) .cell:nth-child(${col+1}).classList = ["cell"];
        }
    }
}

/* Check possibility of win */
function checkWin() {
    for (let i = 0; i < 3; i++) {
        let condition1 = board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer;
        let condition2 = board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer;
        if (condition1) {
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    if (row != i) {
                        addDimStyle(row, col);
                    }
                }
            }
            return true;

        } else if (condition2) {
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    if (col != i) {
                        addDimStyle(row, col);
                    }
                }
            }
            return true;
        }
    }

    let condition3 = board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer;
    let condition4 = board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer;

    if (condition3) {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (row != col) {
                    addDimStyle(row, col);
                }
            }
        }
        return true;
    } else if (condition4) {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (row + col != 2) {
                    addDimStyle(row, col);
                }
            }
        }
        return true;
    }

    return false;
}

/* Check possibility of tie */
function checkTie() {
    for (let row of board) {
        if (row.includes('')) {
            return false;
        }
    }
    console.log("Tie");
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            document.querySelector(.row:nth-child(${row+1}) .cell:nth-child(${col+1}).classList.add('dim-color');
        }
    }
    return true;
}

/* Resetting game state */
function restartGame() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            document.querySelector(.row:nth-child(${row + 1}) .cell:nth-child(${col + 1}).textContent = '';
        }
    }
    startPlayer = startPlayer == 'X' ? 'O' : 'X';
    currentPlayer = startPlayer;
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    gameOver = false;
    removeDimStyle();
    infoText.textContent = ${currentPlayer}'s turn!;

    if (isOnePlayerGame == 1 && currentPlayer == 'O') {
        const x1 = Math.floor(Math.random() * 3);
        const y1 = Math.floor(Math.random() * 3);
        vsComputerMakeMove(x1, y1);
    }

}
restartButton.addEventListener('click', restartGame);
const Gameboard = (() => {
    let gameboard = new Array(9);
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const setMark = (index, mark) => {
        gameboard[index] = mark;
        _render(index);
    }

    function _render(index) {
        const boardSquares = document.querySelectorAll(".board-square");
        boardSquares[index].classList.add(gameboard[index]);
    }

    const checkWin = (mark) => {
        return winCombinations.some(combination => {
            return combination.every(index => {
                return gameboard[index] === mark;
            })
        })
    }

    const resetBoard = () => {
        gameboard = new Array(9);
    }

    return { setMark, checkWin, resetBoard }
})();

const Player = (mark) => {
    let _mark = mark;
    const getMark = () => _mark;
    
    return { getMark }
}

const Game = (() => {
    const player = Player("X");
    const computer = Player("O");

    let playerTurn = true;
    let turnCounter = 0;

    const boardSquares = document.querySelectorAll(".board-square");
    boardSquares.forEach(square => {
        square.addEventListener("click", makeMove, { once: true });
    });

    function makeMove(e) {
        const squareIndex = Array.from(boardSquares).indexOf(e.target);
        turnCounter++;

        if(playerTurn) {
            let playerMark = player.getMark();
            Gameboard.setMark(squareIndex, playerMark);
            if(Gameboard.checkWin(playerMark)) { // player win
                gameEndMessage("You win!");
            } else if(turnCounter >= 9) {
                gameEndMessage("Draw!");
            }
        } else {
            let computerMark = computer.getMark();
            Gameboard.setMark(squareIndex, computerMark);
            if(Gameboard.checkWin(computerMark)) { // computer win
                gameEndMessage("You lose!");
            } else if(turnCounter >= 9) {
                gameEndMessage("Draw!");
            }
        }

        playerTurn = !playerTurn;
    }

    function gameEndMessage(message) {
        const messageText = document.querySelector(".game-end-message-text");
        messageText.textContent = message;

        const messageContainer = document.querySelector(".game-end-message");
        messageContainer.classList.toggle("active");

        const restartButton = document.querySelector(".restart-btn");
        restartButton.addEventListener("click", resetGame);

        function resetGame() {
            Gameboard.resetBoard();
            turnCounter = 0;
            boardSquares.forEach(square => {
                square.classList.remove(player.getMark());
                square.classList.remove(computer.getMark());
                square.removeEventListener("click", makeMove, { once: true });
                square.addEventListener("click", makeMove, { once: true });
            });
            messageText.textContent = "";
            messageContainer.classList.toggle("active");
            restartButton.removeEventListener("click", resetGame);
        }
    }
})();

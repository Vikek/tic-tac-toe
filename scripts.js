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

        console.log(gameboard[index]);
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

    return { setMark, checkWin }
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

    const boardSquares = document.querySelectorAll(".board-square");
    boardSquares.forEach(square => {
        square.addEventListener("click", makeMove, { once: true });
    });

    function makeMove(e) {
        const squareIndex = Array.from(boardSquares).indexOf(e.target);

        if(playerTurn) {
            let playerMark = player.getMark();
            Gameboard.setMark(squareIndex, playerMark);
            if(Gameboard.checkWin(playerMark)) { // player win
                let messageText = document.querySelector(".game-end-message-text");
                messageText.textContent = "You win!"

                let message = document.querySelector(".game-end-message");
                message.classList.toggle("active");
            }
        } else {
            let computerMark = computer.getMark();
            Gameboard.setMark(squareIndex, computerMark);
            if(Gameboard.checkWin(computerMark)) { // computer win
                let messageText = document.querySelector(".game-end-message-text");
                messageText.textContent = "You lose!"

                let message = document.querySelector(".game-end-message");
                message.classList.toggle("active");
            }
        }

        playerTurn = !playerTurn;
    }
})();

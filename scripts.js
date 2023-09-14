const Gameboard = (() => {
    let gameboard = new Array(9);

    const setValue = (index, value) => {
        gameboard[index] = value;

        console.log(gameboard[index]);
        _render(index);
    }

    function _render(index) {
        const boardSquares = document.querySelectorAll(".board-square");
        boardSquares[index].classList.add(gameboard[index]);
    }

    return { setValue }
})();

const Player = (type) => {
    let _type = type;
    const getType = () => _type;
    
    return { getType }
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
            Gameboard.setValue(squareIndex, player.getType());
        }
        else {
            Gameboard.setValue(squareIndex, computer.getType());
        }

        playerTurn = !playerTurn;
    }
})();

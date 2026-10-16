window.onload = function () {
    const squares = document.querySelectorAll("#board div");
    squares.forEach(function (sq) {
        sq.classList.add("square");
    });
};

document.addEventListener("DOMContentLoaded", function () {
    const squares = document.querySelectorAll("#board div");
    const status = document.getElementById("status");
    const newGameButton = document.querySelector(".btn");

    // Save the original status message so we can restore it on reset
    const originalStatusMessage = status.textContent;

    // Tracks the state of the game: 9 slots, one per square
    let gameState = new Array(9).fill(null);
    // X always goes first
    let currentPlayer = "X";
    let gameOver = false;
    const winningLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],   // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],   // columns
        [0, 4, 8], [2, 4, 6]               // diagonals
    ];

    // Returns "X" or "O" if that player has won, otherwise null
    function checkWinner() {
        for (let i = 0; i < winningLines.length; i++) {
            const a = winningLines[i][0];
            const b = winningLines[i][1];
            const c = winningLines[i][2];

            // Excerise 6 is checked here
            if (gameState[a] !== null &&
                gameState[a] === gameState[b] &&
                gameState[a] === gameState[c]) {
                return gameState[a];
            }
        }
        return null;
    }

    for (let i = 0; i < squares.length; i++) {
        // Exercise 1: style each square
        squares[i].classList.add("square");

        // Exercise 2: handle clicks
        squares[i].addEventListener("click", function () {
            // Ignore clicks on squares that are already taken
            if (gameState[i] !== null) {
                return;
            }

            // Record the move, show it, and add the matching CSS class
            gameState[i] = currentPlayer;
            squares[i].textContent = currentPlayer;
            squares[i].classList.add(currentPlayer);

            // Exercise 4: check for a winner
            const winner = checkWinner();
            if (winner !== null) {
                status.textContent = "Congratulations! " + winner + " is the Winner!";
                status.classList.add("you-won");
                gameOver = true;
                return;
            }

            // Switch turns
            currentPlayer = (currentPlayer === "X") ? "O" : "X";
        });

        // Exercise 3: hover effect
        squares[i].addEventListener("mouseover", function () {
            squares[i].classList.add("hover");
        });

        squares[i].addEventListener("mouseout", function () {
            squares[i].classList.remove("hover");
        });
    }

    newGameButton.addEventListener("click", function () {
        // Clear the game state and start with X again
        gameState = new Array(9).fill(null);
        currentPlayer = "X";
        gameOver = false;

        // Remove the X/O marks and their classes from every square
        for (let i = 0; i < squares.length; i++) {
            squares[i].textContent = "";
            squares[i].classList.remove("X");
            squares[i].classList.remove("O");
        }

        // Restore the original status message and remove the winner style
        status.textContent = originalStatusMessage;
        status.classList.remove("you-won");
    });
});
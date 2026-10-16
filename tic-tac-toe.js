window.onload = function () {
    const squares = document.querySelectorAll("#board div");
    squares.forEach(function (sq) {
        sq.classList.add("square");
    });
};

document.addEventListener("DOMContentLoaded", function () {
    const squares = document.querySelectorAll("#board div");

    // Tracks the state of the game: 9 slots, one per square
    const gameState = new Array(9).fill(null);

    // X always goes first
    let currentPlayer = "X";

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
});
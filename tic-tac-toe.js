window.onload = function () {
    const squares = document.querySelectorAll("#board div");
    squares.forEach(function (sq) {
        sq.classList.add("square");
    });
};
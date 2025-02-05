const cells = document.querySelectorAll(".cell");
const playerText = document.querySelector("#playerText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
];

// keep track of cell values
let options = ["", "", "", 
               "", "", "", 
               "", "", ""]; 

let currentPlayer = "🎅"; 

let running = false; 
initializeGame();

function initializeGame() {
    // Add click listeners
    cells.forEach((cell, index) => {cell.addEventListener("click", () => cellClicked(cell, index));}); 
    restartBtn.addEventListener("click", restartGame);

    playerText.textContent = `${currentPlayer}'s turn`;
    running = true;
}


function cellClicked(cell, index) {
    // if game not running or cell is not '' leave it
    if (!running || options[index] !== "") {
        return;
    }
    // click = current player icon 
    updateCell(cell, index);
    // check W, L or draw
    checkWinner();
}


function updateCell(cell, index) {
    options[index] = currentPlayer;    
    cell.textContent = currentPlayer;
}



// Switch to the next player
function changePlayer() {
    if (currentPlayer === "🎅") { 
        currentPlayer = "🎄"; }
        else { 
            currentPlayer = "🎅"; }
    playerText.textContent = `${currentPlayer}'s turn`;
}



// Check if winner or draw
function checkWinner() {
    let roundWon = false;
    // Loop through win conditions
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        // 3 in a row
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        // If empty skip
        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }   
        // Check if match 
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break; 
        }
    }

    //winner message
    if (roundWon) {
        playerText.textContent = `${currentPlayer} WINS!`;
        running = false; // Stop the game
    } 
    // If cells filled and no winner its a draw
    else if (!options.includes("")) {
        playerText.textContent = `It's a DRAW!`;
        running = false; // Stop the game
    } 
    // if not switch to next player
    else {
        changePlayer();
    }
}

// Restart game
function restartGame() {
    currentPlayer = "🎅";
    // Clear the game 
    options = ["", "", "", "", "", "", "", "", ""];
    playerText.textContent = `${currentPlayer}'s turn`;
    // Clear all cells
    cells.forEach(cell => (cell.textContent = ""));
    //game running 
    running = true;
}

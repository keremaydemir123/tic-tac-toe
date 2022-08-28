const cells = document.querySelectorAll(".cell");
const congrats = document.querySelector(".congrats");
const turnInfo = document.querySelector(".turn-info");

let state = "X";
let gridArray = new Array(9);
gridArray.fill(undefined, 0, 8);
let winner;

printTurnInfo(state);

//! events for cells

cells.forEach((cell, index) => {
  cell.addEventListener("click", (e) => {
    e.target.innerText = state;
    e.target.classList.add("permanent");
    e.target.classList.add(`${state}`);
    gridArray[index] = state;
    checkWinner();
    if (winner) {
      endGame(winner);
    }
    state = switchState(state);
    printTurnInfo(state);
  });
  cell.addEventListener("mouseenter", (e) => {
    if (e.target.innerText == "") {
      e.target.innerText = state;
      e.target.classList.add("temp");
    }
  });
  cell.addEventListener("mouseleave", (e) => {
    if (e.target.innerText != "" && !e.target.classList.contains("permanent")) {
      e.target.innerText = "";
    }
    e.target.classList.remove("temp");
  });
});

function checkWinner() {
  const rows = getRows();
  const columns = getColumns();

  checkLines(rows);
  checkLines(columns);

  // if grid is full but no undefined (tie)
  if (!gridArray.includes(undefined)) {
    winner = "tie";
  }
}

function endGame(winner) {
  let message;

  if (winner == "tie") message = `No winner: Tie`;
  else message = `${winner} won the game`;
  let winnerInfo = congrats.content.querySelector(".winner-info");
  winnerInfo.innerText = message;
  winnerInfo.classList.add(`${winner}`);
  congrats.content
    .querySelector(".play-again")
    .addEventListener("click", () => window.location.reload());

  cells.forEach((cell) => cell.classList.add("disabled"));

  document.body.append(congrats.content);
  turnInfo.remove();
}

function checkLines(array) {
  // checks whether a line in grid has same values
  array.forEach((line, index) => {
    let isWin = line.every((index) => {
      if (line[0] != undefined && index === line[0]) return true;
    });
    if (isWin) {
      winner = array[index][0];
    }
  });
}
function printTurnInfo(state) {
  turnInfo.querySelector(".turn-info-h3").innerText = `Turn of ${state}`;
}

function switchState(state) {
  if (state === "X") state = "O";
  else state = "X";
  return state;
}

function getRows() {
  let rows = [],
    i = 0,
    n = gridArray.length;
  while (i < n) {
    rows.push(gridArray.slice(i, (i += 3)));
  }
  return rows;
}

function getColumns() {
  let column1 = [],
    column2 = [],
    column3 = [],
    columns = [];
  for (let i = 0; i < 9; i++) {
    if (i % 3 === 0) column1.push(gridArray[i]);
    if (i % 3 === 1) column2.push(gridArray[i]);
    if (i % 3 === 2) column3.push(gridArray[i]);
  }
  columns.push(column1);
  columns.push(column2);
  columns.push(column3);
  return columns;
}

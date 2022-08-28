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
    gridArray[index] = state;
    let winner = checkWinner();
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

  if (checkLines(rows)) return checkLines(rows);
  if (checkLines(columns)) return checkLines(columns);

  // grid is full but no winner (tie)
  if (!gridArray.includes(undefined)) {
    return "tie";
  }

  return false;
}

function endGame(winner) {
  let message;

  if (winner == "tie") message = `No winner: Tie`;
  else message = `${winner} won the game`;

  congrats.content.querySelector(".winner-info").innerText = message;
  congrats.content
    .querySelector(".play-again")
    .addEventListener("click", () => window.location.reload());

  cells.forEach((cell) => cell.classList.add("disabled"));

  setTimeout(() => {
    document.body.append(congrats.content);
    turnInfo.remove();
  }, 500);
}

function checkLines(array) {
  // checks whether a line in grid has same values
  // if so, return its value as winner ex) X X X => winner = X
  let winner;
  array.forEach((line, index) => {
    let isWin = line.every((index) => {
      if (line[0] != undefined && index === line[0]) return true;
    });
    if (isWin) {
      winner = array[index][0];
    }
  });
  return winner;
}
function printTurnInfo(state) {
  turnInfo.querySelector(".turn-info-h3").innerText = `Turn of ${state}`;
}
function switchState(state) {
  if (state === "X") state = "O";
  else if (state === "O") state = "X";
  else throw new Error("state is differen than X and O");
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

import { Children, useState } from "react";

import "./App.css";
const turns = {
  x: "x",
  o: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;
  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const winner_combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  const [board, seBoard] = useState(Array(9).fill(null));
  //console.log(board);
  const [turn, setTurn] = useState(turns.x);
  //console.log(turn);
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    for (const combo of winner_combos) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    seBoard(newBoard);
    const newTurn = turn === turns.x ? turns.o : turns.x;
    console.log(index);
    setTurn(newTurn);
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac toe</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === turns.x}>{turns.x}</Square>
        <Square isSelected={turn === turns.o}>{turns.o}</Square>
      </section>
      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner == false ? "Empate" : "Gano: " + winner}</h2>
            <header className="win">
              {winner && <Square>{winner}</Square>}

            </header>

            <footer>
              <button>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
};

export default App;

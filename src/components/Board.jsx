import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isTurn, setIsTurn] = useState(true);

  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] !== null && state[a] === state[b] && state[b] === state[c]) {
        return state[a];
      }
    }
    return null;
  };

  const isWinner = checkWinner();
  const isDraw = !isWinner && state.every(cell => cell !== null);

  const handleClick = (index) => {
    if (state[index] !== null || isWinner) return;
    const copystate = [...state];
    copystate[index] = isTurn ? "X" : "O";
    setState(copystate);
    setIsTurn(!isTurn);
  };

  const handleReset = () => {
    setState(Array(9).fill(null));
    setIsTurn(true);
  };

  return (
    <div className="board-container">
      <h1 className="title">TIC TAC TOE</h1>

      {isWinner ? (
        <>
          <h3 className="result">{isWinner} won the game!</h3>
          <button className="reset-btn" onClick={handleReset}>Play again</button>
        </>
      ) : isDraw ? (
        <>
          <h3 className="result">It's a Draw!</h3>
          <button className="reset-btn" onClick={handleReset}>Play again</button>
        </>
      ) : (
        <>
          <h4 className="heading">Player {isTurn ? "X" : "O"} please move</h4>
        </>
      )}

      <div className="board-row">
        <Square onClick={() => handleClick(0)} value={state[0]} />
        <Square onClick={() => handleClick(1)} value={state[1]} />
        <Square onClick={() => handleClick(2)} value={state[2]} />
      </div>
      <div className="board-row">
        <Square onClick={() => handleClick(3)} value={state[3]} />
        <Square onClick={() => handleClick(4)} value={state[4]} />
        <Square onClick={() => handleClick(5)} value={state[5]} />
      </div>
      <div className="board-row">
        <Square onClick={() => handleClick(6)} value={state[6]} />
        <Square onClick={() => handleClick(7)} value={state[7]} />
        <Square onClick={() => handleClick(8)} value={state[8]} />
      </div>
    </div>
  );
};

export default Board;

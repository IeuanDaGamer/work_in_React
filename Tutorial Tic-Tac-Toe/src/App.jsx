import { useState } from "react";
import "style.css";

function Square({ value, onClick, highlight }) {
  return (
    <button
      className={`square ${highlight ? "highlight" : ""}`}
      onClick={onClick}
    >
      {value === "X" ? "❌" : value === "O" ? "⭕" : ""}
    </button>
  );
}

function Board({ squares, onSquareClick, winningLine }) {
  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => onSquareClick(i)}
        highlight={winningLine?.includes(i)}
      />
    );
  }

  return (
    <div className="board">
      {[0, 3, 6].map((row) => (
        <div key={row} className="board-row">
          {renderSquare(row)}
          {renderSquare(row + 1)}
          {renderSquare(row + 2)}
        </div>
      ))}
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [showHistory, setShowHistory] = useState(false);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const winnerInfo = calculateWinner(currentSquares);
  const winner = winnerInfo?.winner;
  const winningLine = winnerInfo?.line;

  function handlePlay(nextSquares) {
    if (winner) return;
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleUndo() {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
    }
  }

  function handleRestart() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setShowHistory(false);
  }

  function handleClick(i) {
    if (currentSquares[i] || winner) return;
    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    handlePlay(nextSquares);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const moves = history
    .map((squares, move) => {
      if (move === 0) return null;
      return (
        <button key={move} className="history-btn" onClick={() => jumpTo(move)}>
          Крок #{move}
        </button>
      );
    })
    .filter(Boolean);

  let status;
  if (winner) {
    status = `🏆 Переможець: ${winner}`;
  } else if (!currentSquares.includes(null)) {
    status = "🤝 Нічія!";
  } else {
    status = `Наступний ходить: ${xIsNext ? "❌" : "⭕"}`;
  }

  return (
    <div className="game">
      <h1 className="title">«Хрестики-нулики»</h1>
      <div className="game-board">
        <Board
          squares={currentSquares}
          onSquareClick={handleClick}
          winningLine={winningLine}
        />
      </div>
      <div className="controls">
        <div className="status">{status}</div>
        <div className="buttons">
          <button onClick={handleUndo} disabled={currentMove === 0}>
            ⬅ На крок назад
          </button>
          <button onClick={handleRestart}>🔄 Рестарт</button>
          <button
            onClick={() => setShowHistory(!showHistory)}
            disabled={currentMove === 0}
          >
            📜 Історія ходів
          </button>
        </div>
        {showHistory && moves.length > 0 && (
          <div className="history">{moves}</div>
        )}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return null;
}

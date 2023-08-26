import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSquares, restart } from "./store/store";

function Board() {
  const squares = useSelector((state) => state.squares);
  const dispatch = useDispatch();

  function selectSquare(square) {
    const nextValue = calculateNextValue(squares);
    if (squares[square] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = [...squares];
    nextSquares[square] = nextValue;
    dispatch(setSquares(nextSquares));
  }

  function renderSquare(i) {
    return (
      <button
        className={`border border-gray-700 w-16 h-16 flex items-center justify-center text-2xl font-semibold ${
          squares[i] === "X" ? "text-blue-600" : "text-red-600"
        } hover:bg-gray-100 transition-colors`}
        onClick={() => selectSquare(i)}
      >
        {squares[i]}
      </button>
    );
  }

  return (
    <div className="container flex flex-col items-center justify-center">
      <h1 className="mb-4 text-3xl font-bold">Tic Tac Toe </h1>
      <div className="mb-4 text-xl font-semibold text-center">
        {calculateStatus(
          calculateWinner(squares),
          squares,
          calculateNextValue(squares)
        )}
      </div>
      <div className="grid grid-cols-3 gap-0">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid grid-cols-3 gap-0">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid grid-cols-3 gap-0">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4">
        <Board />
      </div>
      <button
        className="rounded-xl text-white bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-800 hover:to-blue-500 active:from-blue-900 active:to-blue-600 focus:outline-none focus:ring focus:ring-blue-300 px-5 py-2"
        onClick={() => dispatch(restart())}
      >
        Restart
      </button>
    </div>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;

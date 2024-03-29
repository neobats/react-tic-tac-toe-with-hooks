import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const {useState} = React;

const Square = (props) => (
  <button
    className="square"
    onClick={() => props.onClick()}
  >
    {props.value}
  </button>
);

const Board = (props) => {
  const renderSquare = (i) => {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    )
  }
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

const Game = () => {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null)
  }])
  const [xIsNext, setXIsNext] = useState(true)
  const [stepNumber, setStepNumber] = useState(0)

  const jumpTo = (step) => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0)
  }

  const xOrNo = () => {
    return xIsNext ? 'X' : 'O'
  }

  const handleClick = (i) => {
    const moveList = history.slice(0, stepNumber + 1)
    const current = moveList[moveList.length - 1]
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = xOrNo()
    setHistory(moveList.concat({ squares }))
    setXIsNext(!xIsNext)
    setStepNumber(moveList.length)
  }

  const render = () => {
    const current = history[stepNumber]
    const winner = calculateWinner(current.squares)
    const status = winner ? 'Winner: ' + winner : 'Next player: ' + xOrNo();

    const moves = history.map((step, move) => {
      const description = move
        ? 'Go to move #' + move
        : 'Go to game start'
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
  return render()
}

const calculateWinner = (squares) => {
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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


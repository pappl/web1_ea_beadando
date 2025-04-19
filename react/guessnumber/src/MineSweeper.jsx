import React, { useState, useEffect } from 'react';

const SIZE = 9;
const MINES = 10;

function createBoard() {
  const board = Array(SIZE).fill(null).map(() => Array(SIZE).fill({
    revealed: false,
    mine: false,
    neighborMines: 0,
    flagged: false,
  }));

  let minesPlaced = 0;
  while (minesPlaced < MINES) {
    const row = Math.floor(Math.random() * SIZE);
    const col = Math.floor(Math.random() * SIZE);
    if (!board[row][col].mine) {
      board[row][col] = { ...board[row][col], mine: true };
      minesPlaced++;
    }
  }

  
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c].mine) continue;
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const nr = r + i;
          const nc = c + j;
          if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && board[nr][nc].mine) {
            count++;
          }
        }
      }
      board[r][c] = { ...board[r][c], neighborMines: count };
    }
  }

  return board;
}

export default function Minesweeper() {
  const [board, setBoard] = useState(createBoard());
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const revealCell = (r, c) => {
    if (gameOver) return;

    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    const cell = newBoard[r][c];

    if (cell.revealed || cell.flagged) return;

    const stack = [[r, c]];

    while (stack.length) {
      const [row, col] = stack.pop();
      const cell = newBoard[row][col];

      if (cell.revealed || cell.flagged) continue;
      cell.revealed = true;

      if (cell.mine) {
        setGameOver(true);
        return;
      }

      if (cell.neighborMines === 0) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const nr = row + i;
            const nc = col + j;
            if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE) {
              stack.push([nr, nc]);
            }
          }
        }
      }
    }

    setBoard(newBoard);

    const revealedCount = newBoard.flat().filter(cell => cell.revealed).length;
    if (revealedCount === SIZE * SIZE - MINES) {
      setGameOver(true);
      setWin(true);
    }
  };

  const toggleFlag = (e, r, c) => {
    e.preventDefault();
    if (gameOver) return;

    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    const cell = newBoard[r][c];
    if (cell.revealed) return;

    cell.flagged = !cell.flagged;
    setBoard(newBoard);
  };

  const resetGame = () => {
    setBoard(createBoard());
    setGameOver(false);
    setWin(false);
  };

  const flagCount = board.flat().filter(cell => cell.flagged).length;

  return (
    <div>
      <h2>Aknakereső</h2>
      {gameOver && (
        <p>{win ? '🎉 Nyertél!' : '💣 Bumm! Vége a játéknak!'}</p>
      )}
      <p>Zászlók: {flagCount} / {MINES}</p>
      <button class="mainbtn" onClick={resetGame}>Új játék</button>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${SIZE}, 30px)`,
        marginTop: '10px'
      }}>
        {board.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => revealCell(r, c)}
              onContextMenu={(e) => toggleFlag(e, r, c)}
              style={{
                width: 30,
                height: 30,
                fontSize: '14px',
                backgroundColor: cell.revealed ? '#ddd' : '#999',
                color: cell.mine ? 'red' : 'black',
                cursor: 'pointer',
              }}
            >
              {cell.revealed
                ? (cell.mine ? '💣' : (cell.neighborMines || ''))
                : (cell.flagged ? '🚩' : '')}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import MineSweeper from './MineSweeper';
import GuessNumber from './GuessNumber';

export default function App() {
  const [menu, setMenu] = useState('minesweeper');

  
  return (
    <div>
      <h1>React alkalmazás</h1>
      <nav>
        <button class="mainbtn" onClick={() => setMenu('minesweeper')}>Aknakereső</button>
        <button class="mainbtn" onClick={() => setMenu('guess')}>Gondoltam egy számra</button>
      </nav>
      <hr />
      <div>
        {menu === 'minesweeper' && <MineSweeper />}
        {menu === 'guess' && <GuessNumber />}
      </div>
    </div>
  );
}

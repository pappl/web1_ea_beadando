import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import MineSweeper from './MineSweeper';

export default function App() {
  const [menu, setMenu] = useState('minesweeper');

  
  return (
    <div>
      <h1>React alkalmazás</h1>
      <nav>
        <button class="mainbtn" onClick={() => setMenu('minesweeper')}>Aknakereső</button>
      </nav>
      <hr />
      <div>
        {menu === 'minesweeper' && <MineSweeper />}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import Minesweeper from './minesweeper/App';
import GuessNumber from './guess/App';
import './App.css';


export default function App() {
  const [app, setApp] = useState('minesweeper');

  return (
    <div>
      <h1>React Játékok</h1>
      <button class="mainbtn" onClick={() => setApp('minesweeper')}>Aknakereső</button>
      <button class="mainbtn" onClick={() => setApp('guess')}>Találd ki a számot</button>

      {app === 'minesweeper' && <Minesweeper />}
      {app === 'guess' && <GuessNumber />}
    </div>
  );
}

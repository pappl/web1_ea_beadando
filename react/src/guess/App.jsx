import React, { useState } from 'react';
import './App.css';


export default function GuessNumber() {
  const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;

  const [target, setTarget] = useState(getRandomNumber());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [tries, setTries] = useState(0);

  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num)) {
      setMessage('Kérlek, adj meg egy számot!');
      return;
    }

    setTries(prev => prev + 1);

    if (num === target) {
      setMessage(`Eltaláltad! A szám: ${target}. Tippjeid száma: ${tries + 1}`);
    } else if (num < target) {
      setMessage('Túl kicsi!');
    } else {
      setMessage('Túl nagy!');
    }
  };

  const resetGame = () => {
    setTarget(getRandomNumber());
    setGuess('');
    setMessage('');
    setTries(0);
  };

  return (
    <div>
      <h2>Gondoltam egy számra</h2>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Írd be a tipped..."
      />
      <button className="mainbtn" onClick={handleGuess}>Tipp</button>
      <button className="mainbtn" onClick={resetGame}>Új játék</button>
      <p>{message}</p>
    </div>
  );
}

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { Game } from './features/game/Game';
import { Setup } from './features/setup/Setup';
import './App.css';

export default function App() {
    const [playerName, setPlayerName] = useState('');

    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/setup">Game Setup</Link>
            </li>
            <li>
              <input
                aria-label="Set player name"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
              />
            </li>
            <li>
              <Link to={`/game/${playerName}`}>Play As {playerName}</Link>
            </li>
          </ul>
  
          <Switch>
            <Route path="/setup">
              <Setup />
            </Route>
            <Route path="/game/:playerName">
              <Game />
            </Route>
          </Switch>
        </div>
      </Router>
    );
}


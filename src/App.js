import React from 'react';
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
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/setup">Game Setup</Link>
            </li>
            <li>
              <Link to="/game/d">Play As D</Link>
            </li>
            <li>
              <Link to="/game/s">Play as S</Link>
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


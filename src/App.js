import React, { Component } from 'react';
import './App.css';

import Finish from './core/Finish';
import Border from './core/Border';
import Empty from './core/Empty';
import Board from './components/Board'

// Register Players
import TeamPlayer1 from './players/PlayerTeam1';
import TeamPlayer2 from './players/PlayerTeam2';
import TeamPlayer3 from './players/PlayerTeam3';

import {LOCAL_STORAGE_MAP_COLLECTION_KEY} from './constants/localStorageKeys';

import initializeDefaultBoard from './maps/labyrinth';

class App extends Component {
  constructor(props) {
    super(props);

    this.finish = new Finish();
    this.border = new Border();
    this.empty = new Empty();

    if (localStorage && !localStorage.getItem(LOCAL_STORAGE_MAP_COLLECTION_KEY)) {
      initializeDefaultBoard();
    }
  }

  get players() {
    const p1 = new TeamPlayer1('01');
    const p2 = new TeamPlayer2('02');
    const p3 = new TeamPlayer3('03');
    return [
      p1,
      p2,
      p3,
    ]
  }

  render() {
    return (
      <div className="App">
        <Board
          players={this.players}
        />
      </div>
    );
  }
}

export default App;

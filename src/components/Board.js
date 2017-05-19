import React, { Component } from 'react';
import ReactCountdownClock from 'react-countdown-clock';

import LocalStorageHelper from '../helpers/localStorage';

import PlayersInfo from './PlayersInfo';
import BoardMap from './BoardMap';

import {EMPTY, BORDER, WALL, PLAYER, JEVEL} from '../constants/boardFields';
import {FORWARD, BACKWARD, RIGHT, LEFT} from '../constants/directions';
import {LOCAL_STORAGE_MAP_COLLECTION_KEY} from '../constants/localStorageKeys';

import Empty from '../core/Empty';
import Border from '../core/Border';
import Finish from '../core/Finish';

const DEFAULT_MAP_ROWS_NUMBER = 20;
const DEFAULT_MAP_COLS_NUMBER = 20;

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: this.props.map ||
        this.generateEmptyMap(DEFAULT_MAP_ROWS_NUMBER, DEFAULT_MAP_COLS_NUMBER),
      movingInProgress: false,
      players: this.props.players || [],
      timer: undefined,
      columnsNumber: DEFAULT_MAP_ROWS_NUMBER,
      rowsNumber: DEFAULT_MAP_COLS_NUMBER,
      editMode: false,
      currentMapName: (this.props.map && this.props.map.name) || (new Date()).toString(),
      speed: 300,
      pause: false,
      game_timeout: 300,
      timerColor: 'orange',
    }

    this.bindCallbacks();
  }

  bindCallbacks() {
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setMapSize = this.setMapSize.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleSaveMap = this.handleSaveMap.bind(this);
    this.handleEditMap = this.handleEditMap.bind(this);
    this.handleCreateMap = this.handleCreateMap.bind(this);
    this.handleCsncelEditMap = this.handleCsncelEditMap.bind(this);
  }

  generateTwoDemArray(x, y) {
    return [...(new Array(x))].map((row) => [...(new Array(y))]);
  }

  generateEmptyMap(rowsNumber, columnsNumber) {
    return this.generateTwoDemArray(rowsNumber, columnsNumber)
      .map((row) => row.map((col) => new Empty()));
  }

  getMoveResult(nextItem) {
    if (!nextItem) {
      return {
          pass: false,
          finish: false,
          type: WALL,
        }
    }
    const {type} = nextItem;
    switch(type) {
      case EMPTY:
        return {
          pass: true,
          finish: false,
        }
      case BORDER:
        return {
          pass: false,
          finish: false,
          type: BORDER,
        }
      case PLAYER:
        return {
          pass: false,
          finish: false,
          type: PLAYER,
        }
      case JEVEL:
        return {
          pass: false,
          finish: true,
          type: JEVEL,
        }
      default:
      throw new Error("Unregistered move result type is returned: " + type);
    }
  }

  getNextPosition(currentPosition, step) {
    switch(step) {
      case FORWARD:
        return {
          rowIndex: currentPosition.rowIndex - 1,
          cellIndex: currentPosition.cellIndex,
        }
      case BACKWARD:
        return {
          rowIndex: currentPosition.rowIndex + 1,
          cellIndex: currentPosition.cellIndex,
        }
      case LEFT:
        return {
          rowIndex: currentPosition.rowIndex,
          cellIndex: currentPosition.cellIndex - 1,
        }
      case RIGHT:
        return {
          rowIndex: currentPosition.rowIndex,
          cellIndex: currentPosition.cellIndex + 1,
        }
      default:
        throw new Error("Unregistered move step type is returned: " + step);
    }
  }

  getCurrentPosition(player) {
    let position;

    this.state.map.forEach((row, rowIndex) =>
      row.forEach((item, cellIndex) => {
        if(item.id === player.id) {
          position = {
            rowIndex,
            cellIndex,
          }
          // do break and exit loop
        }
      }))
      if (!position) {
        console.error(`Player id: ${player.id} is not present on the board.`);
      }
      return position;
  }

  getNextPlayerItem(item) {
    if (!this.state.players || !this.state.players.length) {
      throw new Error("There are no players set!");
    }

    if(!item.type || item.type !== PLAYER) {
      return this.state.players[0];
    }

    const playerIndex = this.state.players.indexOf(item);
    const nextPlayer = this.state.players[playerIndex + 1] || this.state.players[0];

    return nextPlayer;
  }

  generateNextItem(item) {
    switch(item.type) {
      case EMPTY:
        return new Border();
      case BORDER:
        return new Finish();
      case JEVEL:
      default:
        return new Empty();
    }
  }

  instantiateMap(map) {
    const instantiatedData = map.data.map(row => {
      return row.map(cell => {
        switch(cell.type) {
          case BORDER:
            return new Border();
          case JEVEL:
            return new Finish();
          case PLAYER:
          case EMPTY:
          default:
            return new Empty();
        }
      })
    })

    return Object.assign(map, {
      data: instantiatedData,
    })
  }

  setMapSize() {
    const {
      map: currentMap,
      columnsNumber,
      rowsNumber,
    } = this.state;

    let nextMap = ([...(new Array(rowsNumber))])
      .map((row, index) => {
        const currentMapRow = currentMap[index];
        const nextMapRow = [...(new Array(columnsNumber)).fill(new Empty())];

        if (currentMapRow && currentMapRow.length) {
          return Object.assign(nextMapRow,
            currentMapRow.slice(0, columnsNumber)
          );
        }

        return nextMapRow;
    });

    this.setState({
      map: nextMap,
    })
  }

  handleInputChange(e) {
    const {value, name, dataset} = e.target;
    this.setState({
      [name]: dataset.type === 'number' ? +value : value,
    })
  }

  handleCellClick(rowNumber, colNumber, event) {
    if (!this.state.editMode) {
      return;
    }

    const {map: currentMap} = this.state;
    const currentItem = currentMap[rowNumber][colNumber];

    const nextItem = event.altKey ?
      this.getNextPlayerItem(currentItem) : this.generateNextItem(currentItem);


    let nextMap = currentMap.slice();
    nextMap[rowNumber][colNumber] = nextItem;

    this.setState({
      map: nextMap,
    })
  }

  validateData() {
    if(!this.state.currentMapName && !this.state.currentMapName.trim()) {
      return {
        pass: false,
        error: 'Map name is required!',
      }
    }

    return {
        pass: true,
      }
  }

  handleSaveMap() {
    const validation = this.validateData();
    if(!validation.pass) {
      console.error('Invalid data! ' + validation.error);
    }
    this.toggleEdiMode();
    LocalStorageHelper.addCollectonItem(
      LOCAL_STORAGE_MAP_COLLECTION_KEY,
      {
        name: this.state.currentMapName,
        data: this.state.map
      });
  }

  handleCsncelEditMap() {
    this.toggleEdiMode();
  }

  handleEditMap() {
    this.toggleEdiMode();
  }

  handleCreateMap() {
    this.toggleEdiMode();
    const {rowsNumber, columnsNumber} = this.state;
    this.setState({
      map: this.generateEmptyMap(rowsNumber, columnsNumber),
      currentMapName: (new Date()).toString(),
    })
  }

  handleSetCurrentMap(map) {
    const instantiatedMap = this.instantiateMap(map);
    this.setState({
      map: instantiatedMap.data,
      currentMapName: instantiatedMap.name,
    })
  }

  toggleEdiMode() {
    this.setState({
      editMode: !this.state.editMode,
    })
  }

  movePlayerError(player) {
    console.error(`MovePlayer(${player.getId()}-${player.getNickname()}): Error =(`);
      return {
        isFinished: false,
      };
  }

  movePlayer(player) {
    const step = player.move();
    const currentPosition = this.getCurrentPosition(player);

    if(!currentPosition) {
      return this.movePlayerError(player, " Unknown currentPosition.");
    }

    let nextPosition;
    try {
      nextPosition = this.getNextPosition(currentPosition, step);
    } catch (e) {
      return this.movePlayerError(player, " Unknown step.");
    }

    let nextRow = this.state.map[nextPosition.rowIndex];
    let nextItem = nextRow && nextRow[nextPosition.cellIndex];

    const moveResult = this.getMoveResult(nextItem);

    player.setMoveResult(moveResult);

    if (moveResult.pass) {
      const nextStateMap = this.state.map.slice();
      nextStateMap[currentPosition.rowIndex][currentPosition.cellIndex] = new Empty();
      nextStateMap[nextPosition.rowIndex][nextPosition.cellIndex] = player;

      return {
        isFinished: moveResult.finish,
        boardMap: nextStateMap,
      };
    }

    return {
      isFinished: moveResult.finish,
    };
  }

  checkPlayer(player) {
    if (!player && !player.move && !player.setMoveResult) {
       throw new Error('Player does not accord to interface.')
    }
  }

  start() {
    const {players} = this.state;
    if (!players || !players.length) {
      return;
    }
    let timer = window.setInterval(() => {
        let isFinished;
        for (let player of players) {
          this.checkPlayer(player);
          const playerMoveResult = this.movePlayer(player);
          this.setState({
            movingInProgress: !Boolean(players.indexOf(player) === (players.length - 1)),
            map: playerMoveResult.boardMap || this.state.map,
          });
          isFinished = playerMoveResult.isFinished;

          if (isFinished) {
            this.stop();
          }
        }
      }, this.state.speed);

      this.setState({
        timer: timer,
        timerColor: 'LawnGreen',
      })
  }

  stop() {
    const {timer} = this.state;
    if (!timer) {
      return;
    }

    window.clearInterval(timer);
    this.setState({
      timer: undefined,
      timerColor: 'orange',
    })
  }

  renderSavedMaps() {
    const savedMapsCollection = LocalStorageHelper.getCollectionItem(LOCAL_STORAGE_MAP_COLLECTION_KEY) || [];
    return savedMapsCollection.map((map, index) => {
        const handleSetCurrentMap = this.handleSetCurrentMap.bind(this, map);
        return (
          <div key={index}>
            <a onClick={handleSetCurrentMap} >
              {map.name}
            </a>
          </div>
        )
      });
  }

  renderPlayButtons() {
    return (
      <div className="play-buttons">
        <button onClick={this.start} >
          Start
        </button>
        <button onClick={this.stop} >
          Stop
        </button>
      </div>
    )
  }

  renderMap() {
    return (
      <BoardMap
        boardMap={this.state.map}
        onCellClick={this.handleCellClick}
        movingInProgress={this.state.movingInProgress}
      />
    );
  }

  renderEditControls() {
    return (
      <div className="edit-controls">
        <div className="edit-control-row">
          <label htmlFor="columnsNumber"> Number of Columns </label>
          <input
            type="number"
            name="columnsNumber"
            data-type="number"
            value={this.state.columnsNumber}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="edit-control-row">
          <label htmlFor="rowsNumber"> Number of Rows </label>
          <input
            type="number"
            name="rowsNumber"
            data-type="number"
            value={this.state.rowsNumber}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="edit-control-row">
          <label htmlFor="speed"> Speed </label>
          <input
            type="number"
            name="speed"
            data-type="number"
            value={this.state.speed}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="edit-control-row">
          <label htmlFor="game_timeout"> Game Timeout (sec)</label>
          <input
            type="number"
            name="game_timeout"
            data-type="number"
            value={this.state.game_timeout}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="edit-controls-buttons">
          <button onClick={this.setMapSize} > Set </button>
          <button onClick={this.handleSaveMap} > Save </button>
          <button
            onClick={this.handleEditMap}
            className={this.state.editMode && 'state-edit-mode'}
          >
            {this.state.editMode && 'OK'}
            {!this.state.editMode && 'Edit'}
          </button>
        </div>
      </div>
    )
  }

  renderControls() {
    return (
      <div className="controls">

        <div>
          {this.renderSavedMaps()}
        </div>

        <div>
          {this.renderEditControls()}
        </div>

      </div>
    );
  }

  render() {
    return (
      <div className="erc-board">

        {this.renderMap()}

        <div className="controls-container">
          <div>
            <PlayersInfo players={this.state.players}/>
            <div className="timer-container">
              <ReactCountdownClock
                seconds={this.state.game_timeout}
                color={this.state.timerColor}
                alpha={0.8}
                size={150}
                onComplete={this.stop}
                paused={Boolean(!this.state.timer || this.state.pause)}
              />
            </div>
            {this.renderPlayButtons()}
          </div>

          {this.renderControls()}

        </div>
      </div>
    );
  }
}

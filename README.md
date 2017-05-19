# Hackathon "Labyrinth"

## Project architecture
 - [create-react-app readme](./docs/create-react-app.md)

## Quick start
 - `npm i`
 - `npm start`

 After browser is opened on `http://localhost:3000` the main board is shown.

To improve map editing process there is introduced visual map editor.
Main functionality: - set size of board - check cell as one of accessible blocks: - border - empty - jewel - put registered players on the board - set movement speed - save / load map configuration

 To enter edit map mode press the button **"Edit"**.
 When endit mode is activated following optins can be performed:
  - Set:
   - Number of Columns
   - Number of Rows
   - Speed
   - Game Timeout (sec)
  - Put new blocks and players on the board:
   - `click` on any cell to put one of existing blocks (repeat until needed item is appeared)
   - `alt + click` put player on board (repeat until needed item is appeared)

 Also Saving / Loading current map (without players) is accessible (currently in localStorage).

## Description
This project is an implementation of simple game which is designed to perform a hackathon in JS department teamplayers.
The game consists in competition of **"TeamPlayers"** implemented by participants of hackathon.

The goal of every **"TeamPlayer"** is to move and find the destination point **"JEWEL"** item before the others. The board will be rounded with wall and there will be many borders inside.

## How to test?
Register your **"TeamPlayer"** class inside `src/players/unit_Player.spec.js` and simply run `npm test`.

## **"TeamPlayer"** class implementation
To implement your **"TeamPlayer"** create a new file with name `TeamPlayer[your-team-number].js` in `src/players/` and write your **magic** code following next interface:


```js
import PlayerBot from '../core/PlayerBot';
import {FORWARD, BACKWARD, RIGHT, LEFT} from '../constants/directions';
import {EMPTY, BORDER, PLAYER, JEWEL, WALL} from '../constants/boardFields';

export default class TeamPlayer extends PlayerBot {
  constructor(id) {
    super(id);
  }

  /**
   * Returns direction in which player makes his move
   * @return {string} (FORWARD, BACKWARD, RIGHT, LEFT)
   */
  move() {
    ...
  }

  /**
   * @param {Object} moveResult result of the move in selected direction
   *  {
   *    pass: {Boolean},
   *    finish: {Boolean},
   *    type: {String} one of map field type (EMPTY, BORDER, PLAYER, JEWEL, WALL)
   *   }
   * @return {void}
   */
  setMoveResult(moveResult) {
    ...
  }

  /**
   * Background color of player-bot e.g.: #a7a7a7
   * @return {string}
   */
  getColor() {
    ...
  }

  /**
   * Path (URL) to an logo image - jpg/png 32x32
   * @return {string}
   */
  getAvatar() {
    ...
  }

  /**
   * Nick name to be displayed in Player info panel
   * @return {string}
   */
  getNickname() {
    ...
  }
}
```

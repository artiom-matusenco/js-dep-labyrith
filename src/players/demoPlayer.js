import PlayerBot from '../core/PlayerBot';
import {FORWARD, BACKWARD, RIGHT, LEFT} from '../constants/directions';
import * as boardFieldType from '../constants/boardFields';

export default class PlayerBoardItem extends PlayerBot {
  constructor(id) {
    super(id);

    this.moveResults = [];
    this.moveResult = {
      pass: false,
      finish: false,
      type: boardFieldType.EMPTY,
    }
    this.previousMove = boardFieldType.EMPTY;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getNextMove() {
    const directions = [FORWARD, BACKWARD, RIGHT, LEFT];
    return directions[this.getRandomInt(0,4)];
  }

  move() {
    const nextMove = this.getNextMove();

    if (this.moveResult.pass) {
      return this.previousMove;
    }

    this.previousMove = nextMove;
    //console.log('player ' + this.id + ' next move: ' + nextMove);
    return nextMove;
  }

  setMoveResult(moveResult) {
    this.moveResults.push(moveResult);
    //console.log('move result: ', moveResult)

    this.moveResult = moveResult;
  }

  getColor() {
    return '#d8ff90';
  }

  getAvatar() {
    return 'avatar.png'
  }

  getNickname() {
    return 'PlayerBot';
  }
}

import PlayerBot from '../core/PlayerBot';
import {FORWARD, BACKWARD, RIGHT, LEFT} from '../constants/directions';
import {EMPTY, BORDER, PLAYER, JEVEL, WALL} from '../constants/boardFields';


class Movement {
  constructor(direction, x, y) {

  }
}

export default class TeamPlayer1 extends PlayerBot {

  constructor(id) {
    super(id);

    this.length = 1;
    this.wide = 1;

    this.currentDirection = FORWARD;
    this.x = 0;
    this.y = 0;

    this.cells = [{
      x: 0,
      y: 0,
      type: EMPTY,
    }];
  }

  /**
   * Returns direction in which player makes his move
   * @return {string} (FORWARD, BACKWARD, RIGHT, LEFT)
   */
  move() {
    const {x, y} = this;


    for (let cell in this.cells) {
      if (cell.x == this.getXY(this.currentDirection).x && cell.y == this.getXY(this.currentDirection).y) {
        if (cell.type != BORDER && cell.type != WALL) {
          this.x = this.getXY(this.currentDirection).x;
          this.y = this.getXY(this.currentDirection).y;

          return this.currentDirection;
        } else {
          this.getNextDirection();
          this.x = this.getXY(this.currentDirection).x;
          this.y = this.getXY(this.currentDirection).y;

          return this.currentDirection;
        }
      }
    }

    // this.getNextDirection();
    this.x = this.getXY(this.currentDirection).x;
    this.y = this.getXY(this.currentDirection).y;

    return this.currentDirection;
  }

  getNextDirection() {
    if (this.currentDirection == FORWARD) {
      this.currentDirection = RIGHT;
    }

    if (this.currentDirection == RIGHT) {
      this.currentDirection = BACKWARD;
    }

    if (this.currentDirection == BACKWARD) {
      this.currentDirection = LEFT;
    }

    if (this.currentDirection == LEFT) {
      this.currentDirection = FORWARD;
    }

debugger;
    return this.currentDirection;
  }


  getXY(direction) {
    if(direction == FORWARD) return {x: this.x, y: this.y + 1};
    if(direction == BACKWARD) return {x: this.x, y: this.y - 1};
    if(direction == RIGHT) return {x: this.x + 1, y: this.y};
    return {x: this.x - 1, y: this.y};
  }

  getMinusXY(direction) {
    if(direction == FORWARD) return {x: this.x, y: this.y - 1};
    if(direction == BACKWARD) return {x: this.x, y: this.y + 1};
    if(direction == RIGHT) return {x: this.x - 1, y: this.y};
    return {x: this.x + 1, y: this.y};
  }

  /**
   * @param {Object} moveResult result of the move in selected direction
   *  {
   *    pass: {Boolean},
   *    finish: {Boolean},
   *    type: {String} one of map field type (EMPTY, BORDER, PLAYER, JEVEL, WALL)
   *   }
   * @return {void}
   */
  setMoveResult(moveResult) {

    let t = moveResult.type;
    if (t == PLAYER) {
      t = EMPTY;
    }

    this.cells.push({
      type: t,
      x: this.x,
      y: this.y
    });

    if (moveResult.type != EMPTY) {
      this.x = this.getMinusXY(this.currentDirection).x;
      this.y = this.getMinusXY(this.currentDirection).y;
    }

  }




  /**
   * Background color of player-bot e.g.: #a7a7a7
   * @return {string}
   */
  getColor() {
    return "#ff8000";
  }

  /**
   * Path (URL) to an logo image - jpg/png 32x32
   * @return {string}
   */
  getAvatar() {
    return "tiger.jpg";
  }

  /**
   * Nick name to be displayed in Player info panel
   * @return {string}
   */
  getNickname() {
    return "Tiger";
  }

}

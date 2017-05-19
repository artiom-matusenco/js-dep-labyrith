import PlayerBot from '../core/PlayerBot';
import { FORWARD, BACKWARD, RIGHT, LEFT } from '../constants/directions';
import { EMPTY, BORDER, PLAYER, JEWEL, WALL } from '../constants/boardFields';

export default class TeamPlayer3 extends PlayerBot {
  constructor(id) {
    super(id);

    this.currentMove = RIGHT;
    this.steps = [RIGHT, FORWARD, LEFT, BACKWARD];
    this.stepIndex = 0;

    /**
     * @param status bool
     */
    this.moveGenerator = (status) => {
      if (!status) {
        this.stepIndex += 1;
        if (this.stepIndex === this.steps.length) {
          this.stepIndex = 0
        }
        this.currentMove = this.steps[this.stepIndex];
      }
    }
  }

  /**
   * Returns direction in which player makes his move
   * @return {string} (FORWARD, BACKWARD, RIGHT, LEFT)
   */
  move() {
    return this.currentMove;
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

    if (moveResult.finish) {
      return;
    }
    // if (moveResult.pass) { }
    switch (moveResult.type) {
      case EMPTY:
      case BORDER:
      case PLAYER:
      case WALL:
        this.moveGenerator(moveResult.pass);
        break;
      // case JEWEL:
    }

  }

  /**
   * Background color of player-bot e.g.: #a7a7a7
   * @return {string}
   */
  getColor() {
    return '#a7a7a7';
  }

  /**
   * Path (URL) to an logo image - jpg/png 32x32
   * @return {string}
   */
  getAvatar() {
    return 'https://www.shareicon.net/data/32x32/2015/12/14/207857_face_300x300.png';
  }

  /**
   * Nick name to be displayed in Player info panel
   * @return {string}
   */
  getNickname() {
    return 'ZeTree';
  }

}

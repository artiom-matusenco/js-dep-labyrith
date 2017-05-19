import PlayerBot from '../core/PlayerBot';
import {FORWARD, BACKWARD, RIGHT, LEFT} from '../constants/directions';
import {EMPTY, BORDER, PLAYER, JEWEL} from '../constants/boardFields';

export default class TeamPlayer1 extends PlayerBot {
  constructor(id) {
    super(id);
  }

  /**
   * Returns direction in which player makes his move
   * @return {string} (FORWARD, BACKWARD, RIGHT, LEFT)
   */
  move() {

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

  }

  /**
   * Background color of player-bot e.g.: #a7a7a7
   * @return {string}
   */
  getColor() {

  }

  /**
   * Path (URL) to an logo image - jpg/png 32x32
   * @return {string}
   */
  getAvatar() {

  }

  /**
   * Nick name to be displayed in Player info panel
   * @return {string}
   */
  getNickname() {

  }

}

import PlayerBot from '../core/PlayerBot';
import {FORWARD, BACKWARD, RIGHT, LEFT} from '../constants/directions';
import {EMPTY, BORDER, PLAYER, JEVEL, WALL} from '../constants/boardFields';
import {Map} from './Map';

export default class TeamPlayer02 extends PlayerBot {
  constructor(id) {
    super(id);

    this.mapInstance = new Map();
  }

  /**
   * Returns direction in which player makes his move
   * @return {string} (FORWARD, BACKWARD, RIGHT, LEFT)
   */
  move() {
    return this.mapInstance.getRecommendedDirection();
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
    if (moveResult.pass) {
      this.mapInstance.markCurrentPointVisited();
      this.mapInstance.moveToLastDirection();
      return;
    }

    switch (moveResult.type) {
      case WALL:
        switch (this.mapInstance.lastDirection) {
          case LEFT:
            this.mapInstance.markXWall(this.mapInstance.x - 1);
            break;

          case RIGHT:
            this.mapInstance.markXWall(this.mapInstance.x + 1);
            break;

          case BACKWARD:
            this.mapInstance.markYWall(this.mapInstance.y - 1);
            break;

          case FORWARD:
            this.mapInstance.markYWall(this.mapInstance.y + 1);
            break;
        }
        break;


      case BORDER:
        switch (this.mapInstance.lastDirection) {
          case LEFT:
            this.mapInstance.markPointUnavailable(this.mapInstance.x - 1, this.mapInstance.y);
            break;

          case RIGHT:
            this.mapInstance.markPointUnavailable(this.mapInstance.x + 1, this.mapInstance.y);
            break;

          case BACKWARD:
            this.mapInstance.markPointUnavailable(this.mapInstance.x, this.mapInstance.y - 1);
            break;

          case FORWARD:
            this.mapInstance.markPointUnavailable(this.mapInstance.x, this.mapInstance.y + 1);
            break;
        }

        break;

      case PLAYER:
        switch (this.mapInstance.lastDirection) {
          case LEFT:
            this.mapInstance.markPointVisited(this.mapInstance.x - 1, this.mapInstance.y);
            break;

          case RIGHT:
            this.mapInstance.markPointVisited(this.mapInstance.x + 1, this.mapInstance.y);
            break;

          case BACKWARD:
            this.mapInstance.markPointVisited(this.mapInstance.x, this.mapInstance.y - 1);
            break;

          case FORWARD:
            this.mapInstance.markPointVisited(this.mapInstance.x, this.mapInstance.y + 1);
            break;
        }

        break;
    }
  }

  /**
   * Background color of player-bot e.g.: #a7a7a7
   * @return {string}
   */
  getColor() {
    return '#a7f7f7';
  }

  /**
   * Path (URL) to an logo image - jpg/png 32x32
   * @return {string}
   */
  getAvatar() {
    return 'http://rs84.pbsrc.com/albums/k17/Flizia/Icons/Skulls/Skull-NB-01-32x32.png~c200';
  }

  /**
   * Nick name to be displayed in Player info panel
   * @return {string}
   */
  getNickname() {
    return 'Racketa';
  }
}

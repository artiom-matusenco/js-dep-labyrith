import {BACKWARD, FORWARD, LEFT, RIGHT} from '../constants/directions';

const GREEN_LIGHT = 0;
const YELLOW_LIGHT = 1;
const RED_LIGHT = 2;


export class Map {
  constructor() {
    this._map = {};
    this._visitedPoints = {};

    this._x = 0;
    this._y = 0;
    this._lastDirection = null;
    this._xWalls = {};
    this._yWalls = {};
  }

  getRecommendedDirection() {
    this._lastDirection = this._getRecommendedDirection();

    return this._lastDirection;
  }

  _getRecommendedDirection() {
    const x = this._x;
    const y = this._y;

    const directions = this.getPointDirections(x, y);
    let minCount = 9999999;
    let minDirection = FORWARD;

    for (let direction in directions) {
      if (this.isWallDirection(direction)) {
        continue;
      }

      if (directions[direction] === GREEN_LIGHT) {
        return direction;
      } else if (directions[direction] === YELLOW_LIGHT) {
        let pointVistedCount;

        switch (direction) {
          case LEFT:
            pointVistedCount = this.getVisitedCount(+this.x - 1, this.y);
            break;

          case RIGHT:
            pointVistedCount = this.getVisitedCount(+this.x + 1, this.y);
            break;

          case BACKWARD:
            pointVistedCount = this.getVisitedCount(this.x, +this.y - 1);
            break;

          case FORWARD:
            pointVistedCount = this.getVisitedCount(this.x, +this.y + 1);
            break;
        }

        if (minCount > pointVistedCount) {
          minCount = pointVistedCount;
          minDirection = direction;
        }
      }
    }

    return minDirection;
  }

  isWallDirection(direction) {
    switch (direction) {
      case FORWARD:
        return this._yWalls[+this._y + 1];
      case BACKWARD:
        return this._yWalls[+this._y - 1];
      case LEFT:
        return this._xWalls[+this._x - 1];
      case RIGHT:
        return this._xWalls[+this._x + 1];
    }
  }

  getVisitedCount(x, y) {
    this._visitedPoints[x] = this._visitedPoints[x] || {};
    this._visitedPoints[x][y] = this._visitedPoints[x][y] || 0;

    return this._visitedPoints[x][y];
  }

  addPointVisit(x, y) {
    this._visitedPoints[x] = this._visitedPoints[x] || {};
    this._visitedPoints[x][y] = this._visitedPoints[x][y] || 0;

    this._visitedPoints[x][y]++;
  }

  _markPoint(x, y, state) {
    this.getPointDirections(+x -1, y)[RIGHT] = state;
    this.getPointDirections(+x + 1,y)[LEFT] = state;
    this.getPointDirections(x, +y + 1)[BACKWARD] = state;
    this.getPointDirections(x, +y - 1)[FORWARD] = state;
  }

  markPointVisited(x, y) {
    this._markPoint(x, y, YELLOW_LIGHT);
    this.addPointVisit(x, y);
  }

  markPointUnavailable(x, y) {
    this._markPoint(x, y, RED_LIGHT);
  }

  getPointDirections(x, y) {
    this._map[x] = this._map[x] || {};
    this._map[x][y] = this._map[x][y] || {
        [FORWARD]: GREEN_LIGHT,
        [LEFT]: GREEN_LIGHT,
        [RIGHT]: GREEN_LIGHT,
        [BACKWARD]: GREEN_LIGHT,
    };

    return this._map[x][y];
  }

  markCurrentPointVisited() {
    this.markPointVisited(this._x, this._y);
  }

  moveToLastDirection() {
    switch(this._lastDirection) {
      case FORWARD:
        this.moveForward();
        break;
      case BACKWARD:
        this.moveBackward();
        break;
      case RIGHT:
        this.moveRight();
        break;
      case LEFT:
        this.moveLeft();
        break;
    }
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get lastDirection() {
    return this._lastDirection;
  }

  markXWall(x) {
    this._xWalls[x] = true;
  }

  markYWall(y) {
    this._yWalls[y] = true;
  }

  moveForward() {
    this._y++;
  }

  moveBackward() {
    this._y--;
  }

  moveLeft() {
    this._x--;
  }

  moveRight() {
    this._x++;
  }
}

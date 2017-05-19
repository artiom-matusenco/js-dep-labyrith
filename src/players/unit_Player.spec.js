//import TeamPlayer from './demoPlayer';
// import there your player to test
import TeamPlayer1 from './PlayerTeam1';
import TeamPlayer2 from './PlayerTeam2';
import TeamPlayer3 from './PlayerTeam3';

import {FORWARD, BACKWARD, RIGHT, LEFT} from '../constants/directions';
import {EMPTY, BORDER, PLAYER, JEWEL} from '../constants/boardFields';


for (let teamPlayer of [TeamPlayer1, TeamPlayer2, TeamPlayer3]) {
  const createPlayer = function(id) {
    return new teamPlayer(id);
  }

describe('PlayerBot', () => {

  describe('required methods', () => {

    it('has method move()', () => {
      const player = createPlayer();
      expect(Boolean(player.move)).toBeTruthy();
    });

    it('method move() returns aproppriate result', () => {
      const player = createPlayer();
      const moveDirection = player.move();
      const expectedResults = [FORWARD, BACKWARD, RIGHT, LEFT];
      expect(expectedResults.includes(moveDirection)).toBeTruthy();
    });

    it('has method setMoveResult()', () => {
      const player = createPlayer();
      expect(Boolean(player.setMoveResult)).toBeTruthy();
    });

    describe('setMoveResult()', () => {
      it('gets EMPTY type of moveResult without crashing', () => {
        const player = createPlayer();
        const moveResult = {
          pass: true,
          finish: false,
          type: EMPTY,
        };
        player.setMoveResult(moveResult);
      });

      it('gets JEWEL type of moveResult without crashing', () => {
        const player = createPlayer();
        const moveResult = {
          pass: true,
          finish: true,
          type: JEWEL,
        };
        player.setMoveResult(moveResult);
      });

      it('gets BORDER type of moveResult without crashing', () => {
        const player = createPlayer();
        const moveResult = {
          pass: false,
          finish: false,
          type: BORDER,
        };
        player.setMoveResult(moveResult);
      });

      it('gets PLAYER type of moveResult without crashing', () => {
        const player = createPlayer();
        const moveResult = {
          pass: false,
          finish: false,
          type: PLAYER,
        };
        player.setMoveResult(moveResult);
      });
    });

    it('has method getColor()', () => {
      const player = createPlayer();
      expect(Boolean(player.getColor)).toBeTruthy();
    });

    it('method getColor() returns Hexadecimal Color Code', () => {
      const player = createPlayer();
      const playerColor = player.getColor();
      const COLOR_PATTERN = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      expect(COLOR_PATTERN.test(playerColor)).toBeTruthy();
    });

    it('has method getAvatar()', () => {
      const player = createPlayer();
      expect(Boolean(player.getAvatar)).toBeTruthy();
    });

    it('method getAvatar() returns url to image', () => {
      const player = createPlayer();
      const playerAvatar = player.getAvatar();
      const URL_PATTERN = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/;
      expect(URL_PATTERN.test(playerAvatar)).toBeTruthy();
    });

    it('has method getNickname()', () => {
      const player = createPlayer();
      expect(Boolean(player.getNickname)).toBeTruthy();
    });

    it('method getNickname() returns allowed string', () => {
      const player = createPlayer();
      const playerNickname = player.getNickname();
      const NICKNAME_PATTERN = /^[^0-9][^@#]+$/;
      expect(NICKNAME_PATTERN.test(playerNickname)).toBeTruthy();
      expect(playerNickname.length && playerNickname.length > 0).toBeTruthy();
    });

  })

  describe('extends PlayerBot (duck-typing check)', () => {

    it('is PLAYER', () => {
      const player = createPlayer();
      expect(player.type).toEqual(PLAYER);
    });

    it('has id', () => {
      const id = "01";
      const player = createPlayer(id);
      expect(player.id).toEqual(id);
    });

  });

});

}

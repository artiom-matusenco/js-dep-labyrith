import React from 'react';

import BoardItem from './BoardItem';
import PlayerItem from '../components/PlayerItem';
import {PLAYER} from '../constants/boardFields';

export default class PlayerBot extends BoardItem {
  constructor(id) {
    super(PLAYER);

    this.id = id;
  }

  getId() {
    return this.id;
  }

  getColor() {
    return 'black';
  }

  getAvatar() {
    return 'avatar.png'
  }

  render() {
    return (
      <PlayerItem
        id={this.id}
        color={this.getColor()}
        avatar={this.getAvatar()}
      />
    );
  }
}

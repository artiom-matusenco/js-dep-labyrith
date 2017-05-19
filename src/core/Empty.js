import React from 'react';

import BoardItem from './BoardItem';
import EmptyItem from '../components/EmptyItem';
import {EMPTY} from '../constants/boardFields';

export default class Empty extends BoardItem {
  constructor() {
    super(EMPTY);
  }

  render() {
    return (
      <EmptyItem />
    );
  }
}

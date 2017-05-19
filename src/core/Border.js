import React from 'react';

import BoardItem from './BoardItem';
import BorderItem from '../components/BorderItem';
import {BORDER} from '../constants/boardFields';

export default class Border extends BoardItem {
  constructor() {
    super(BORDER);
  }

  render() {
    return (
      <BorderItem />
    );
  }
}

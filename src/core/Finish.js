import React from 'react';

import BoardItem from './BoardItem';
import FinishItem from '../components/FinishItem';
import {JEWEL} from '../constants/boardFields';

export default class Finish extends BoardItem {

  constructor() {
    super(JEWEL);
  }

  render() {
    return (
      <FinishItem />
    );
  }
}

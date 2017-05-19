import React from 'react';

import BoardItem from './BoardItem';
import FinishItem from '../components/FinishItem';
import {JEVEL} from '../constants/boardFields';

export default class Finish extends BoardItem {

  constructor() {
    super(JEVEL);
  }

  render() {
    return (
      <FinishItem />
    );
  }
}

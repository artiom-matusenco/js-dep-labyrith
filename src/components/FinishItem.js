import React, { Component } from 'react';

export default class FinishItem extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className={`erc-finish-item item`} />
    );
  }
}

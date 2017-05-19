import React, { Component } from 'react';

export default class EmptyItem extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div
        className={`erc-empty-item item`}
      />
    );
  }
}

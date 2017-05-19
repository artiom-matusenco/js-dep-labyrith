import React, { Component } from 'react';

export default class BorderItem extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="erc-border-item item" />
    );
  }
}

import React, { Component } from 'react';

export default class PlayerItem extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div
        className={`erc-player-item item`}
        style={{
          "backgroundColor": this.props.color,
          "backgroundImage": `url(${this.props.avatar})`,
        }}
      />
    )
  }
}

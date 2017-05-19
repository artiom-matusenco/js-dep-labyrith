import React, { Component } from 'react';

export default class PlayerItem extends Component {

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

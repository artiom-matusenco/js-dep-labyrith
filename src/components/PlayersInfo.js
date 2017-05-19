import React, { Component } from 'react';

export default class PlayersInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  renderPlayerInfo(player) {
    return (
        <div
          className="player-info"
          key={player.id}
        >
          <div
            className="player-avatar"
            style={{
              "backgroundImage": `url(${player.getAvatar()})`,
              "backgroundColor": player.getColor(),
            }}
          />
          <span className="player-id">{player.id}</span>
          <span className="player-nick-name">{player.getNickname()}</span>
        </div>
    )
  }

  renderPlatersInfo() {
    const {players} = this.props;

    return players.map((player) => {
      return this.renderPlayerInfo(player);
    })

  }

  render() {
    return (
      <div className="erc-players-info">
        {this.renderPlatersInfo()}
      </div>
    )
  }
}

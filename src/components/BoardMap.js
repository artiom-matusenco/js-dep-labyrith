import React, {Component} from 'react';

export default class BoardMap extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const boardWasChaned = this.props.boardMap !== nextProps.boardMap && !nextProps.movingInProgress;

    if (boardWasChaned) {
      return true;
    }
    return false;
  }

  handleCellClick(rowNumber, colNumber, event) {
    this.props.onCellClick(rowNumber, colNumber, event);
  }

  renderItem(item) {
    return item.render();
  }

  renderRow(row, rowNumber) {
    return row.map((item, index) => {
      const colNumber = index;
      const handleCellClick = this.handleCellClick.bind(this, rowNumber, colNumber);
      return (
        <div
          key={index}
          className="cell"
          onClick={handleCellClick}
        >
          {this.renderItem(item)}
        </div>
        );
    })
  }

  render() {
    const {boardMap} = this.props;

    return (
      <div className="map-container" >
        {boardMap.map((row, index) => {
          return (
            <div className="map-row" key={index} >
              {this.renderRow(row, index)}
            </div>
          );
        })}
      </div>
    )
  }
}

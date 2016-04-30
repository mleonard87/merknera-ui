/* @flow */
import React, { PropTypes } from 'react';

export class GameDetailHeader extends React.Component {
  // props: Props;
  static propTypes = {
    game: PropTypes.object.isRequired,
    lastMove: PropTypes.object.isRequired,
  };

  render () {
    let headerText;
    if (this.props.game.status === 'COMPLETE') {
      if (this.props.lastMove.winner) {
        headerText = `Winner: ${this.props.lastMove.gameBot.bot.name}`;
      } else {
        headerText = 'Draw';
      }
    } else {
      headerText = 'In Progress';
    }

    return (
      <h1>{headerText}</h1>
    );
  }
}

export default GameDetailHeader;

/* @flow */
import React, { PropTypes } from 'react';

export class BotWinPercent extends React.Component {
  // props: Props;
  static propTypes = {
    currentScore: PropTypes.number.isRequired,
    gamesPlayed: PropTypes.number.isRequired,
    className: PropTypes.string,
  };

  render () {
    let pctStr;
    if (this.props.gamesPlayed > 0) {
      pctStr = `${this.props.currentScore}%`;
    } else {
      pctStr = '-';
    }

    if (this.props.className) {
      return (
        <span className={this.props.className}>{pctStr}</span>
      );
    } else {
      return (
        <span>{pctStr}</span>
      );
    }
  }
}

export default BotWinPercent;

/* @flow */
import React, { PropTypes } from 'react';

export class BotWinPercent extends React.Component {
  // props: Props;
  static propTypes = {
    gamesPlayed: PropTypes.number.isRequired,
    gamesWon: PropTypes.number.isRequired,
    className: PropTypes.string.isRequired,
  };

  render () {
    const gamesPlayed = this.props.gamesPlayed;
    const gamesWon = this.props.gamesWon;
    let pct = (gamesWon / gamesPlayed) * 100;
    let pctStr;
    if (isNaN(pct)) {
      pctStr = '-';
    } else {
      let roundedPct = Math.round(pct * 100) / 100;
      pctStr = `${roundedPct}%`;
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

/* @flow */
import React, { PropTypes } from 'react';
import styles from './ScrabbleBoard.scss';

export class ScrabbleBoardSquare extends React.Component {
  static propTypes = {
    letterScore: PropTypes.number.isRequired,
    wordScore: PropTypes.number.isRequired,
    start: PropTypes.bool.isRequired,
    playedLetter: PropTypes.string.isRequired,
    previousPlayedLetter: PropTypes.string.isRequired,
  };

  render () {
    const numberToTuple = (n, suffix) => {
      switch (n) {
        case 1: return '';
        case 2: return `D${suffix}`;
        case 3: return `T${suffix}`;
        case 4: return `Q${suffix}`;
        default: return `${n}x ${suffix}`;
      }
    };

    const lsTuple = (n) => {
      return numberToTuple(n, 'L');
    };

    const wsTuple = (n) => {
      return numberToTuple(n, 'W');
    };

    const getClassName = (letterScore, wordScore, start, playedLetter) => {
      if (letterScore > 1) {
        switch (letterScore) {
          case 2: return styles.square2LS;
          case 3: return styles.square3LS;
          case 4: return styles.square4LS;
          default: return styles.squareXLS;
        }
      }

      if (wordScore > 1) {
        switch (wordScore) {
          case 2: return styles.square2WS;
          case 3: return styles.square3WS;
          case 4: return styles.square4WS;
          default: return styles.squareXWS;
        }
      }

      if (start) {
        return styles.squareStart;
      }

      return styles.square;
    };

    const getTile = (playedLetter, previousPlayedLetter) => {
      if (playedLetter !== '') {
        let className;
        if (playedLetter === previousPlayedLetter) {
          className = styles.tile;
        } else {
          className = styles.tileNew;
        }

        return (
          <div className={className}>
            {playedLetter}
          </div>
        );
      }

      return null;
    };

    let {
      letterScore, wordScore, start, playedLetter, previousPlayedLetter
    } = this.props;

    return (
      <div className={getClassName(letterScore, wordScore, start, playedLetter)}>
        {lsTuple(letterScore)}
        {wsTuple(wordScore)}
        {getTile(playedLetter, previousPlayedLetter)}
      </div>
    );
  }
}

export default ScrabbleBoardSquare;

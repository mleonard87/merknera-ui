/* @flow */
import React, { PropTypes } from 'react';
import styles from './TicTacToeBoard.scss';

export class TicTacToeBoardSquare extends React.Component {
  // props: Props;
  static propTypes = {
    mark: PropTypes.array.isRequired,
    latestMove: PropTypes.bool.isRequired,
  };

  render () {
    let content;
    if (this.props.mark === '') {
      content = ' ';
    } else {
      content = this.props.mark;
    }

    let squareClassNames = styles.square;
    if (this.props.latestMove) {
      squareClassNames = styles.latestMove;
    }

    let markClassNames;
    if (this.props.mark === 'X') {
      markClassNames = styles.markX;
    } else {
      markClassNames = styles.markO;
    }

    return (
      <div className={squareClassNames}>
        <span className={markClassNames}>
          {content}
        </span>
      </div>
    );
  }
}

export default TicTacToeBoardSquare;

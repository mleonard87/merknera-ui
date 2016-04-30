/* @flow */
import React, { PropTypes } from 'react';
import TicTacToeBoardSquare from './TicTacToeBoardSquare';
import styles from './TicTacToeBoard.scss';

export class TicTacToeBoard extends React.Component {
  // props: Props;
  static propTypes = {
    currentGameState: PropTypes.array.isRequired,
    previousGameState: PropTypes.array.isRequired,
  };

  render () {
    const currentGameState = this.props.currentGameState;
    let previousGameState;
    if (this.props.previousGameState === undefined) {
      previousGameState = ['', '', '', '', '', '', '', '', ''];
    } else {
      previousGameState = this.props.previousGameState;
    }

    let newMoveIdx;
    for (var i = 0; i < currentGameState.length; i++) {
      if (currentGameState[i] !== previousGameState[i]) {
        newMoveIdx = i;
      }
    }

    return (
      <div>
        <div className={styles.row}>
          <TicTacToeBoardSquare
            mark={currentGameState[0]}
            latestMove={newMoveIdx === 0}
            />
          <TicTacToeBoardSquare
            mark={currentGameState[1]}
            latestMove={newMoveIdx === 1}
            />
          <TicTacToeBoardSquare
            mark={currentGameState[2]}
            latestMove={newMoveIdx === 2}
            />
        </div>
        <div className={styles.row}>
          <TicTacToeBoardSquare
            mark={currentGameState[3]}
            latestMove={newMoveIdx === 3}
            />
          <TicTacToeBoardSquare
            mark={currentGameState[4]}
            latestMove={newMoveIdx === 4}
            />
          <TicTacToeBoardSquare
            mark={currentGameState[5]}
            latestMove={newMoveIdx === 5}
            />
        </div>
        <div className={styles.row}>
          <TicTacToeBoardSquare
            mark={currentGameState[6]}
            latestMove={newMoveIdx === 6}
            />
          <TicTacToeBoardSquare
            mark={currentGameState[7]}
            latestMove={newMoveIdx === 7}
            />
          <TicTacToeBoardSquare
            mark={currentGameState[8]}
            latestMove={newMoveIdx === 8}
            />
        </div>
      </div>
    );
  }
}

export default TicTacToeBoard;

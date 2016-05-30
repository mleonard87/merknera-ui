/* @flow */
import React, { PropTypes } from 'react';
import ScrabbleBoardSquare from './ScrabbleBoardSquare';
import Loading from './Loading';
import styles from './ScrabbleBoard.scss';

export class ScrabbleBoard extends React.Component {
  constructor () {
    super();
    this.state = {};
  }
  // props: Props;
  static propTypes = {
    boardMetadataUrl: PropTypes.string.isRequired,
    currentGameState: PropTypes.array.isRequired,
    previousGameState: PropTypes.array.isRequired,
  };

  componentWillMount = () => {
    fetch(this.props.boardMetadataUrl)
    .then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({
        boardMetadata: json,
      });
    });
  };

  render () {
    if (!this.state.boardMetadata) {
      return (
        <Loading />
      );
    }

    return (
      <div className={styles.board}>
        {this.state.boardMetadata.map((row, i) => {
          return (
            <div className={styles.row}>
              {row.map((col, j) => {
                return (
                  <ScrabbleBoardSquare
                    letterScore={col.LS}
                    wordScore={col.WS}
                    start={col.start}
                    playedLetter={this.props.currentGameState[i][j]}
                    previousPlayedLetter={this.props.previousGameState[i][j]}
                    />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ScrabbleBoard;

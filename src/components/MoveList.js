/* @flow */
import React, { PropTypes } from 'react';
import MoveListRow from './MoveListRow';
import styles from './MoveList.scss';

export class MoveList extends React.Component {
  // props: Props;
  static propTypes = {
    moves: PropTypes.array.isRequired,
    moveOnClick: PropTypes.func.isRequired,
    highlightMoveIndex: PropTypes.number.isRequired,
  };

  render () {
    return (
      <table>
        <tbody>
          {
            this.props.moves.map((m, i) => {
              return (
                <MoveListRow
                  moveIndex={i}
                  content={m.gameBot.bot.name}
                  moveOnClick={this.props.moveOnClick}
                  highlight={parseInt(this.props.highlightMoveIndex) === parseInt(i)}
                  />
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

export default MoveList;

/* @flow */
import React, { PropTypes } from 'react';
import styles from './MoveList.scss';

export class MoveListRow extends React.Component {
  // props: Props;
  static propTypes = {
    moveIndex: PropTypes.number.isRequired,
    moveOnClick: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    highlight: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
  };

  render () {
    let moveClassName;
    if (this.props.highlight) {
      moveClassName = styles.moveHighlighted;
    } else {
      moveClassName = styles.move;
    }

    let awaitingMessage = '';
    if (this.props.status === 'AWAITING') {
      awaitingMessage = <span className={styles.awaitingIndicator}>(Awaiting Play)</span>;
      moveClassName = `${moveClassName} ${styles.awaiting}`
    }

    return (
      <tr
        className={moveClassName}
        onClick={() => {this.props.moveOnClick(this.props.moveIndex)}}
        >
        <td className={styles.moveNumberColumn}>
          {this.props.moveIndex + 1}
        </td>
        <td>
          <div className={styles.moveContent}>{this.props.content}{awaitingMessage}</div>
        </td>
      </tr>
    );
  }
}

export default MoveListRow;

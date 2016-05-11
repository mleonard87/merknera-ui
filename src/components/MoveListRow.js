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
    startDateTime: PropTypes.string.isRequired,
    endDateTime: PropTypes.string.isRequired,
  };

  render () {
    let moveClassName;
    if (this.props.highlight) {
      moveClassName = styles.moveHighlighted;
    } else {
      moveClassName = styles.move;
    }

    let awaitingMessage = '';
    let duration = '-';
    if (this.props.status === 'AWAITING') {
      awaitingMessage = <span className={styles.awaitingIndicator}>(Awaiting Play)</span>;
      moveClassName = `${moveClassName} ${styles.awaiting}`;
    } else {
      const startDateTime = new Date(this.props.startDateTime);
      const endDateTime = new Date(this.props.endDateTime);
      duration = (endDateTime - startDateTime) / 1000;
      duration = `${duration}s`;
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
        <td className={styles.timingColumn}>
          {duration}
        </td>
      </tr>
    );
  }
}

export default MoveListRow;

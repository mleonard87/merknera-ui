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
  };

  render () {
    let moveClassName;
    if (this.props.highlight) {
      moveClassName = styles.moveHighlighted;
    } else {
      moveClassName = styles.move;
    }

    return (
      <tr
        className={moveClassName}
        onClick={() => {this.props.moveOnClick(this.props.moveIndex)}}
        >
        <td>
          {this.props.moveIndex + 1}
        </td>
        <td>
          <div className={styles.moveContent}>{this.props.content}</div>
        </td>
      </tr>
    );
  }
}

export default MoveListRow;

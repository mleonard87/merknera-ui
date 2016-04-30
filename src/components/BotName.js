/* @flow */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './BotName.scss';

export class BotName extends React.Component {
  // props: Props;
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  };

  render () {
    return (
      <div>
        <Link to={`/bots/${this.props.id}`}>
          {this.props.name}
        </Link>
        <span className={styles.version}>
          ({this.props.version})
        </span>
      </div>
    );
  }
}

export default BotName;

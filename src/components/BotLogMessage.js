/* @flow */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedDate, FormattedTime } from 'react-intl';
import styles from './BotLogMessage.scss';

export class BotLogMessage extends React.Component {
  // props: Props;
  static propTypes = {
    message: PropTypes.string.isRequired,
    datetime: PropTypes.string.isRequired,
  };

  render () {
    const message = this.props.message;

    const gameIdIdx = message.indexOf('gameId');
    let logText;
    if (gameIdIdx > 0) {
      const prefix = message.substring(0, gameIdIdx);
      const gameIdText = message.match(/gameId: [0-9]*/g)[0];
      const gameId = gameIdText.match(/[0-9]+/g)[0];
      const suffix = message.substring(gameIdIdx + gameIdText.length);

      logText = (
        <span>
          {prefix}<Link to={`/games/${gameId}`} className={styles.gameLink}>{gameIdText}</Link>{suffix}
        </span>
      );
    } else {
      logText = (
        <span>
          {message}
        </span>
      );
    }

    return (
      <div className={styles.logMessage}>
        [<FormattedDate
          value={this.props.datetime}
          format='log'
          />
        {' '}
        <FormattedTime
          value={this.props.datetime}
          format='log'
          />]
        {' '}
        {logText}
      </div>
    );
  }
}

export default BotLogMessage;

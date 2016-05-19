/* @flow */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import BotName from './BotName';
import BotWinPercent from 'components/BotWinPercent';
import Loading from './Loading';
import { FormattedDate, FormattedTime } from 'react-intl';
import styles from './UserBotList.scss';

export class UserBotList extends React.Component {
  // props: Props;
  static propTypes = {
    bots: PropTypes.array.isRequired,
    handleDeleteBot: PropTypes.func.isRequired,
  };

  handleDeleteBot = (e, botId, botName) => {
    e.preventDefault();
    this.props.handleDeleteBot(botId, botName);
  };

  render () {
    if (!this.props.bots) {
      return (
        <Loading />
      );
    }

    const getOnlineStatus = (bot) => {
      if (bot.status === 'ONLINE') {
        return 'Online Now';
      } else {
        const lastOnline = new Date(bot.lastOnlineDatetime).toLocaleString();
        return (
          <span>
            <FormattedDate
              value={lastOnline}
              format='short'
              />
            {' '}
            <FormattedTime
              value={lastOnline}
              />
          </span>
        );
      }
    };

    const bots = () => {
      const sortedBots = this.props.bots.sort((a, b) => {
        let scoreDiff = b.currentScore - a.currentScore;

        if (scoreDiff === 0) {
          scoreDiff = b.gamesPlayed - a.gamesPlayed;
          if (scoreDiff === 0) {
            return a.name - b.name;
          } else {
            return scoreDiff;
          }
        } else {
          return scoreDiff;
        }
      });

      return (
        <tbody>
          {
            sortedBots.map((b) => {
              return (
                <tr key={b.botId}>
                  <td>
                    <BotName
                      botId={b.botId}
                      name={b.name}
                      version={b.version}
                      />
                  </td>
                  <td>{b.gameType.name}</td>
                  <td>{b.gamesPlayed}</td>
                  <td>
                    <BotWinPercent
                      currentScore={b.currentScore}
                      gamesPlayed={b.gamesPlayed}
                      />
                  </td>
                  <td>{getOnlineStatus(b)}</td>
                  <td>
                    <Link
                      to={`/bots/${b.botId}/logs`}
                      className={styles.actionLink}
                      >
                      View Logs
                    </Link>
                    <a
                      href='#'
                      onClick={(e) => { this.handleDeleteBot(e, b.botId, b.name) }}
                      className={styles.actionLink}
                      >
                      Delete Bot
                    </a>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      );
    };

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Game Type</th>
            <th>Games Played</th>
            <th>Score</th>
            <th>Last Online</th>
            <th>Options</th>
          </tr>
        </thead>
        {bots()}
      </table>
    );
  }
}

export default UserBotList;

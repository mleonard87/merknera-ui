/* @flow */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import BotName from 'components/BotName';
import Loading from 'components/Loading';
import styles from './GameList.scss';

export class GameList extends React.Component {
  // props: Props;
  static propTypes = {
    contextBot: PropTypes.object,
    games: PropTypes.array.isRequired,
  };

  render () {
    if (!this.props.games) {
      return (
        <Loading />
      );
    }

    const getPlayers = (players) => {
      return (
        <ul className={styles.playerList}>
          {
            players.map((p) => {
              if (this.props.contextBot && p.bot.botId === this.props.contextBot.botId) {
                return null;
              }

              return (
                <li>
                  <BotName
                    botId={p.bot.botId}
                    name={p.bot.name}
                    version={p.bot.version}
                    />
                </li>
              );
            })
          }
        </ul>
      );
    };

    const getWinner = (game) => {
      if (game.winningMove) {
        return (
          <span>{game.winningMove.gameBot.bot.name}</span>
        );
      } else {
        return null;
      }
    };

    let playersHeading = 'Players';
    if (this.props.contextBot) {
      playersHeading = 'Opponent';
    }

    const games = () => {
      return (
        <tbody>
          {
            this.props.games.map((g) => {
              return (
                <tr>
                  <td>{getPlayers(g.players)}</td>
                  <td>{g.status}</td>
                  <td>{getWinner(g)}</td>
                  <td><Link to={`/games/${g.gameId}`}>View Game</Link></td>
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
            <th>{playersHeading}</th>
            <th>Status</th>
            <th>Winner</th>
            <th>Options</th>
          </tr>
        </thead>
        {games()}
      </table>
    );
  }
}

export default GameList;

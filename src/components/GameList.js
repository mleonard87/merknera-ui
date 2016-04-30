/* @flow */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import BotName from 'components/BotName';

export class GameList extends React.Component {
  // props: Props;
  static propTypes = {
    games: PropTypes.array.isRequired,
  };

  render () {
    const getPlayers = (players) => {
      return (
        <ul>
          {
            players.map((p) => {
              return (
                <li>
                  <BotName
                    id={p.bot.id}
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

    const games = () => {
      if (this.props.games) {
        return (
          <tbody>
            {
              this.props.games.map((g) => {
                return (
                  <tr>
                    <td>{getPlayers(g.players)}</td>
                    <td>{g.status}</td>
                    <td>{getWinner(g)}</td>
                    <td><Link to={`/games/${g.id}`}>View</Link></td>
                  </tr>
                );
              })
            }
          </tbody>
        );
      } else {
        return (
          <span>Loading...</span>
        );
      }
    };

    return (
      <table>
        <thead>
          <tr>
            <th>Players</th>
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

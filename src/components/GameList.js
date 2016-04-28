/* @flow */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

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
                <li>{p.bot.name}</li>
              );
            })
          }
        </ul>
      );
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
            <th>Options</th>
          </tr>
        </thead>
        {games()}
      </table>
    );
  }
}

export default GameList;

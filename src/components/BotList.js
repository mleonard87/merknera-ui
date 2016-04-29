/* @flow */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export class BotList extends React.Component {
  // props: Props;
  static propTypes = {
    bots: PropTypes.array.isRequired,
  };

  render () {
    const calculateWinPercent = (gamesPlayed, gamesWon) => {
      let pct = (gamesWon / gamesPlayed) * 100;
      if (isNaN(pct)) {
        return '-';
      } else {
        let roundedPct = Math.round(pct * 100) / 100;
        return `${roundedPct}%`;
      }
    };

    const bots = () => {
      if (this.props.bots) {
        return (
          <tbody>
            {
              this.props.bots.map((b) => {
                return (
                  <tr>
                    <td>
                      <Link to={`/bots/${b.id}`}>{b.name}</Link> ({b.version})
                    </td>
                    <td>{b.status}</td>
                    <td>{b.gameType.name}</td>
                    <td>{b.gamesPlayed}</td>
                    <td>{b.gamesWon}</td>
                    <td>{calculateWinPercent(b.gamesPlayed, b.gamesWon)}</td>
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
            <th>Name</th>
            <th>Status</th>
            <th>Game Type</th>
            <th>Games Played</th>
            <th>Games Won</th>
            <th>Win Percent</th>
          </tr>
        </thead>
        {bots()}
      </table>
    );
  }
}

export default BotList;

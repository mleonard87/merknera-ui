/* @flow */
import React, { PropTypes } from 'react';
import BotName from './BotName';
import BotWinPercent from './BotWinPercent';

export class BotList extends React.Component {
  // props: Props;
  static propTypes = {
    bots: PropTypes.array.isRequired,
  };

  render () {
    const bots = () => {
      if (this.props.bots) {
        return (
          <tbody>
            {
              this.props.bots.map((b) => {
                return (
                  <tr>
                    <td>
                      <BotName
                        id={b.id}
                        name={b.name}
                        version={b.version}
                        status={b.status}
                        />
                    </td>
                    <td>{b.status}</td>
                    <td>{b.gameType.name}</td>
                    <td>{b.gamesPlayed}</td>
                    <td>{b.gamesWon}</td>
                    <td>
                      <BotWinPercent
                        gamesPlayed={b.gamesPlayed}
                        gamesWon={b.gamesWon}
                        />
                    </td>
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

/* @flow */
import React, { PropTypes } from 'react';
import BotName from './BotName';
import BotWinPercent from './BotWinPercent';
import Loading from './Loading';

export class BotList extends React.Component {
  // props: Props;
  static propTypes = {
    bots: PropTypes.array.isRequired,
  };

  render () {
    if (!this.props.bots) {
      return (
        <Loading />
      );
    }

    const bots = () => {
      return (
        <tbody>
          {
            this.props.bots.map((b) => {
              return (
                <tr key={b.id}>
                  <td>
                    <BotName
                      id={b.id}
                      name={b.name}
                      version={b.version}
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

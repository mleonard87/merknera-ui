/* @flow */
import React, { PropTypes } from 'react';
import Loading from 'components/Loading';
// import styles from './UserTokenList.scss';

export class UserTokenList extends React.Component {
  // props: Props;
  static propTypes = {
    tokens: PropTypes.array,
    revokeOnClick: PropTypes.func.isRequired,
  };

  handleRevokeOnClick = (e, tokenId) => {
    e.preventDefault();
    this.props.revokeOnClick(tokenId);
  };

  render () {
    if (!this.props.tokens) {
      return (
        <Loading />
      );
    }

    const tokens = () => {
      return (
        <tbody>
          {
            this.props.tokens.map((t) => {
              return (
                <tr key={t.id}>
                  <td>{t.description}</td>
                  <td>
                    <a href='#'
                      onClick={(e) => this.handleRevokeOnClick(e, t.id)}
                      >
                    Revoke
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
            <th>Description</th>
            <th>Options</th>
          </tr>
        </thead>
        {tokens()}
      </table>
    );
  }
}

export default UserTokenList;

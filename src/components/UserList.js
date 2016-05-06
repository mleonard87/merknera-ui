/* @flow */
import React, { PropTypes } from 'react';
import Loading from 'components/Loading';
import styles from './UserList.scss';

export class UserList extends React.Component {
  // props: Props;
  static propTypes = {
    users: PropTypes.array.isRequired,
  };

  render () {
    if (!this.props.users) {
      return (
        <Loading />
      );
    }

    const users = () => {
      return (
        <tbody>
          {
            this.props.users.map((u) => {
              return (
                <tr className={styles.userRow}>
                  <td>
                    <img src={u.imageUrl} className={styles.profileImage} />
                  </td>
                  <td>{u.name}</td>
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
            <th className={styles.profileImageColumn}></th>
            <th>Name</th>
          </tr>
        </thead>
        {users()}
      </table>
    );
  }
}

export default UserList;

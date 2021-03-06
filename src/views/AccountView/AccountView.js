/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './AccountView.scss';

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
// type Props = {};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AccountView extends React.Component {
  // props: Props;
  static propTypes = {
    loggedInUser: PropTypes.object,
  };

  render () {
    if (!this.props.loggedInUser) {
      return (
        <h1>Please Login</h1>
      );
    }

    return (
      <div>
        <h1>Account Information</h1>
        <p className={styles.accountText}>
          Account information is managed via your Google account. Your email address is not shared with anyone else.
        </p>

        <p className={styles.accountText}>
          <label className={styles.label}>Name:</label> {this.props.loggedInUser.name}
        </p>
        <p className={styles.accountText}>
          <label className={styles.label}>Email:</label> {this.props.loggedInUser.email}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedInUser: state.loggedInUser,
});

export default connect(mapStateToProps)(AccountView);

/* @flow */
import React, { PropTypes } from 'react';
import GoogleIcon from './google_icon.png';
import styles from '../containers/SignInMenu.scss';

export class SignedOutMenu extends React.Component {
  // props: Props;
  static propTypes = {
    handleOnClickSignIn: PropTypes.func.isRequired,
  };

  handleOnClickGoogleSignIn = () => {
    this.props.handleOnClickSignIn();
  };

  render () {
    return (
      <ul className={styles.userMenuList}>
        <li onClick={this.handleOnClickGoogleSignIn}>
          <div className={styles.googleSignInButton}>
            <img
              className={styles.googleIcon}
              src={GoogleIcon}
              alt='This is the Google logo.' />
            Sign In with Google
          </div>
        </li>
      </ul>
    );
  }
}

export default SignedOutMenu;

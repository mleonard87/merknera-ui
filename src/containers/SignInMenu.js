/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getLoggedInUser, clearLoggedInUser } from '../redux/modules/currentuser';
import SignedInMenu from 'components/SignedInMenu';
import SignedOutMenu from 'components/SignedOutMenu';
import styles from './SignInMenu.scss';

export class SignInMenu extends React.Component {
  // props: Props;
  static propTypes = {
    loggedInUser: PropTypes.object,
    getLoggedInUser: PropTypes.func.isRequired,
    clearLoggedInUser: PropTypes.func.isRequired,
  };

  constructor () {
    super();
    this.state = {
      showUserMenu: false,
    };
  }

  componentDidMount = () => {
    let gapi = window['gapi'];
    // This is pretty rubbish. Not sure the best way to wait for this resource
    // to load. Maybe it can be done with promises?
    while (gapi === undefined) {
      gapi = window['gapi'];
    }

    const authenticateWithMerknera = this.authenticateWithMerknera;

    gapi.load('auth2', function () {
      gapi.auth2.init();

      const au = gapi.auth2.getAuthInstance();
      au.isSignedIn.listen((signedIn) => {
        if (signedIn) {
          const idToken = au.currentUser.get().getAuthResponse().id_token;
          authenticateWithMerknera(idToken);
        }
      });
    });
  }

  handleOnClick = () => {
    if (this.state.showUserMenu) {
      this.setState({
        showUserMenu: false,
      });
    } else {
      this.setState({
        showUserMenu: true,
      });
    }
  };

  handleOnMouseLeave = () => {
    this.setState({
      showUserMenu: false,
    });
  };

  authenticateWithMerknera = (idToken) => {
    let options;
    options = {
      method: 'get',
      credentials: 'include',
    };

    fetch(`http://localhost:8080/login?id_token=${idToken}`, options)
    .then((response) => {
      return response.text();
    }).then((resText) => {
      if (resText !== 'OK') {
        console.log('Did not login.');
      } else {
        this.props.getLoggedInUser();
      }
    }).catch(function (ex) {
      console.log(ex);
    });
  };

  handleOnClickGoogleSignIn = () => {
    this.setState({
      showUserMenu: false,
    });
    const gapi = window['gapi'];
    const au = gapi.auth2.getAuthInstance();
    au.signIn({
      'scope': 'profile email',
    }).then((googleUser) => {
      const idToken = googleUser.getAuthResponse().id_token;
      this.authenticateWithMerknera(idToken);
    });
  };

  handleOnClickGoogleSignOut = () => {
    const gapi = window['gapi'];
    const au = gapi.auth2.getAuthInstance();
    au.signOut().then(() => {
      let options;
      options = {
        method: 'get',
        credentials: 'include',
      };

      fetch('http://localhost:8080/logout', options)
      .then((response) => {
        return response.text();
      }).then((resText) => {
        if (resText !== 'OK') {
          console.log('Did not logout.');
        } else {
          this.props.clearLoggedInUser();
        }
      }).catch(function (ex) {
        console.log(ex);
      });
    });
  }

  render () {
    const userMenuContent = () => {
      if (this.props.loggedInUser !== null) {
        return (
          <SignedInMenu handleOnClickSignOut={this.handleOnClickGoogleSignOut} />
        );
      } else {
        return (
          <SignedOutMenu handleOnClickSignIn={this.handleOnClickGoogleSignIn} />
        );
      }
    };

    let userMenu;
    if (this.state.showUserMenu) {
      userMenu = (
        <div className={styles.userMenuDropDown}>
          {userMenuContent()}
        </div>
      );
    } else {
      userMenu = null;
    }

    let menuHeading = 'Sign In';
    if (this.props.loggedInUser !== null) {
      menuHeading = this.props.loggedInUser.name;
    }

    return (
      <div
        className={styles.userMenu}
        onClick={this.handleOnClick}
        onMouseLeave={this.handleOnMouseLeave}
        >
        {menuHeading}
        {userMenu}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedInUser: state.loggedInUser,
});

export default connect(mapStateToProps, {
  getLoggedInUser: () => getLoggedInUser(),
  clearLoggedInUser: () => clearLoggedInUser(),
})(SignInMenu);

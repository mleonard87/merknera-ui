/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getLoggedInUserTokenList,
  clearLoggedInUserTokenList,
  generateUserToken,
  clearUserToken,
  revokeUserToken,
} from '../../redux/modules/currentuser';
import UserTokenList from 'components/UserTokenList';
import UserTokenNew from 'components/UserTokenNew';
import Loading from 'components/Loading';
import styles from './AccountTokensView.scss';

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
export class AccountTokensView extends React.Component {
  // props: Props;
  static propTypes = {
    getLoggedInUserTokenList: PropTypes.func.isRequired,
    clearLoggedInUserTokenList: PropTypes.func.isRequired,
    generateUserToken: PropTypes.func.isRequired,
    clearUserToken: PropTypes.func.isRequired,
    revokeUserToken: PropTypes.func.isRequired,
    loggedInUser: PropTypes.object,
  };

  componentDidMount = () => {
    if (this.props.loggedInUser) {
      this.props.getLoggedInUserTokenList();
    }
  }

  componentWillUnmount = () => {
    this.props.clearLoggedInUserTokenList();
  }

  componentWillReceiveProps = (nextProps) => {
    if (!nextProps.loggedInUser.tokens) {
      console.log(this.props.loggedInUser);
      this.props.getLoggedInUserTokenList();
    }
  }

  handleGenerateOnClick = (description) => {
    this.props.generateUserToken(description);
  }

  handleNewOnClick = (description) => {
    this.props.clearUserToken();
  }

  handleRevokeOnClick = (id) => {
    this.props.revokeUserToken(id);
  }

  render () {
    if (!this.props.loggedInUser) {
      return (
        <h1>Please Login</h1>
      );
    }

    let latestToken;
    if (this.props.loggedInUser && this.props.loggedInUser.tokens) {
      latestToken = this.props.loggedInUser.tokens.find((t) => {
        if (t.token) {
          return true;
        }
      });
    }

    if (!latestToken) {
      latestToken = {token: null};
    }

    let apiTokens;
    if (!this.props.loggedInUser && !this.props.loggedInUser.tokens) {
      apiTokens = (
        <Loading />
      );
    } else {
      apiTokens = (
        <div>
          <p className={styles.accountText}>
            Tokens should not be shared with any one else - these are used to
            authenticate and associate your bot to your account. Please do not
            commit then to version control systems.
          </p>
          <p className={styles.accountText}>
            It is recommended that you generate one token per bot.
          </p>
          <p className={styles.accountText}>
            Once a token has been created it cannot be viewed again.
            If you have lost a token please revoke the token and generate
            a new one.
          </p>
          <h3 className={styles.tokenSubHeading}>New Token</h3>
          <UserTokenNew
            generateToken={this.handleGenerateOnClick}
            latestToken={latestToken.token}
            newToken={this.handleNewOnClick}
            />
          <h3 className={styles.tokenSubHeading}>Existing Tokens</h3>
          <UserTokenList
            tokens={this.props.loggedInUser.tokens}
            revokeOnClick={this.handleRevokeOnClick}
            />
        </div>
        );
    }

    return (
      <div>
        <h1>API Tokens</h1>
        {apiTokens}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedInUser: state.loggedInUser,
});

const mapDisptachToProps = (dispatch) => {
  return {
    getLoggedInUserTokenList: bindActionCreators(getLoggedInUserTokenList, dispatch),
    clearLoggedInUserTokenList: bindActionCreators(clearLoggedInUserTokenList, dispatch),
    generateUserToken: bindActionCreators(generateUserToken, dispatch),
    clearUserToken: bindActionCreators(clearUserToken, dispatch),
    revokeUserToken: bindActionCreators(revokeUserToken, dispatch),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(AccountTokensView);

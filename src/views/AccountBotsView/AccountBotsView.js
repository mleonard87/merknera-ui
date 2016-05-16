/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBots } from '../../redux/modules/currentuser';
import UserBotList from 'components/UserBotList';
import styles from './AccountBotsView.scss';

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
export class AccountBotsView extends React.Component {
  // props: Props;
  static propTypes = {
    getBots: PropTypes.func.isRequired,
    loggedInUser: PropTypes.object,
  };

  componentDidMount = () => {
    if (this.props.loggedInUser !== null) {
      this.props.getBots(this.props.loggedInUser.userId);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.loggedInUser === null && nextProps.loggedInUser !== null) {
      this.props.getBots(nextProps.loggedInUser.userId);
    };
  }

  render () {
    if (!this.props.loggedInUser) {
      return (
        <h1>Please Login</h1>
      );
    }

    return (
      <div>
        <h1>My Bots</h1>
        <UserBotList
          bots={this.props.loggedInUser.bots}
          />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedInUser: state.loggedInUser,
});

const mapDisptachToProps = (dispatch) => {
  return {
    getBots: bindActionCreators(getBots, dispatch),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(AccountBotsView);

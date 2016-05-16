/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as botActions } from '../../redux/modules/bots';
import Loading from 'components/Loading';
import styles from './BotLogsView.scss';

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
export class BotLogsView extends React.Component {
  // props: Props;
  static propTypes = {
    botActions: PropTypes.object.isRequired,
    currentBot: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    loggedInUser: PropTypes.object,
  };

  componentWillReceiveProps = (nextProps) => {
    if (this.props.params.id !== nextProps.params.id) {
      this.props.botActions.clearBotDetail();
      this.props.botActions.getBotDetail(nextProps.params.id);
    }

    if (!this.props.currentBot && nextProps.currentBot) {
      this.props.botActions.listBotLogs(nextProps.currentBot.botId);
    }
  }

  componentDidMount = () => {
    this.props.botActions.getBotDetail(this.props.params.id);
  }

  componentWillUnmount = () => {
    this.props.botActions.clearBotDetail();
  }

  render () {
    let bot = this.props.currentBot;

    if (!this.props.loggedInUser) {
      return (
        <h1>Please Login</h1>
      );
    }

    if (!this.props.currentBot) {
      return <Loading />;
    }

    if (this.props.currentBot.user.userId !== this.props.loggedInUser.userId) {
      return (<span>You may only view logs for your own bots.</span>);
    }

    if (!this.props.currentBot.logs) {
      return (<span>No logs.</span>);
    }

    const logs = this.props.currentBot.logs.map((l) => {
      const dateStamp = l.createdDatetime.replace(/[TZ]/g, ' ').trim();
      return (
        <div className={styles.logMessage}>
          [{dateStamp}] {l.message}
        </div>
      );
    });

    return (
      <div>
        <h1 className={styles.botHeading}>
          {bot.name} Logs
          {' '}
          <span className={styles.titleVersion}>({bot.version})</span>
        </h1>
        <div className={styles.logContainer}>
          {logs}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currentBot: state.bots.currentBot,
  loggedInUser: state.loggedInUser,
});

const mapDisptachToProps = (dispatch) => {
  return {
    botActions: bindActionCreators(botActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(BotLogsView);

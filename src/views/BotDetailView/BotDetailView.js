/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as botActions } from '../../redux/modules/bots';
import GameList from 'components/GameList';
import BotWebsiteLink from 'components/BotWebsiteLink';
import BotWinPercent from 'components/BotWinPercent';
import Loading from 'components/Loading';
import styles from './BotDetailView.scss';
// import GameList from 'components/GameList';

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
export class BotDetailView extends React.Component {
  // props: Props;
  static propTypes = {
    botActions: PropTypes.object.isRequired,
    currentBot: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  };

  componentWillReceiveProps = (nextProps) => {
    if (this.props.params.id !== nextProps.params.id) {
      this.props.botActions.clearBotDetail();
      this.props.botActions.getBotDetail(nextProps.params.id);
      this.props.botActions.listGamesForBot(nextProps.params.id);
    }
  }

  componentDidMount = () => {
    this.props.botActions.getBotDetail(this.props.params.id);
    this.props.botActions.listGamesForBot(this.props.params.id);
  }

  componentWillUnmount = () => {
    this.props.botActions.clearBotDetail();
  }

  render () {
    if (this.props.currentBot === undefined) {
      return (<span>Loading...</span>);
    }

    let bot = this.props.currentBot;
    const gamesPlayed = bot.gamesPlayed;
    const gamesWon = bot.gamesWon;
    const gamesDrawn = bot.gamesDrawn;
    const currentScore = bot.currentScore;

    const renderGamesList = () => {
      if (bot.games) {
        return (
          <GameList
            games={bot.games}
            contextBot={bot}
            />
        );
      } else {
        return (
          <Loading />
        );
      }
    };

    return (
      <div>
        <div className={styles.headingContainer}>
          <h1 className={styles.botHeading}>{bot.name} <span className={styles.titleVersion}>({bot.version})</span></h1>
          <div className={styles.playContainer}>
            <h1>
              <BotWinPercent
                currentScore={currentScore}
                gamesPlayed={gamesPlayed}
                />
            </h1>
            <div className={styles.playSummary}>
              Played: {gamesPlayed}, Won: {gamesWon}, Drawn: {gamesDrawn}
            </div>
          </div>
        </div>
        <div className={styles.subHeadingContainer}>
          by {bot.user.name}, written in {bot.programmingLanguage}
        </div>
        <p className={styles.description}>{bot.description}</p>

        <BotWebsiteLink website={bot.website} />

        <div className={styles.gamesContainer}>
          <h2>Games</h2>
          {renderGamesList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentBot: state.bots.currentBot,
});

const mapDisptachToProps = (dispatch) => {
  return {
    botActions: bindActionCreators(botActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(BotDetailView);

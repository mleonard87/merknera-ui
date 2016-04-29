/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as botActions } from '../../redux/modules/bots';
import GameList from 'components/GameList';
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
    return (
      <div>
        <h1>{bot.name}</h1>
        <p>{bot.description}</p>
        <p>{bot.programmingLanguage}</p>
        <p><a href={`${bot.website}`} target='_blank'>{bot.website}</a></p>

        <br />
        <br />

        <GameList games={bot.gamesPlayed} />
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

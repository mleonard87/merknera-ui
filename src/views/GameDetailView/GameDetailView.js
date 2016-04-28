/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as gameActions } from '../../redux/modules/games';
import styles from './GameDetailView.scss';
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
export class GameDetailView extends React.Component {
  constructor () {
    super();
    this.state = {
      currentlyDisplayedMove: 0,
    };
  }
  // props: Props;
  static propTypes = {
    gameActions: PropTypes.object.isRequired,
    currentGame: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  };

  componentDidMount = () => {
    this.props.gameActions.getGameDetail(this.props.params.id);
  }

  componentWillUnmount = () => {
    this.props.gameActions.clearGameDetail();
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      ...this.state,
      currentlyDisplayedMove: nextProps.currentGame.moves.length - 1,
    });
  }

  handleSliderOnChange = (e) => {
    this.setState({
      ...this.state,
      currentlyDisplayedMove: e.target.value,
    });
  }

  render () {
    if (!this.props.currentGame) {
      return (<span>Loading...</span>);
    }

    const renderBoard = () => {
      let gs = this.props.currentGame.moves[this.state.currentlyDisplayedMove].gameState;
      gs = eval(gs);
      return (
        <div className={styles.board}>
          <div>
            <span>{gs[0]}&nbsp;</span>
            <span>{gs[1]}&nbsp;</span>
            <span>{gs[2]}&nbsp;</span>
          </div>
          <div>
            <span>{gs[3]}&nbsp;</span>
            <span>{gs[4]}&nbsp;</span>
            <span>{gs[5]}&nbsp;</span>
          </div>
          <div>
            <span>{gs[6]}&nbsp;</span>
            <span>{gs[7]}&nbsp;</span>
            <span>{gs[8]}&nbsp;</span>
          </div>
        </div>
      );
    };

    const renderMoveList = () => {
      return this.props.currentGame.moves.map((m, i) => {
        if (parseInt(i) === parseInt(this.state.currentlyDisplayedMove)) {
          return (
            <div>{i}: {m.gameBot.bot.name} &lt;---</div>
          );
        } else {
          return (
            <div>{i}: {m.gameBot.bot.name}</div>
          );
        }
      });
    };

    const winner = this.props.currentGame.moves[this.props.currentGame.moves.length - 1].gameBot.bot.name;

    return (
      <div>
        <br />
        <br />

        <h1>Winner: {winner}</h1>

        <br />
        <br />

        {renderBoard()}

        <br />
        <br />

        <input
          id='move-slider'
          type='range'
          min='0'
          max={this.props.currentGame.moves.length - 1}
          step='1'
          onChange={this.handleSliderOnChange}
          value={this.state.currentlyDisplayedMove}
          />

        <br />
        <br />

        {renderMoveList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentGame: state.games.currentGame,
});

const mapDisptachToProps = (dispatch) => {
  return {
    gameActions: bindActionCreators(gameActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(GameDetailView);

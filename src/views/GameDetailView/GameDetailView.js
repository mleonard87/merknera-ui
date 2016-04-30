/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as gameActions } from '../../redux/modules/games';
import TicTacToeBoard from 'components/TicTacToeBoard';
import MoveList from 'components/MoveList';
import GameDetailHeader from 'components/GameDetailHeader';
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

  handleMoveOnClick = (moveIdx) => {
    this.setState({
      ...this.state,
      currentlyDisplayedMove: moveIdx,
    });
  }

  render () {
    if (!this.props.currentGame) {
      return (<span>Loading...</span>);
    }

    const lastMove = this.props.currentGame.moves[this.props.currentGame.moves.length - 1];

    const currentGameState = this.props.currentGame.moves[this.state.currentlyDisplayedMove].gameState;
    const previousMove = this.props.currentGame.moves[this.state.currentlyDisplayedMove - 1];
    let previousGameState;
    if (previousMove === undefined) {
      previousGameState = undefined;
    } else {
      previousGameState = previousMove.gameState;
    }

    return (
      <div>
        <GameDetailHeader
          game={this.props.currentGame}
          lastMove={lastMove}
          />
        <div className={styles.boardContainer}>
          <TicTacToeBoard
            currentGameState={currentGameState}
            previousGameState={previousGameState}
            />
        </div>
        <div className={styles.movesContainer}>
          <h3>Moves</h3>
          <p className={styles.helpText}>
            Adjust the slider or click on a move to view that move on the board.
          </p>
          <input
            type='range'
            className={styles.movesSlider}
            min='0'
            max={this.props.currentGame.moves.length - 1}
            step='1'
            onChange={this.handleSliderOnChange}
            value={this.state.currentlyDisplayedMove}
            />
          <MoveList
            moves={this.props.currentGame.moves}
            moveOnClick={this.handleMoveOnClick}
            highlightMoveIndex={this.state.currentlyDisplayedMove}
            />
        </div>
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

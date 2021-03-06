import { edgesToArray } from 'redux/utils/relay';
/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const LIST_GAMES_FETCH = 'LIST_GAMES_FETCH';
export const LIST_GAMES_FETCH_SUCCESS = 'LIST_GAMES_FETCH_SUCCESS';
export const GAME_DETAIL_FETCH = 'GAME_DETAIL_FETCH';
export const GAME_DETAIL_FETCH_SUCCESS = 'GAME_DETAIL_FETCH_SUCCESS';
export const GAME_DETAIL_CLEAR = 'GAME_DETAIL_CLEAR';

// ------------------------------------
// Actions
// ------------------------------------
// NOTE: "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
// DOUBLE NOTE: there is currently a bug with babel-eslint where a `space-infix-ops` error is
// incorrectly thrown when using arrow functions, hence the oddity.
export function listGames (): Action {
  return {
    type: LIST_GAMES_FETCH,
    meta: {
      graphql: {
        query: `
        {
          games {
            edges {
              node {
                gameId,
                gameType {
                  name
                },
                players {
                  bot {
                    botId,
                    name,
                    version
                  }
                },
                winningMove {
                  gameBot {
                    bot {
                      name
                    }
                  }
                },
                status
              }
            }
          }
        }
        `,
        success: listGamesSuccess,
      },
    },
  };
}

export function listGamesSuccess (response): Action {
  return {
    type: LIST_GAMES_FETCH_SUCCESS,
    payload: {
      games: edgesToArray(response.games.edges),
    },
  };
}

export const getGameDetail = (gameId) => {
  return {
    type: GAME_DETAIL_FETCH,
    meta: {
      graphql: {
        query: `
          query getGame ($gameId: Int!) {
            game(gameId: $gameId) {
              gameId,
              gameType {
                name
              },
              players {
                bot {
                  botId,
                  name,
                  version
                }
              },
              status,
              moves {
                id,
                gameBot {
                  id,
                  bot {
                    name
                  }
                },
                gameState,
                winner,
                status,
                startDateTime,
                endDateTime
              }
            }
          }
        `,
        variables: `{
          "gameId": "${gameId}"
        }`,
        success: getGameDetailSuccess,
      },
    },
  };
};

export function getGameDetailSuccess (response): Action {
  const newMoves = response.game.moves.map((m) => {
    return {
      ...m,
      gameState: eval(m.gameState),
    };
  });

  return {
    type: GAME_DETAIL_FETCH_SUCCESS,
    payload: {
      game: {
        ...response.game,
        moves: newMoves,
      },
    },
  };
}

export function clearGameDetail (): Action {
  return {
    type: GAME_DETAIL_CLEAR,
  };
}

export const actions = {
  listGames,
  getGameDetail,
  clearGameDetail,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LIST_GAMES_FETCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      gamesList: action.payload.games
    };
  },
  [GAME_DETAIL_FETCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      currentGame: action.payload.game
    };
  },
  [GAME_DETAIL_CLEAR]: (state, action) => {
    let newState = {
      ...state
    };

    delete newState.currentGame;

    return newState;
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0;
export default function gamesReducer (state: number = initialState, action: Action): number {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

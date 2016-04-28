/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const LIST_GAMES_FETCH = 'LIST_GAMES_FETCH';
export const LIST_GAMES_FETCH_SUCCESS = 'LIST_GAMES_FETCH_SUCCESS';
export const GAME_DETAIL_FETCH = 'GAME_DETAIL_FETCH';
export const GAME_DETAIL_FETCH_SUCCESS = 'GAME_DETAIL_FETCH_SUCCESS';

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
      query: `
      {
        gameList {
          id,
          gameType {
            name
          },
          players {
            bot {
              name
            }
          },
        }
      }
      `,
      success: listGamesSuccess,
    }
  };
}

export function listGamesSuccess (response): Action {
  return {
    type: LIST_GAMES_FETCH_SUCCESS,
    payload: {
      games: response.gameList,
    },
  };
}

export const getGameDetail = (gameId) => {
  console.log('game id: ' + gameId);
  return {
    type: GAME_DETAIL_FETCH,
    meta: {
      query: `
        query getGame ($gameId: Int!) {
          game(id: $gameId) {
            id,
            gameType {
              name
            },
            players {
              bot {
                name
              }
            },
            moves {
              id,
              gameBot {
                id,
                bot {
                  name
                }
              },
              gameState
            }
            status
          }
        }
      `,
      variables: `{
        "gameId": "${gameId}"
      }`,
      success: getGameDetailSuccess,
    }
  };
}

export function getGameDetailSuccess (response): Action {
  console.log(response);
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
        move: newMoves,
      },
    },
  };
}

export const actions = {
  listGames,
  getGameDetail,
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
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0;
export default function counterReducer (state: number = initialState, action: Action): number {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

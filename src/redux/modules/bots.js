/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const LIST_BOTS_FETCH = 'LIST_BOTS_FETCH';
export const LIST_BOTS_FETCH_SUCCESS = 'LIST_BOTS_FETCH_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
// NOTE: "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
// DOUBLE NOTE: there is currently a bug with babel-eslint where a `space-infix-ops` error is
// incorrectly thrown when using arrow functions, hence the oddity.
export function listBots (): Action {
  return {
    type: LIST_BOTS_FETCH,
    meta: {
      query: `
      {
        botList {
      		id,
          name,
          user {
            username
          },
          gameType {
            name
          },
          gamesPlayed,
          gamesWon
        },
      }
      `,
      success: listBotsSuccess,
    }
  };
}

export function listBotsSuccess (response): Action {
  return {
    type: LIST_BOTS_FETCH_SUCCESS,
    payload: {
      bots: response.botList,
    },
  };
}

export const actions = {
  listBots,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LIST_BOTS_FETCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      botsList: action.payload.bots
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

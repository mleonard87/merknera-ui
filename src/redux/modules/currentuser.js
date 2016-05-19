import { edgesToArray } from 'redux/utils/relay';
/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const GET_LOGGED_IN_USER_FETCH = 'GET_LOGGED_IN_USER_FETCH_FETCH';
export const GET_LOGGED_IN_USER_FETCH_SUCCESS = 'GET_LOGGED_IN_USER_FETCH_SUCCESS';
export const GET_LOGGED_IN_USER_TOKEN_LIST_FETCH = 'GET_LOGGED_IN_USER_TOKEN_LIST_FETCH_FETCH';
export const GET_LOGGED_IN_USER_TOKEN_LIST_FETCH_SUCCESS = 'GET_LOGGED_IN_USER_TOKEN_LIST_FETCH_SUCCESS';
export const CLEAR_LOGGED_IN_USER = 'CLEAR_LOGGED_IN_USER';
export const CLEAR_LOGGED_IN_USER_TOKEN_LIST = 'CLEAR_LOGGED_IN_USER_TOKEN_LIST';
export const GENERATE_TOKEN_FETCH = 'GENERATE_TOKEN_FETCH';
export const GENERATE_TOKEN_FETCH_SUCCESS = 'GENERATE_TOKEN_FETCH_SUCCESS';
export const REVOKE_TOKEN_FETCH = 'REVOKE_TOKEN_FETCH';
export const REVOKE_TOKEN_FETCH_SUCCESS = 'REVOKE_TOKEN_FETCH_SUCCESS';
export const CLEAR_TOKEN = 'CLEAR_TOKEN';
export const GET_BOTS_FETCH = 'GET_BOTS_FETCH';
export const GET_BOTS_FETCH_SUCCESS = 'GET_BOTS_FETCH_SUCCESS';
export const DELETE_BOT_FETCH = 'DELETE_BOT_FETCH';
export const DELETE_BOT_FETCH_SUCCESS = 'DELETE_BOT_FETCH_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
// NOTE: "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
// DOUBLE NOTE: there is currently a bug with babel-eslint where a `space-infix-ops` error is
// incorrectly thrown when using arrow functions, hence the oddity.
export function getLoggedInUser (): Action {
  return {
    type: GET_LOGGED_IN_USER_FETCH,
    meta: {
      graphql: {
        query: `
        {
          currentUser {
            userId,
            name,
            email,
            imageUrl
          }
        }
        `,
        success: getLoggedInUserSuccess,
      },
    },
  };
}

export function getLoggedInUserSuccess (response): Action {
  return {
    type: GET_LOGGED_IN_USER_FETCH_SUCCESS,
    payload: {
      user: response.currentUser,
    },
  };
}

export function clearLoggedInUser (): Action {
  return {
    type: CLEAR_LOGGED_IN_USER,
  };
}

export function getLoggedInUserTokenList (): Action {
  return {
    type: GET_LOGGED_IN_USER_TOKEN_LIST_FETCH,
    meta: {
      graphql: {
        query: `
        {
          currentUser {
            tokenList {
              id,
              description
            }
          }
        }
        `,
        success: getLoggedInUserTokenListSuccess,
      },
    },
  };
}

export function getLoggedInUserTokenListSuccess (response): Action {
  return {
    type: GET_LOGGED_IN_USER_TOKEN_LIST_FETCH_SUCCESS,
    payload: {
      tokens: response.currentUser.tokenList,
    },
  };
}

export function clearLoggedInUserTokenList (): Action {
  return {
    type: CLEAR_LOGGED_IN_USER_TOKEN_LIST,
  };
}

export function generateUserToken (description): Action {
  return {
    type: GENERATE_TOKEN_FETCH,
    meta: {
      graphql: {
        query: `
        mutation generateUserToken($description: String!) {
          generateToken(description: $description) {
            id
          , token
          , description
          }
        }
        `,
        variables: `{
          "description": "${description}"
        }`,
        success: generateUserTokenSuccess,
      },
    },
  };
}

export function generateUserTokenSuccess (response): Action {
  return {
    type: GENERATE_TOKEN_FETCH_SUCCESS,
    payload: {
      token: response.generateToken,
    },
  };
}

export function revokeUserToken (tokenId): Action {
  return {
    type: REVOKE_TOKEN_FETCH,
    meta: {
      graphql: {
        query: `
        mutation revokeUserToken($id: Int!) {
          revokeToken(id: $id)
        }
        `,
        variables: `{
          "id": ${tokenId}
        }`,
        success: revokeUserTokenSuccess,
      },
    },
  };
}

export function revokeUserTokenSuccess (response): Action {
  return {
    type: REVOKE_TOKEN_FETCH_SUCCESS,
    payload: {
      revokedTokenId: response.revokeToken,
    },
  };
}

export function clearUserToken (response): Action {
  return {
    type: CLEAR_TOKEN,
  };
}

export function getBots (userId): Action {
  return {
    type: GET_BOTS_FETCH,
    meta: {
      graphql: {
        query: `
        query getUserBots($userId: Int!) {
          bots(userId: $userId) {
            edges {
              node {
                botId,
                name,
                version,
                gameType {
                  name
                },
                gamesPlayed,
                currentScore,
                lastOnlineDatetime
              }
            }
          }
        }
        `,
        variables: `{
          "userId": ${userId}
        }`,
        success: getBotsSuccess,
      },
    },
  };
}

export function getBotsSuccess (response): Action {
  return {
    type: GET_BOTS_FETCH_SUCCESS,
    payload: {
      bots: edgesToArray(response.bots.edges),
    },
  };
}

export function deleteBot (botId): Action {
  return {
    type: DELETE_BOT_FETCH,
    meta: {
      graphql: {
        query: `
        mutation deleteBot($botId: Int!) {
          deleteBot(botId: $botId)
        }
        `,
        variables: `{
          "botId": "${botId}"
        }`,
        success: deleteBotSuccess,
      },
    },
  };
}

export function deleteBotSuccess (response): Action {
  return {
    type: DELETE_BOT_FETCH_SUCCESS,
    payload: {
      deletedBotId: response.deleteBot,
    },
  };
}

export const actions = {
  getLoggedInUser,
  clearLoggedInUser,
  getLoggedInUserTokenList,
  clearLoggedInUserTokenList,
  generateUserToken,
  clearUserToken,
  revokeUserToken,
  getBots,
  deleteBot,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_LOGGED_IN_USER_FETCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      ...action.payload.user,
    };
  },
  [GET_LOGGED_IN_USER_TOKEN_LIST_FETCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      tokens: action.payload.tokens,
    };
  },
  [CLEAR_LOGGED_IN_USER]: (state, action) => {
    return null;
  },
  [CLEAR_LOGGED_IN_USER_TOKEN_LIST]: (state, action) => {
    let newState = {
      ...state,
    };

    delete newState['tokens'];
    return newState;
  },
  [GENERATE_TOKEN_FETCH_SUCCESS]: (state, action) => {
    let newTokens = [];

    state.tokens.forEach((t) => {
      let newToken = {
        ...t
      };

      delete newToken['token'];

      newTokens.push(newToken);
    });

    newTokens.push(action.payload.token);

    return {
      ...state,
      tokens: newTokens,
    };
  },
  [CLEAR_TOKEN]: (state, action) => {
    let newTokens = [];

    state.tokens.forEach((t) => {
      let newToken = {
        ...t
      };

      delete newToken['token'];

      newTokens.push(newToken);
    });

    return {
      ...state,
      tokens: newTokens,
    };
  },
  [REVOKE_TOKEN_FETCH_SUCCESS]: (state, action) => {
    let newTokens = [];

    state.tokens.forEach((t) => {
      if (t.id !== action.payload.revokedTokenId) {
        let newToken = {
          ...t
        };

        newTokens.push(newToken);
      }
    });

    return {
      ...state,
      tokens: newTokens,
    };
  },
  [GET_BOTS_FETCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      bots: action.payload.bots
    };
  },
  [DELETE_BOT_FETCH_SUCCESS]: (state, action) => {
    let newBots = [];

    state.bots.forEach((b) => {
      if (b.botId !== action.payload.deletedBotId) {
        let newBot = {
          ...b
        };

        newBots.push(newBot);
      }
    });

    return {
      ...state,
      bots: newBots,
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;
export default function currentUserReducer (state: number = initialState, action: Action): number {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

import { edgesToArray } from 'redux/utils/relay';
/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const LIST_BOTS_FETCH = 'LIST_BOTS_FETCH';
export const LIST_BOTS_FETCH_SUCCESS = 'LIST_BOTS_FETCH_SUCCESS';
export const GET_BOT_DETAIL_FETCH = 'GET_BOT_DETAIL_FETCH';
export const GET_BOT_DETAIL_FETCH_SUCCESS = 'GET_BOT_DETAIL_FETCH_SUCCESS';
export const LIST_GAMES_FOR_BOT_FETCH = 'LIST_GAMES_FOR_BOT_FETCH';
export const LIST_GAMES_FOR_BOT_FETCH_SUCCESS = 'LIST_GAMES_FOR_BOT_FETCH_SUCCESS';
export const BOT_DETAIL_CLEAR = 'BOT_DETAIL_CLEAR';
export const LIST_BOT_LOGS_FETCH = 'LIST_BOT_LOGS_FETCH';
export const LIST_BOT_LOGS_FETCH_SUCCESS = 'LIST_BOT_LOGS_FETCH_SUCCESS';

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
      graphql: {
        query: `
        {
          bots {
            edges {
              node {
            		botId,
                name,
                version,
                user {
                  userId,
                  name
                },
                gameType {
                  name
                },
                gamesPlayed,
                currentScore,
                status,
                lastOnlineDatetime
              }
            }
          },
        }
        `,
        success: listBotsSuccess,
      },
    },
  };
}

export function listBotsSuccess (response): Action {
  return {
    type: LIST_BOTS_FETCH_SUCCESS,
    payload: {
      bots: edgesToArray(response.bots.edges),
    },
  };
}

export function getBotDetail (botId): Action {
  return {
    type: GET_BOT_DETAIL_FETCH,
    meta: {
      graphql: {
        query: `
        query getBot($botId: Int!) {
          bot(botId: $botId) {
            botId,
            name,
            gamesWon,
            version,
            programmingLanguage,
            gameType {
              name
            },
            website,
            description,
            gamesPlayed,
            gamesWon,
            gamesDrawn,
            currentScore,
            user {
              userId,
              name
            }
          }
        }
        `,
        variables: `{
          "botId": "${botId}"
        }`,
        success: getBotDetailSuccess,
      },
    },
  };
}

export function getBotDetailSuccess (response): Action {
  return {
    type: GET_BOT_DETAIL_FETCH_SUCCESS,
    payload: {
      bot: response.bot,
    },
  };
}

export function listGamesForBot (botId): Action {
  return {
    type: LIST_GAMES_FOR_BOT_FETCH,
    meta: {
      graphql: {
        query: `
        query getGamesForBot($botId: Int!) {
          games(botId: $botId) {
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
                    version,
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
        variables: `{
          "botId": "${botId}"
        }`,
        success: listGamesForBotSuccess,
      },
    },
  };
}

export function listGamesForBotSuccess (response): Action {
  return {
    type: LIST_GAMES_FOR_BOT_FETCH_SUCCESS,
    payload: {
      games: edgesToArray(response.games.edges),
    },
  };
}

export function clearBotDetail (): Action {
  return {
    type: BOT_DETAIL_CLEAR,
  };
}

export function listBotLogs (botId): Action {
  return {
    type: LIST_BOT_LOGS_FETCH,
    meta: {
      graphql: {
        query: `
        query listBotLogs($botId: Int!) {
          bot(botId: $botId) {
            logs {
              message
              createdDatetime
            }
          }
        }
        `,
        variables: `{
          "botId": "${botId}"
        }`,
        success: listBotLogsSuccess,
      },
    },
  };
}

export function listBotLogsSuccess (response): Action {
  return {
    type: LIST_BOT_LOGS_FETCH_SUCCESS,
    payload: {
      logs: response.bot.logs,
    },
  };
}

export const actions = {
  listBots,
  getBotDetail,
  listGamesForBot,
  clearBotDetail,
  listBotLogs,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LIST_BOTS_FETCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      botsList: action.payload.bots,
    };
  },
  [LIST_GAMES_FOR_BOT_FETCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      currentBot: {
        ...state.currentBot,
        games: action.payload.games
      },
    };
  },
  [GET_BOT_DETAIL_FETCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      currentBot: {
        ...state.currentBot,
        ...action.payload.bot,
      },
    };
  },
  [BOT_DETAIL_CLEAR]: (state, action) => {
    let newState = {
      ...state
    };

    delete newState.currentBot;

    return newState;
  },
  [LIST_BOT_LOGS_FETCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      currentBot: {
        ...state.currentBot,
        logs: action.payload.logs,
      },
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0;
export default function botReducer (state: number = initialState, action: Action): number {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

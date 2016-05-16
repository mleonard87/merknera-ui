import { edgesToArray } from 'redux/utils/relay';
/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const LIST_USERS_FETCH = 'LIST_USERS_FETCH';
export const LIST_USERS_FETCH_SUCCESS = 'LIST_USERS_FETCH_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
// NOTE: "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
// DOUBLE NOTE: there is currently a bug with babel-eslint where a `space-infix-ops` error is
// incorrectly thrown when using arrow functions, hence the oddity.
export function listUsers (): Action {
  return {
    type: LIST_USERS_FETCH,
    meta: {
      graphql: {
        query: `
        {
          users {
            edges {
              node {
                userId,
                name,
                imageUrl
              }
            }
          }
        }
        `,
        success: listUsersSuccess,
      },
    },
  };
}

export function listUsersSuccess (response): Action {
  return {
    type: LIST_USERS_FETCH_SUCCESS,
    payload: {
      users: edgesToArray(response.users.edges),
    },
  };
}

export const actions = {
  listUsers,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LIST_USERS_FETCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      usersList: action.payload.users
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0;
export default function usersReducer (state: number = initialState, action: Action): number {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

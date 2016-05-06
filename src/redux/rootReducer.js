import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import bots from './modules/bots';
import games from './modules/games';
import users from './modules/users';
import currentuser from './modules/currentuser';

export default combineReducers({
  bots,
  games,
  users,
  router,
  loggedInUser: currentuser,
});

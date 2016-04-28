import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import bots from './modules/bots';
import games from './modules/games';

export default combineReducers({
  bots,
  games,
  router
});

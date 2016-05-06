import React from 'react';
import { Route, IndexRoute } from 'react-router';

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import HomeView from 'views/HomeView/HomeView';
import BotsView from 'views/BotsView/BotsView';
import BotDetailView from 'views/BotDetailView/BotDetailView';
import GamesView from 'views/GamesView/GamesView';
import GameDetailView from 'views/GameDetailView/GameDetailView';
import UsersView from 'views/UsersView/UsersView';
import AccountView from 'views/AccountView/AccountView';

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='/bots' component={BotsView} />
    <Route path='/bots/:id' component={BotDetailView} />
    <Route path='/games' component={GamesView} />
    <Route path='/games/:id' component={GameDetailView} />
    <Route path='/users' component={UsersView} />
    <Route path='/account' component={AccountView} />
  </Route>
);

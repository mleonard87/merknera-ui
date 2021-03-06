import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { IntlProvider } from 'react-intl';

export default class Root extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired,
    store: PropTypes.object.isRequired
  };

  get content () {
    return (
      <Router history={this.props.history}>
        {this.props.routes}
      </Router>
    );
  }

  get devTools () {
    if (__DEBUG__) {
      if (__DEBUG_NEW_WINDOW__) {
        if (!window.devToolsExtension) {
          require('../redux/utils/createDevToolsWindow').default(this.props.store);
        } else {
          window.devToolsExtension.open();
        }
      } else if (!window.devToolsExtension) {
        const DevTools = require('containers/DevTools').default;
        return <DevTools />;
      }
    }
  }

  render () {
    const formats = {
      'date': {
        'short': {
          'day': 'numeric',
          'month': 'short',
          'year': 'numeric'
        },
        'log': {
          'day': '2-digit',
          'month': '2-digit',
          'year': 'numeric'
        }
      },
      'time': {
        'log': {
          'hour': '2-digit',
          'minute': '2-digit',
          'hour12': false,
        }
      },
    };
    return (
      <IntlProvider locale='en-AU' formats={formats}>
        <Provider store={this.props.store}>
          <div style={{ height: '100%' }}>
            {this.content}
            {this.devTools}
          </div>
        </Provider>
      </IntlProvider>
    );
  }
}

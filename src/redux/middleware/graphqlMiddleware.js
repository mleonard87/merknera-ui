const graphqlMiddleware = store => next => action => {
  next(action);

  if (action.meta && action.meta.graphql) {
    let options;

    let graphqlUrl = __GRAPHQL_URL__;

    options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        query: action.meta.graphql.query,
        variables: action.meta.graphql.variables,
      }),
    };
    fetch(graphqlUrl, options)
    .then(function (response) {
      return response.json();
    }).then(function (json) {
      if (json.status === 'error') {
        if (action.meta.graphql.error) {
          var errorResult = action.meta.graphql.error(json, action.payload);
          // Check to see if the result has a type attribute, if it does then
          // assume its a Redux action and dispatch it.
          if (errorResult && errorResult.type) {
            next(errorResult);
          }
        }
        return;
      }
      if (action.meta.graphql.success) {
        var successResult = action.meta.graphql.success(json.data, action.payload);
        // Check to see if the result has a type attribute, if it does then
        // assume its a Redux action and dispatch it.
        if (successResult && successResult.type) {
          next(successResult);
        }
      }
    }).catch(function (ex) {
      console.log('parsing failed', ex);
    });
    console.log('fetching: ' + action.meta.graphql.query);
  }
};

export { graphqlMiddleware as graphqlMiddleware };

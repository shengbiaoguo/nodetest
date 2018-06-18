import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Application from './Application.jsx';

class Root extends Component {

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Application} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root;

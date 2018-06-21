import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './reducers/store';

import { fetchchits } from './actions/chitActions';
import { fetchUsers } from './actions/userActions';
import Main from './screens/Main';

class App extends Component {
  componentWillMount = () => {
    store.dispatch(fetchchits());
    store.dispatch(fetchUsers());
  };

  render() {
    return (
      <Provider store={store}>
        <div>
          <Main />
        </div>
      </Provider>
    );
  }
}

export default App;

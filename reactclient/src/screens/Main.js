import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';

import Home from './Home';
import Chit from './Chit';
import User from './User';
import UserDetails from '../components/UserDetails';
import ChitDetails from '../components/ChitDetails';

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Manage your ledger...</h1>
          <ul className="header">
            <li>
              <NavLink activeStyle={{ color: '#99ff99' }} to="/home">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={{ color: '#99ff99' }} to="/chit">
                Chits
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={{ color: '#99ff99' }} to="/user">
                Users
              </NavLink>
            </li>
          </ul>
          <div>
            <Route path="/home" component={Home} />
            <Route exact path="/chit" component={Chit} />
            <Route exact path="/user" component={User} />
            <Route path="/chit/chitdetails" component={ChitDetails} />
            <Route path="/user/userdetails" component={UserDetails} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;

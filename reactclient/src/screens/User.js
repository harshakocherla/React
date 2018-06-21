import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UserTable from '../components/UserTable';

class User extends Component {
  render() {
    return <UserTable navProps={this.props} />;
  }
}

export default User;

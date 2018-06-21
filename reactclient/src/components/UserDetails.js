import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { getChitID } from '../selectors/index';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Animated from 'animated/lib/targets/react-dom';
import Easing from 'animated/lib/Easing';

import { postUser } from '../actions/userActions';
import User from '../screens/User';
import UserTable from './UserTable';

class UserDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animatedValueFromLeft: new Animated.Value(0),
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const postuser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      email: this.state.email,
    };
    const postuserJson = JSON.stringify(postuser);
    this.props.postUser(postuserJson);
  }
  componentWillMount() {
    this.state.animatedValueFromLeft.setValue(0);
    Animated.timing(this.state.animatedValueFromLeft, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(1),
    }).start();
  }
  openCustomersTable = () => {
    this.props.history.goBack();
  };

  render() {
    const marginLeft = this.state.animatedValueFromLeft.interpolate({
      inputRange: [0, 1],
      outputRange: [-120, 0],
    });

    console.log(this.props, 'userdetails');

    const { firstName, lastName, phone, email } = this.state;
    return (
      <Animated.div
        className="content"
        style={{
          opacity: this.animatedValueFromLeft,
          transform: [{ translateX: marginLeft }],
        }}
      >
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label for="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  onChange={this.onChange}
                  value={firstName}
                />
              </div>
              <div className="form-group">
                <label for="startDate">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  onChange={this.onChange}
                  value={lastName}
                />
              </div>
              <div className="form-group">
                <label for="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="form-control"
                  onChange={this.onChange}
                  value={email}
                />
              </div>
              <div className="form-group">
                <label for="phone">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-control"
                  onChange={this.onChange}
                  value={phone}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <table className="minimalistBlack">
                <thead>
                  <tr>
                    <th>Chit ID</th>
                    <th>Check</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.chitId.map((chit_id, key) => {
                    return (
                      <tr key={key}>
                        <td>{chit_id}</td>
                        <td>
                          <input
                            type="checkbox"
                            name={chit_id}
                            value={chit_id}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="form-group">
                <button
                  className="form-control formButton"
                  onClick={this.openCustomersTable}
                >
                  back
                </button>
                <button className="form-control formButton" type="submit">
                  submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </Animated.div>
    );
  }
}

const mapStateToProps = state => ({
  // users: state.users.items,
  chitId: getChitID(state),
});

export default connect(mapStateToProps, { postUser })(UserDetails);

import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Animated from 'animated/lib/targets/react-dom';
import Easing from 'animated/lib/Easing';

import UserDetails from './UserDetails';

import { fetchUsers, deleteuser } from '../actions/userActions';

class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedValueFromLeft: new Animated.Value(0),
    };
  }

  componentWillMount() {
    this.state.animatedValueFromLeft.setValue(0);
    Animated.timing(this.state.animatedValueFromLeft, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(1),
    }).start();
  }

  animatedValueToRight = new Animated.Value(1);

  animateToRight = () => {
    this.animatedValueToRight.setValue(1);
    Animated.timing(this.animatedValueToRight, {
      toValue: 0,
      duration: 1000,
      easing: Easing.elastic(1),
    }).start();
  };

  openUserDetails = () => {
    this.props.navProps.history.push('/user/userdetails');
  };

  render() {
    const marginLeft = this.state.animatedValueFromLeft.interpolate({
      inputRange: [0, 1],
      outputRange: [-120, 0],
    });

    return (
      <div>
        <Animated.div
          className="content"
          style={{
            opacity: this.animatedValueFromLeft,
            transform: [{ translateX: marginLeft }],
          }}
        >
          <h2>Customers</h2>
          <table className="minimalistBlack">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>No. of Chits</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td>foot1</td>
                <td>foot2</td>
                <td>foot3</td>
                <td>foot4</td>
                <td>foot5</td>
                <td>foot6</td>
              </tr>
            </tfoot>
            <tbody>
              {this.props.users.map((dynamicData, key) => {
                return (
                  <tr key={key}>
                    <td>{dynamicData.id}</td>
                    <td>
                      {dynamicData.lastName} {dynamicData.firstName}
                    </td>
                    <td>{dynamicData.phone}</td>
                    <td>{dynamicData.email}</td>
                    <td>cell6_1</td>
                    <td>
                      <button
                        className="formButton"
                        onClick={() => {
                          this.props.deleteuser(dynamicData.id);
                          this.props.fetchUsers();
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="button">
            <button onClick={() => this.openUserDetails()} className="size">
              Add
            </button>
          </div>
        </Animated.div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.items,
  // chitId: getChitID(state),
});

export default connect(mapStateToProps, { fetchUsers, deleteuser })(UserTable);

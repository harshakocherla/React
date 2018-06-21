import React, { Component } from 'react';
import { connect } from 'react-redux';

import Animated from 'animated/lib/targets/react-dom';
import Easing from 'animated/lib/Easing';

import { getUserID } from '../selectors/index';
import { postChits } from '../actions/chitActions';

class ChitDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animatedValueFromLeft: new Animated.Value(0),
      chitNumber: '',
      startDate: '',
      endDate: '',
      amount: '',
      no_of_persons: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const postchits = {
      chitNumber: this.state.chitNumber,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      amount: this.state.amount,
      no_of_persons: this.state.no_of_persons,
    };
    const postchitsJson = JSON.stringify(postchits);
    this.props.postChits(postchitsJson);
  }

  componentWillMount() {
    this.state.animatedValueFromLeft.setValue(0);
    Animated.timing(this.state.animatedValueFromLeft, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(1),
    }).start();
  }
  openChitsTable = () => {
    this.props.history.goBack();
  };

  render() {
    const marginLeft = this.state.animatedValueFromLeft.interpolate({
      inputRange: [0, 1],
      outputRange: [-120, 0],
    });

    const {
      chitNumber,
      startDate,
      endDate,
      amount,
      no_of_persons,
    } = this.state;
    return (
      <Animated.div
        className="content"
        style={{
          opacity: this.animatedValueFromLeft,
          transform: [{ translateX: marginLeft }],
        }}
      >
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label for="chitNumber">Chit Number:</label>
            <input
              type="text"
              id="chitNumber"
              name="chitNumber"
              className="form-control"
              onChange={this.onChange}
              value={chitNumber}
            />
          </div>
          <div className="form-group">
            <label for="startDate">Start Date:</label>
            <input
              type="Date"
              id="startDate"
              name="startDate"
              className="form-control"
              onChange={this.onChange}
              value={startDate}
            />
          </div>
          <div className="form-group">
            <label for="endDate">End Date:</label>
            <input
              type="Date"
              id="endDate"
              name="endDate"
              className="form-control"
              onChange={this.onChange}
              value={endDate}
            />
          </div>
          <div className="form-group">
            <label for="amount">Amount:</label>
            <input
              type="text"
              id="amount"
              name="amount"
              className="form-control"
              onChange={this.onChange}
              value={amount}
            />
          </div>
          <div className="form-group">
            <label for="no_of_persons">No. of Persons:</label>
            <input
              type="text"
              id="no_of_persons"
              name="no_of_persons"
              className="form-control"
              onChange={this.onChange}
              value={no_of_persons}
            />
          </div>
          <div>
            <table className="minimalistBlack">
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Customer Name</th>
                  <th>Check</th>
                </tr>
              </thead>
              <tbody>
                {this.props.customer.map((customer, key) => {
                  return (
                    <tr key={key}>
                      <td>{customer[0]}</td>
                      <td>{customer[1]}</td>
                      <td>
                        <input
                          type="checkbox"
                          name={customer[0]}
                          value={customer[0]}
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
                onClick={this.openChitsTable}
              >
                back
              </button>
              <button className="form-control formButton" type="submit">
                submit
              </button>
            </div>
          </div>
        </form>
      </Animated.div>
    );
  }
}

const mapStateToProps = state => ({
  // users: state.users.items,
  customer: getUserID(state),
});

export default connect(mapStateToProps, { postChits })(ChitDetails);

import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Animated from 'animated/lib/targets/react-dom';
import Easing from 'animated/lib/Easing';

import { fetchchits, deletechit } from '../actions/chitActions';

class Chit extends Component {
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

  animateToRight = () => {
    this.animatedValueToRight.setValue(1);
    Animated.timing(this.animatedValueToRight, {
      toValue: 0,
      duration: 1000,
      easing: Easing.elastic(1),
    }).start();
  };

  openChitDetails = () => {
    this.props.history.push('/chit/chitdetails');
  };

  render() {
    const marginLeft = this.state.animatedValueFromLeft.interpolate({
      inputRange: [0, 1],
      outputRange: [-120, 0],
    });
    return (
      <Animated.div
        className="content"
        style={{
          opacity: this.animatedValueFromLeft,
          transform: [{ translateX: marginLeft }],
        }}
      >
        <h2>Chit</h2>
        <p>
          Mauris sem velit, vehicula eget sodales vitae, rhoncus eget sapien:
        </p>
        <table className="minimalistBlack">
          <thead>
            <tr>
              <th>ID</th>
              <th>Chit Number</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Amount</th>
              <th>No. of Persons</th>
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
              <td>foot7</td>
            </tr>
          </tfoot>
          <tbody>
            {this.props.chits.map((dynamicData, key) => {
              return (
                <tr key={key}>
                  <td>{dynamicData.id}</td>
                  <td>{dynamicData.chitNumber}</td>
                  <td>{dynamicData.startDate}</td>
                  <td>{dynamicData.endDate}</td>
                  <td>{dynamicData.amount}</td>
                  <td>{dynamicData.no_of_persons}</td>
                  <td>
                    <button
                      className="formButton"
                      onClick={() => this.props.deletechit(dynamicData.id)}
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
          <button className="size" onClick={this.openChitDetails} little>
            Add
          </button>
        </div>
      </Animated.div>
    );
  }
}

Chit.propTypes = {
  fetchchits: PropTypes.func.isRequired,
  chits: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  chits: state.chits.items,
});

export default connect(mapStateToProps, { fetchchits, deletechit })(Chit);

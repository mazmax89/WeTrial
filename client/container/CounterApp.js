import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from '../actions/CounterActions';
import Counter from '../../client/components/Counter.jsx';

class CounterApp extends Component {
  render() {
    const { counter, dispatch } = this.props;
    return (
      <Counter counter={counter}
               {...bindActionCreators(CounterActions, dispatch)} />
    );
  }
}

function select(state) {
  return {
    counter: state.counter
  };
}

export default connect(select)(CounterApp);

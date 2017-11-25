import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as CounterActions from '../actions/counterActions';
import Counter from '../../client/components/Counter.jsx';

class CounterApp extends Component {
    render() {
        const {counter, dispatch} = this.props;
        return (
            <div className='row justify-content-center'>
                <Counter counter={counter}
                         {...bindActionCreators(CounterActions, dispatch)} />
            </div>
        );
    }
}

function select(state) {
    return {
        counter: state.counter
    };
}

export default connect(select)(CounterApp);

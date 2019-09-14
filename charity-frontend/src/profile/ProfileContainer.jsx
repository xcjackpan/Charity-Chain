import React, { Component } from 'react';
import ProfileView from './ProfileView';
import { db } from '../configs/index';

export default class ProfileContainer extends Component {
    state = {
        transactions: {}
    }

    render() {
        // returns as object with keys
        db.getRefOfTransactions('1')
            .then(res => this.setState({ transactions: res })); // TODO: make it user ID
        return (
            <ProfileView transactions={this.state.transactions} />
        )
    }
}

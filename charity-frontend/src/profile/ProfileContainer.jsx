import React, { Component } from 'react';
import ProfileView from './ProfileView';
import { db } from '../configs/index';

export default class ProfileContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
        transactions: []
    }
  }

  componentDidMount() {
    db.getRefOfTransactions('1') // TODO: make this user ID
      .then(res => Object.keys(res).map(key => res[key])
        .map(transaction => ({
          ...transaction,
          timestamp: new Date(transaction.timestamp)
        }))
        .sort((a, b) => b.timestamp - a.timestamp))
      .then(res => this.setState({ transactions: res }));
  }

  render() {
    return (
        <ProfileView { ...this.props } transactions={this.state.transactions} />
    );
  }
}

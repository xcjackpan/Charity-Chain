import React, { Component } from 'react';
import ProfileView from './ProfileView';
import _ from 'lodash';
import { db } from '../configs/index';
import { getListOfUsers } from '../configs/db';

export default class ProfileContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
        transactions: [],
        identity: {}
    }
  }

  componentDidMount() {
    let uid;
    getListOfUsers()
      .then(res => {
        const userArr = Object.values(res);
        userArr.forEach((elem) => {
          if (elem.username === this.props.match.params.id) {
            uid = elem.uid;
          }
        });
        return uid;
      })
      .then(uid => {
        db.getRefOfTransactions(uid)
          .then(res => Object.keys(res).map(key => res[key])
            .map(transaction => ({
              ...transaction,
              timestamp: new Date(transaction.timestamp)
            }))
            .sort((a, b) => b.timestamp - a.timestamp))
          .then(res => this.setState({ transactions: res }));
        })
  }

  render() {
    return (
        <ProfileView { ...this.props } transactions={this.state.transactions} />
    );
  }
}

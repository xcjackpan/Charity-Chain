import React, { Component } from 'react';
import { Row, Col } from 'antd';
import CharityBox from './CharityBox';
import './ProfileView.css';

export default class ProfileView extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    const { transactions } = this.props;
    return (
        <div className='profile-charities-container'>
            {transactions ? Object.keys(transactions).map(transaction => <CharityBox name={'1'} />) : null}
        </div>
    );
  }
}

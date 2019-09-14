import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'react-feather'
import CharityBox from './CharityBox';
import './ProfileView.css';

export default class ProfileView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { transactions, match } = this.props;
    return (
      <div className='profile-container'>
        <Link to={`/user/${this.props.match.params.id}/browse`}><div><Grid /><span>Browse Charities</span></div></Link>
        <div className='profile-charities-container'>
          {transactions ?
            Object.keys(transactions).map(transaction => <CharityBox name={'1'} />) :
            null}
        </div>
      </div>
    );
  }
}

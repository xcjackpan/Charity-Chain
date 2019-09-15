import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Grid } from 'react-feather'
import CharityBox from './CharityBox';
import './ProfileView.css';

export default class ProfileView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    return (
      <div>
        <Link to={`/user/${this.props.match.params.id}/browse`}><div><Grid /><span>Browse Charities</span></div></Link>
        <div className='profile-charities-container'>
          {/*data.forEach(charity => <CharityBox />)*/}
          <CharityBox />
          <CharityBox />
          <CharityBox />
        </div>
      </div>
      
    )
  }
}

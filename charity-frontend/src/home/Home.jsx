import React from 'react';
import CharityList from './CharityList';
import { getRefOfCharities } from '../configs/db.js';
import './Home.css';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      charities: [],
    }
  }

  componentDidMount() {
    console.log(getRefOfCharities())
    // getRefOfCharities().then(res => console.log(res));
  }

  render() {
    return (
      <div className="home">
        <h1>CharityChain</h1>
        {/* map to charity list */}
        <CharityList />
        <CharityList />
        <CharityList />
        <CharityList />
      </div>
    );
  }
}
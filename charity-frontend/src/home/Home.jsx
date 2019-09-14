import React from 'react';
import CharityList from './CharityList';
import './Home.css';

export default class Home extends React.Component {
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
import React from 'react';
import Charity from './Charity';

export default class CharityList extends React.Component {
  render() {
    const arr = [1,2,3,4,5,6,7,8,9,10]
    return (
      <div className="charity-list">
        <h2>Charity Category</h2>
        <div className="charity-list-scroll-container">
          <div className="charity-list-scroll">
            {/* map charity to charity component, pass in data as props */}
            {arr.map(e => <Charity />)}
          </div>
        </div>
      </div>
    );
  }
}
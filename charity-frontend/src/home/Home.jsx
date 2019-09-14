import React from 'react';
import _ from 'lodash';
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
    // console.log(getRefOfCharities().then(res => console.))
    return getRefOfCharities()
      .then(res => {
        console.log("sdfsdf")
        const charitiesArr = Object.values(res);
        const charities = _.groupBy(charitiesArr, 'category')
        this.setState({ charities });
        console.log(charities)
        // console.log(list);
      });
  }

  render() {
    return (
      <div className="home">
        <h1>CharityChain</h1>
        {Object.keys(this.state.charities)
          .map(category => <CharityList category={category} charities={this.state.charities[category]}/>)}
      </div>
    );
  }
}
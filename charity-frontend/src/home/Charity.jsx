import React from 'react';
import * as Img from '../assets';
import { Card } from 'antd';

export default class Charity extends React.Component {
  render() {
    return (
      <Card
        className="charity-card"
        cover={<img src={Img.Unicef} />}
      />
    );
  }
}
import React, { Component } from 'react';
import ProfileView from './ProfileView';

export default class ProfileContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ProfileView {...this.props} />
    )
  }
}

import React from 'react';
import * as Img from '../assets';
import { Card, Modal } from 'antd';

export default class Charity extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    };
  }

  showModal = () => { this.setState({ visible: true }) }

  closeModal = () => { this.setState({ visible: false }) }
  
  render() {
    return (
      <div>
        <Card
          className="charity-card"
          cover={<img src={Img.Unicef} />}
          onClick={this.showModal}
        />
        <Modal
          title="charity name"
          visible={this.state.visible}
          onOk={this.closeModal}
          onCancel={this.closeModal}
          okText="Donate"
          cancelText="Close"
        >
          charity info
        </Modal>
      </div>
    );
  }
}
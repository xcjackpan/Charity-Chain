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
    const { charity } = this.props;
    return (
      <div>
        <Card
          className="charity-card"
          cover={<img src={charity.image} />}
          onClick={this.showModal}
          style={{ width: 240 }}
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
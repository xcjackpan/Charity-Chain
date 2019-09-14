import React from 'react';
import { Card, Descriptions } from 'antd';

const { Meta } = Card;

const CharityBox = props =>
    <Card
        style={{ width: '20%', marginLeft: '2.5%', marginRight: '2.5%', marginBottom: '5%' }}
        hoverable
        cover={
        <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" // props.logo
        />
        }
    >
        <Meta
            description={
                <Descriptions title={props.name} column={1}>
                    <Descriptions.Item label='Transaction'>{props.transactionId}</Descriptions.Item>
                    <Descriptions.Item label='Time'>{props.timestamp.toDateString()}</Descriptions.Item>
                    <Descriptions.Item label='Amount'>Props Transaction Amount</Descriptions.Item>
                    <Descriptions.Item label='Category'>Props Transaction Category</Descriptions.Item>
                </Descriptions>
            }
        />
    </Card>

export default CharityBox;

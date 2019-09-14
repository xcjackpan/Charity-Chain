import React from 'react';
import { Card, Descriptions } from 'antd';
import './CharityBox.css'

const { Meta } = Card;

const CharityBox = props =>
    <Card
        style={{ width: '30%' }}
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
                <Descriptions title="Card title" column={1}> {/* props.name */}
                    <Descriptions.Item label='Transaction'>Props Transaction ID</Descriptions.Item>
                    <Descriptions.Item label='Time'>Props Transaction Time</Descriptions.Item>
                    <Descriptions.Item label='Amount'>Props Transaction Amount</Descriptions.Item>
                    <Descriptions.Item label='Category'>Props Transaction Category</Descriptions.Item>
                </Descriptions>
            }
        />
    </Card>

export default CharityBox;

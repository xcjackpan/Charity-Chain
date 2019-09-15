import React from 'react';
import { Card, Statistic } from 'antd';

const { Meta } = Card;

const CharityBox = props =>
    <Card
        className="charity-box-card"
        hoverable
        cover={
        <img
            alt="logo"
            src={props.logo}
            style={{ padding: "12px" }}
        />
        }
    >
        <Meta
            title={props.name}
            description={
                <div>
                    <Statistic title="Amount" value={`$${parseInt(props.amount).toFixed(2)}`} />
                    <div>{new Date(props.timestamp).toDateString()}</div>
                    {!!props.spending && <div style={{ marginTop: "8px" }}>{`Spent on: ${props.spending.join(', ')}`}</div>}
                </div>
                
                // <div></div>
                // <Descriptions title={props.name} column={1}>
                //     <Descriptions.Item label='Time Donated'>{new Date(props.timestamp).toDateString()}</Descriptions.Item>
                //     <Descriptions.Item label='Amount'>{`$${parseInt(props.amount).toFixed(2)}`}</Descriptions.Item>
                //     {props.spending ?
                //         <Descriptions.Item label='Categories'>
                //             {props.spending.join(', ')}
                //         </Descriptions.Item>
                //     : null}
                // </Descriptions>
            }
        />
    </Card>

export default CharityBox;

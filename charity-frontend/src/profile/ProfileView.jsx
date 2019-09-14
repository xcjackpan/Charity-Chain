import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Row, Col } from 'antd';
import { Grid } from 'react-feather'
import CharityBox from './CharityBox';
import './ProfileView.css';

export default class ProfileView extends Component {
    render() {
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        return (
            <div>
                <Link to="/"><div><Grid /><span>Browse Charities</span></div></Link>
                <div className='profile-charities-container'>
                    {/*data.forEach(charity => <CharityBox />)*/}
                    <CharityBox />
                    <CharityBox />
                    <CharityBox />
                </div>
            </div>
            
        )
    }
}

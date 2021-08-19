// IMPORT MOTORS
import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
// IMPORT COMPONENTS
import Visual from '../../components/Visual/visual'
import Nav from '../../components/Nav/nav'
// IMPORT ACTIONS
import { ACTION } from '../../redux/types';
// IMPORT ICONS


const Profile = (props) => {

    let history = useHistory();

    if (props.logData.token){
        return (
            <div className="profileContainer">

                <Nav/>
                <Visual/>                
            </div>
    )
    } else {
        setTimeout(()=>{
            history.push('/')
        }, 1000)
        return (
            <div className="profileContainer">Not allowed</div>
        )
    }
}

export default connect((state)=>(
    {logData:state.credentials}
))(Profile);
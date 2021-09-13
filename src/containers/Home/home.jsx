// IMPORT MOTORS
import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';


const Home = () => {

    return (
        <div className="containerHome">
            <div className="boxTitle">
                <div className="title topTitle">GEEK</div>
                <div className="title">DATES</div>
            </div>
            
            <div className="boxButton">
                <NavLink to="/login" className="startButton">START</NavLink>
            </div>
            
        </div>
    )
}

export default connect()(Home);
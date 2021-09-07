// IMPORT MOTORS
import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';


const Home = () => {

    
    return (
        <div className="containerHome">
            <div className="title topTitle">Geek</div>
            <div className="title">Dates</div>
            {/* <NavLink to="/login"><img className="logo" alt="Logo" title="Logo de la app" src={Logo}/></NavLink> */}
            <NavLink to="/login" className="startButton">start</NavLink>
            
        </div>
    )
}

export default connect()(Home);
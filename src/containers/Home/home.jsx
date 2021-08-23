// IMPORT MOTORS
import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import Logo from '../../assets/img/logo.png'



const Home = () => {


    return (
        <div className="containerHome">

            <NavLink to="/login"><img className="logo" alt="Logo" title="Logo de la app" src={Logo}/></NavLink>
            
        </div>
    )
}

export default connect()(Home);
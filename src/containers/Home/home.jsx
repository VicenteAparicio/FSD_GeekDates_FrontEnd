// IMPORT MOTORS
import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import Logo from '../../assets/img/logo.png'



const Home = (props) => {





    return (
        <div className="containerHome">

            <NavLink to="/login"><img className="logo" alt="Logo" title="Logo de la app" src={Logo}/></NavLink>
            
        </div>
    )
}

export default connect()(Home);
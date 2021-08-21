// IMPORT MOTORS
import React from 'react';
import {connect} from 'react-redux';
import {NavLink, useHistory} from 'react-router-dom';
// IMPORT ACTIONS
import { ACTION, LOGOUT } from '../../redux/types';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCircle, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';



const Nav = (props) => {

    let history = useHistory();

    const logOut = () =>{
        props.dispatch({type:LOGOUT})
    }

    if (props.logData.token){

        return (
            <div className="containerNav">
                <nav className="nav">
                    <div className="navBox">

                        <NavLink className="actions" to="/search"><FontAwesomeIcon className="faIcons" icon={faSquare}/></NavLink>
                        <NavLink className="actions" to="/tools"><FontAwesomeIcon icon={faCircle}/></NavLink>
                        <NavLink className="actions" to="/profile"><FontAwesomeIcon className="faIcons" icon={faUser}/></NavLink>
                        <div className="actions" onClick={()=>logOut()}><FontAwesomeIcon className="faIcons" icon={faTimes}/></div>
                    </div>
                </nav>
            </div>
        )
    } else {
        // setTimeout(()=>{
        //     history.push('/');
        // }, 1000)
        return (
            <div></div>
        )
    }
}

export default connect((state)=>(
    {logData:state.credentials}
))(Nav);
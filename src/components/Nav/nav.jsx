// IMPORT MOTORS
import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
// IMPORT ACTIONS
import { LOGOUT } from '../../redux/types';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUser, faHeart, faEye, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';



const Nav = (props) => {

    let history = useHistory();

    const logOut = () =>{
        setTimeout(()=>{
            history.push('/');
        }, 500)
        props.dispatch({type:LOGOUT})
    }

    if (props.logData.token){

        return (
            <div className="containerNav">
                <nav className="nav">
                    <div className="navBox">

                        <NavLink className="actions" to="/search"><FontAwesomeIcon className="faIcons" icon={faEye}/></NavLink>
                        <NavLink className="actions" to="/matches"><FontAwesomeIcon icon={faHeart}/></NavLink>
                        <NavLink className="actions" to="/profile"><FontAwesomeIcon className="faIcons" icon={faUser}/></NavLink>
                        <div className="actions" onClick={()=>logOut()}><FontAwesomeIcon className="faIcons" icon={faExternalLinkSquareAlt}/></div>
                    </div>
                </nav>
            </div>
        )
    } else {
        setTimeout(()=>{
            history.push('/');
        }, 1000)
        return (
            <div></div>
        )
    }
}

export default connect((state)=>(
    {logData:state.credentials}
))(Nav);
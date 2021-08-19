// IMPORT MOTORS
import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
// IMPORT ACTIONS
import { ACTION } from '../../redux/types';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileVideo, faFilm, faReceipt, faUsers } from '@fortawesome/free-solid-svg-icons';


const Nav = (props) => {

    let history = useHistory();

    const adminFn = (arg) => {
        switch (arg) {
            case "allmovies":
                props.dispatch({type:ACTION,payload:"allmovies"})
                break;
            case "allusers":
                props.dispatch({type:ACTION,payload:"allusers"})
                break;
            case "allorders":
                props.dispatch({type:ACTION,payload:"allorders"})
                break;
            case "createmovies":
                props.dispatch({type:ACTION,payload:"createmovies"})
                break;
            default:
                break;
        }
    }
    return (
        <div className="containerNav">
            <nav className="nav">
                <div className="navBox">

                    <div className="actions" onClick={()=>adminFn("allmovies")}><FontAwesomeIcon className="faIcons" icon={faFilm}/></div>
                    <div className="actions" onClick={()=>adminFn("allusers")}><FontAwesomeIcon className="faIcons" icon={faUsers}/></div>
                    <div className="actions" onClick={()=>adminFn("allorders")}><FontAwesomeIcon className="faIcons" icon={faReceipt}/></div>
                    <div className="actions" onClick={()=>adminFn("createmovies")}><FontAwesomeIcon className="faIcons" icon={faFileVideo}/></div>
                </div>
            </nav>
        </div>
    )
}

export default Nav;
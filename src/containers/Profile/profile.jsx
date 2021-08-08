// IMPORT MOTORS
import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
// IMPORT COMPONENTS
import Visual from '../../components/Visual/visual';
// IMPORT STYLES
import '../../Global.css'
import { ADMINACTION } from '../../redux/types';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileVideo, faFilm, faReceipt, faUsers } from '@fortawesome/free-solid-svg-icons';

const Admin = (props) => {

    let history = useHistory();

    const adminFn = (arg) => {
        switch (arg) {
            case "allmovies":
                props.dispatch({type:ADMINACTION,payload:"allmovies"})
                break;
            case "allusers":
                props.dispatch({type:ADMINACTION,payload:"allusers"})
                break;
            case "allorders":
                props.dispatch({type:ADMINACTION,payload:"allorders"})
                break;
            case "createmovies":
                props.dispatch({type:ADMINACTION,payload:"createmovies"})
                break;
            default:
                break;

        }
    }

if (props.logData.user?.isAdmin){
    return (
        <div className="adminContainer">
            <div className="adminBox">

                <div className="adminActions" onClick={()=>adminFn("allmovies")}><FontAwesomeIcon className="faIcons" icon={faFilm}/></div>
                <div className="adminActions" onClick={()=>adminFn("allusers")}><FontAwesomeIcon className="faIcons" icon={faUsers}/></div>
                <div className="adminActions" onClick={()=>adminFn("allorders")}><FontAwesomeIcon className="faIcons" icon={faReceipt}/></div>
                <div className="adminActions" onClick={()=>adminFn("createmovies")}><FontAwesomeIcon className="faIcons" icon={faFileVideo}/></div>
            </div>

            <Visual/>                
        </div>
    )
    } else {
        setTimeout(()=>{
            history.push('/')
        }, 1000)
        return (
            <div className="adminContainer">Not allowed</div>
        )
    }
}

export default connect((state)=>(
    {logData:state.credentials}
))(Profile);
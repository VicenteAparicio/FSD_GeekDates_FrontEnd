// IMPORT MOTORS
import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
// IMPORT COMPONENTS




const Visual = (props) => {

    switch (props.adminAction) {
        case "allmovies":
            return (
                <div className="visualContainer">
                  
                </div>
            )
        case "createmovies":
            return(
                <div className="visualContainer">
                   
                </div>
            )
        case "allusers":
            return(
                <div className="visualContainer">
                   
                </div>
            )
        case "moviedetail":
            return(
                <div className="visualContainer">
                  
                </div>
            )
        case "allorders":
            return(
                <div className="visualContainer">
                   
                </div>
            )
        case "profile":
            return(
                <div className="visualContainer">
                    
                </div>
            )
        default:
            return (
                <div className="visualContainer">

                </div>
            )
    }


}

export default connect((state)=>(
    {action: state.action}
))(Visual);
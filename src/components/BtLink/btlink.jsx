// IMPORT MOTORS
import React from 'react';
import { useHistory } from 'react-router-dom';


const ButtonLog = (props) => {


    let history = useHistory();

    const Link = () => {
        if (props.name) {
            setTimeout(function(){
                history.push(`/${props.name.toLowerCase()}`);
            }, 500);
        }         
    }
    return (
        <div className="button" onClick={()=>Link()}>
            {/* {props.name.toUpperCase()} */}
            </div>
    )
}

export default ButtonLog;
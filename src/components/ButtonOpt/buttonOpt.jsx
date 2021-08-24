// IMPORT MOTORS
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { HOBBIEOPTION } from '../../redux/types';


const ButtonOpt = (props) => {

    const [swap, setSwap] = useState (false);
    const [classButton, setClassButton] = useState('buttonOpt');
    const [hobbies, setHobbies] = useState({tablegames:false, rolegames:false, videogames:false, cosplay:false, anime:false});

    useEffect(()=>{
        // console.log("Este es el elemento USEFFECT ONCE " + props.name + " " + swap)
    },[]);

    useEffect(()=>{
        console.log("Esto es lo que mando")
        console.log(hobbies)
    });
    const cSwap = (value) => {
        
        if (value === false){
            setClassButton("buttonOpt buttonChecked");
            setSwap(true);

            setHobbies({...hobbies, [props.name]: true});
        } else if (value === true) { 
            setClassButton("buttonOpt");
            setSwap(false);
            setHobbies({...hobbies, [props.name]: false});
            console.log("Este es el elemento " + props.name + " " + swap)
        }

        
        props.dispatch({type:HOBBIEOPTION,payload:hobbies});

    }

    return (
        <div className={classButton} value={swap} name={props.name} onClick={()=>cSwap(swap)}>{props.name.toUpperCase()}</div>
    )
}

export default connect()(ButtonOpt);
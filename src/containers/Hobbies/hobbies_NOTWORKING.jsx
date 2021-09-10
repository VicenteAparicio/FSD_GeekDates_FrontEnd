// IMPORT MOTORS
import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
// import useToggle from "../../components/ButtonOpt/buttonOpt";

// IMPORT ACTIONS
import { LOGOUT } from '../../redux/types';

const Hobbies = (props) => {

    // let connection = "http://127.0.0.1:8000/api";
    let connection = "https://geeksdateback.herokuapp.com/api";
    
    let history = useHistory();

    // Hooks
    const [hobbies, setHobbies] = useState({tablegames:0, rolegames:0, videogames:0, cosplay:0, anime:0});

    const toggleValue = (value) => {
        
            typeof value === "boolean" ? value : !currentValue
        
    }

    // Handler
    const updateHobbies = (e) => {
        setHobbies({...hobbies, [e.target.name]: e.target.value});
    }

    const hobbieFill = async () => {
        
        try {
            let body = {
                user_id: props.logData.user.id,
                tablegames: hobbies.tablegames,
                rolegames: hobbies.rolegames,
                videogames: hobbies.videogames,
                cosplay: hobbies.cosplay,
                anime: hobbies.anime
            }
            let res = await axios.post(`${connection}/hobbies`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}})
            
            // ONLY FIRST TIME
            if (res && !props.logData.user.isComplete) {
                let body = {
                    user_id: props.logData.user.id,
                    isComplete: true
                }
                await axios.post(`${connection}/updateinfo`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}})
            
                alert("Gracias por rellenar tus hobbies");

                props.dispatch({type:LOGOUT});

                history.push('/login');
                
            } else if (res && props.logData) {

                alert("Actualizaste tus hobbies");

                history.push('/profile');
            }
        } catch (error) {
            console.log(error);
        }; 
    }
    
    const hobbieOptions = ["tablegames","rolegames","videogames","cosplay","anime"]

    return (

        <div className="container">     

            <div className="boxOptions">

                <div className="titleSection">HOBBIES</div>

                    <div className="checkerBox">


                        {hobbieOptions.map((option, index)=>(

                            <div className="checkOptHobbies" key={index}>
                                <label onClick={toggleValue} name={option} className="switch">
                                    <input type="checkbox"/>
                                    <span className="slider" />
                                    
                                </label>
                                <div className="prest">{option} : {value.tablegames}</div>
                            </div>

                        ))}
                        

                    </div>
                
                <div className="button" onClick={()=>hobbieFill()}>FINISH</div>
                {props.logData.user.isComplete ?
                    <NavLink className="button" to="/profile">CANCEL</NavLink> : ''
                }
            </div>

        </div>
    )
}

export default connect((state)=>(
    {logData:state.credentials}
))(Hobbies);
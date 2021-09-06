// IMPORT MOTORS
import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT ACTIONS
import { LOGOUT } from '../../redux/types';

const Hobbies = (props) => {

    // let connection = "http://127.0.0.1:8000/api";
    let connection = "https://geeksdateback.herokuapp.com/api";
    
    let history = useHistory();

    // Hooks
    const [hobbies, setHobbies] = useState({tablegames:0, rolegames:0, videogames:0, cosplay:0, anime:0});

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

                history.push('/');
                
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

                        <div className="radioOpt">
                            <span>YES</span>
                            <span>NO</span>
                        </div>

                        {hobbieOptions.map((option, index)=>(

                            <div className="checkOptHobbies" key={index}>
                                <input className="radioInputs" type="radio" name={option} value="1" onChange={updateHobbies}/>
                                <label for={option}>{option}</label>
                                <input className="radioInputs" type="radio" name={option} value="0" onChange={updateHobbies}/>
                            </div>

                        ))}

                    </div>
                
                <div className="button" onClick={()=>hobbieFill()}>FINISH</div>
                {props.logData.user.isComplete && (
                    <NavLink className="button" to="/profile">CANCEL</NavLink>
                )}
            </div>

        </div>
    )
}

export default connect((state)=>(
    {logData:state.credentials}
))(Hobbies);
// IMPORT MOTORS
import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT ACTIONS
import { LOGOUT, GETHOBBIES } from '../../redux/types';

const Hobbies = (props) => {

    let connection = "https://geeksdateback.herokuapp.com/api";
    
    let history = useHistory();

    // Hooks
    const [hobbies, setHobbies] = useState({tablegames:0, rolegames:0, videogames:0, cosplay:0, anime:0});

    // Handler
    const updateHobbies = (e) => {
        if (e.target.value == 0) {
        setHobbies({...hobbies, [e.target.name]: 1});
        } else {
        setHobbies({...hobbies, [e.target.name]: 0});
        }
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
            console.log(res.data)
            props.dispatch({type:GETHOBBIES,payload:res.data});
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
        } catch (err) {
            console.log({message: err.message});
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
                                <label className="switch">
                                    <input className="radioInputs" type="checkbox" name={option} value={hobbies[option]} onChange={updateHobbies}/>
                                    <span className="slider"/>
                                </label>
                                
                                <div className="hobbieOpt">{option.toLocaleUpperCase()}</div>

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
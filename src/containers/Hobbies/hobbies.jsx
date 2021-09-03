// IMPORT MOTORS
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

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
            
            // A continuación generamos el body de datos
            let body = {
                user_id: props.logData.user.id,
                tablegames: hobbies.tablegames,
                rolegames: hobbies.rolegames,
                videogames: hobbies.videogames,
                cosplay: hobbies.cosplay,
                anime: hobbies.anime
            }
            let res = await axios.post(`${connection}/hobbies`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}})
            if (res) {
                alert("Rellenaste tus hobbies");
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

                        {hobbieOptions.map((option)=>(

                            <div class="checkOptHobbies">
                                <input className="radioInputs" type="radio" name={option} value="1" onChange={updateHobbies}/>
                                <label for={option}>{option}</label>
                                <input className="radioInputs" type="radio" name={option} value="0" onChange={updateHobbies}/>
                            </div>

                        ))}

                    </div>
                
                <div className="button" onClick={()=>hobbieFill()}>FINISH</div>
            
            </div>

        </div>
    )
}

export default connect((state)=>(
    {logData:state.credentials}
))(Hobbies);
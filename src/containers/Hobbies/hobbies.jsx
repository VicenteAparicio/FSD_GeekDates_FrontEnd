// IMPORT MOTORS
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT COMPONENTS
import Nav from '../../components/Nav/nav';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

const Hobbies = (props) => {

    let connection = "http://127.0.0.1:8000/api";
    // let connection = "https://killfilmsbackend.herokuapp.com";
    
    let history = useHistory();

    // Hooks
    const [hobbies, setHobbies] = useState({tablegames:'0', rolegames:'0', videogames:'0', cosplay:'0', anime:'0'});

    // Handler
    const updateHobbies = (e) => {
        setHobbies({...hobbies, [e.target.name]: e.target.value});
    }



    const hobbieFill = async () => {

        //A continuación generamos el body de datos
        let body = {
            user_id: props.logData.user.id,
            tablegames: hobbies.tablegames,
            rolegames: hobbies.rolegames,
            videogames: hobbies.videogames,
            cosplay: hobbies.cosplay,
            anime: hobbies.anime
        }

        console.log(body)

        axios
            .post(`${connection}/fillhobbies`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}})
            .then((res)=>{
                if(res){
                    alert("Rellenaste tus hobbies");
                }
            })
            .catch((error)=>{
                console.log(error);
            });   
    }
    
    const hobbieOptions = ["tablegames","rolegames","videogames","cosplay","anime"]
   

    return (

        <div className="containerRegister">     

            <div className="containerBox">

                <div className="titleSection">Hobbies</div>

                <div className="boxRegister">

                    <div className="regData">

                        {hobbieOptions.map((option)=>(
                            <div class="checkOpt">
                                <input className="radioInputs" type="radio" name={option} value="1" onChange={updateHobbies}/>
                                <label for={option}>{option}</label>
                            </div>
                        ))}

                    </div>

                </div>
                
                <div className="sendButton" onClick={()=>hobbieFill()}><FontAwesomeIcon className="faLogin" icon={faPaperPlane}/></div>
            </div>

        </div>
    )
}

export default connect((state)=>(
    {logData:state.credentials}
))(Hobbies);
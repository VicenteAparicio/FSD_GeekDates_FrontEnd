// IMPORT MOTORS
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT COMPONENTS
import ButtonOpt from '../../components/ButtonOpt/buttonOpt';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';


const Hobbies = (props) => {

    let connection = "http://127.0.0.1:8000/api";
    // let connection = "https://killfilmsbackend.herokuapp.com";
    
    let history = useHistory();
    const [opt, setOpt] = useState(0);
    // const [classButton, setClassButton] = useState('buttonOpt');
    // Hooks
    // const [hobbies, setHobbies] = useState({tablegames:'', rolegames:'0', videogames:'0', cosplay:'0', anime:});

    const [hobbies, setHobbies] = useState(props.hobbieOpt)

    useEffect(()=>{
        saveOpt();
    }, []);

    useEffect(()=>{
        // console.log(hobbies)
    });

    const saveOpt = () => {
        // setHobbies({...hobbies, [props.hobbieOpt.name]: props.hobbieOpt.value});
        
    };




    const hobbieFill = async () => {
        // console.log("Soy el avion " + hobbies);


        //A continuación generamos el body de datos
        // let body = {
        //     user_id: props.logData.user.id,
        //     tablegames: hobbies.tablegames,
        //     rolegames: hobbies.rolegames,
        //     videogames: hobbies.videogames,
        //     cosplay: hobbies.cosplay,
        //     anime: hobbies.anime
        // }
        // console.log(body);
        // axios
        //     .post(`${connection}/fillhobbies`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}})
        //     .then((res)=>{
        //         if(res){
        //             alert("Rellenaste tus hobbies");
        //         }
        //     })
        //     .catch((error)=>{
        //         console.log(error);
        //     });   
    }
    
    const hobbieOptions = ["tablegames","rolegames","videogames","cosplay","anime"]
   

    return (

        <div className="containerRegister">     

            <div className="containerBox">

                <div className="titleSection">Hobbies</div>

                    <div className="checkerBox">
                        {hobbieOptions.map((option, index)=>(
                            // <div class="checkOptHobbies" key={index}>
                                <ButtonOpt name={option} key={index} onClick={()=>saveOpt()}/>
                            // </div>
                        ))}

                    </div>                
                
                <div className="sendButton" onClick={()=>hobbieFill()}><FontAwesomeIcon className="faLogin" icon={faPaperPlane}/></div>
            </div>

        </div>
    )
}

export default connect((state)=>(
    {logData:state.credentials,
    hobbieOpt:state.option}
))(Hobbies);
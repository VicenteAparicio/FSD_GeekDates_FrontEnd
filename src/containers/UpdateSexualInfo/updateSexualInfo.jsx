// IMPORT MOTORS
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT ACTIONS
import {GETINFO} from '../../redux/types';

const UpdateSexualInfo = (props) => {

    // let connection = "http://127.0.0.1:8000/api";
    let connection = "https://geeksdateback.herokuapp.com/api";
    
    let history = useHistory();

    // Hooks
    const [sexuality, setSexuality] = useState('heterosexual');
    const [gender, setGender] = useState('');
    const [lookingFor, setLookingFor] = useState('');

    // Handler
    const updateOrientation = (e) => {
        setSexuality(e.target.value);
    }
    
    const updateGender = (e) => {
        setGender(e.target.value);
    }
    const updateLookingFor = (e) => {
        setLookingFor(e.target.value);
    }

    // OBJECTS TO MAP 
    const sexualOrientation = [
        {
            label: "Heterosexual",
            value: "heterosexual"
        },
        {
            label: "Gay",
            value: "gay"
        },
        {
            label: "Bisexual",
            value: "bisexual"
        },
    ];

    const genderOptions = [
        {
            label: "Male",
            value: "male"
        },
        {
            label: "Female",
            value: "female"
        },
    ];

    const lookForOptions = [
        {
            label: "Male",
            value: "male"
        },
        {
            label: "Female",
            value: "female"
        },
        {
            label: "Both",
            value: "both"
        },
    ];

    // UPDATE USER INFO
    const updateSexInfo = async () => {
        try {
            //A continuación generamos el body de datos
            let body = {
                user_id: props.logData.user.id,
                gender: gender,
                sexuality: sexuality,
                lookingfor: lookingFor
            }
            let res = await axios.post(`${connection}/updateinfo`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}})
            if(res.data){
                props.dispatch({type:GETINFO,payload:res.data.user});
                alert("Gracias por completar tu registro");
                history.push('/hobbies');
            }
        } catch (error) {
            console.log(error);
        };   
    }

    return (

        <div className="container">

            <div className="boxOptions">

                {/* <div className="titleSection">DATA INFO</div> */}

                    {/* <div className="regData"> */}

                        <div className="checkerBox">

                            <div className="preferenceLabels">YOU ARE</div>
                        
                            {genderOptions.map((option, index)=>(
                                <div class="checkOpt" key={index}>
                                    <input className="radioInputs" type="radio" name="gender" value={option.value} onChange={updateGender}/>
                                    <label for={option.value}>{option.label}</label>
                                </div>
                            ))}

                        </div>

                    {/* </div> */}
                    
                    {/* <div className="regData"> */}

                        <div className="checkerBox"> 

                            <div className="preferenceLabels">HOW YOU FEEL</div> 
                             
                            {sexualOrientation.map((option, index)=>(
                                <div className="checkOpt" key={index}>
                                    <input className="radioInputs" type="radio" name="orientation" value={option.value} onClick={updateOrientation}/>
                                    <label for={option.value}>{option.label}</label>
                                </div>
                            ))}

                        </div>

                    {/* </div> */}

                    {/* <div className="regData"> */}

                        <div className="checkerBox">

                            <div className="preferenceLabels">LOOK FOR</div> 
                        
                            {lookForOptions.map((option, index)=>(
                                <div class="checkOpt" key={index}>
                                    <input className="radioInputs" type="radio" name="lookingFor" value={option.value} onClick={updateLookingFor}/>
                                    <label for={option.value}>{option.label}</label>
                                </div>
                            ))}

                        </div>
                    
                    {/* </div> */}
                    <div className="button" onClick={()=>updateSexInfo()}>CONTINUE</div>
                </div>
                
            </div>

    
    )
}

export default connect((state)=>(
    {logData:state.credentials}
))(UpdateSexualInfo);;
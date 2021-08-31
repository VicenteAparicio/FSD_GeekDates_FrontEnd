// IMPORT MOTORS
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

const UpdateInfo = (props) => {

    // let connection = "http://127.0.0.1:8000/api";
    let connection = "https://geeksdatebackend.herokuapp.com";
    
    let history = useHistory();

    // Hooks
    const [credentials, setCredentials] = useState({name:'',surname:'',country:'',city:'', cp:''});

    const [errors, setErrors] = useState({eName:'',eSurname:'',eCountry:'',eCity:'', eCP:''});


    // Handler
    const updateCredentials = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }


    // FUNCTION ERROR CHECK
    const checkError = (arg) => {
        switch (arg){
            case 'name':
            case 'surname':
            case 'country':
            case 'city':
                if ((credentials.name.length < 2)||(! /^[a-z ,.'-]+$/i.test(credentials.name))||(credentials.name.length > 20)){
                    if (arg==='name'){
                        setErrors({...errors, eName: 'Not a validate name'});
                    } 
                    else if (arg==='surname'){
                        setErrors({...errors, eLastName: 'Not a validate surname'});
                    }
                    else if (arg==='country'){
                        setErrors({...errors, eCName: 'Not a validate country'});
                    } 
                    
                    else if (arg==='city'){
                        setErrors({...errors, eCLastName: 'Not a validate city'});
                    }
                } else {
                    setErrors({...errors, eName: ''});
                    setErrors({...errors, eSurname: ''});
                    setErrors({...errors, eCountry: ''});
                    setErrors({...errors, eCity: ''});
                }
            break;


            case 'cp':
                if ((! /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm.test(credentials.cp))||(credentials.cp.length > 5)){
                    setErrors({...errors, eCP: 'Wrong cp number'});
                } else {
                    setErrors({...errors, eCP: ''});
                }
            break;

            default:
                break;
        }
    }

    // UPDATE USER INFO
    const UpInfo = async () => {
        try {

            let body = {
                user_id: props.logData.user.id,
                name: credentials.name,
                surname: credentials.surname,           
                country: credentials.country,
                city: credentials.city,
                cp: credentials.cp
            }
            let res = await axios.post(`${connection}/updateinfo`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}})
            if(res){
                console.log(res.data.user)
                
                alert("Datos guardados");
                history.push('/updatesexualinfo');
            }
        } catch (error) {
            console.log(error);
        };   
    }
    

    

    return (

        <div className="containerRegister">

            <div className="containerBox">

                <div className="titleSection">PERSONAL INFO</div>

                <div className="boxRegister">
                
                    <div className="regData">

                        <label className="labelsRegister" for="name">NAME</label>
                        <input require="true" className="inputs" type="text" name="name" onChange={updateCredentials} onBlur={()=>checkError("name")} placeholder="Name"/>
                        <div className="validateError">{errors.eName}</div>

                        <label className="labelsRegister" for="surname">SURNAME</label>
                        <input require="true" className="inputs" type="text" name="surname" onChange={updateCredentials} onBlur={()=>checkError("surname")} placeholder="Surname"/>
                        <div className="validateError">{errors.eSurname}</div>
                            
                        <label className="labelsRegister" for="country">COUNTRY</label>
                        <input className="inputs" type="text" name="country" onChange={updateCredentials} onBlur={()=>checkError("country")} placeholder="Country"/>
                        <div className="validateError">{errors.eCountry}</div>
                            
                        <label className="labelsRegister" for="city">CITY</label>
                        <input className="inputs" type="text" name="city" onChange={updateCredentials} onBlur={()=>checkError("city")} placeholder="City"/>
                        <div className="validateError">{errors.eCity}</div>
                            
                        <label className="labelsRegister" for="cp">CP</label>
                        <input className="inputs" type="text" name="cp" onChange={updateCredentials} onBlur={()=>checkError("cp")} placeholder="C.P."/>
                        <div className="validateError">{errors.eCP}</div>
                            
                    </div>

                </div>
                
    
                <div className="sendButton" onClick={()=>UpInfo()}><FontAwesomeIcon className="faLogin" icon={faPaperPlane}/></div>
            </div>

        </div>
    )
}

export default connect((state)=>(
    {logData:state.credentials}
))(UpdateInfo);
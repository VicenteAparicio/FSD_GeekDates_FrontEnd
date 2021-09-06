// IMPORT MOTORS
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

const UpdateInfo = (props) => {

    // let connection = "http://127.0.0.1:8000/api";
    let connection = "https://geeksdateback.herokuapp.com/api";
    
    let history = useHistory();

    // Hooks
    const [prev, setPrev] = useState({name:props.logData.user?.name,surname:props.logData.user?.surname,country:props.logData.user?.country,city:props.logData.user?.city, cp:props.logData.user?.cp});
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
            if(res && !props.logData.user.sexuality){
                alert("Datos guardados");
                history.push('/updatesexualinfo');
            } else if (res && props.logData.user.sexuality) {
                history.push('/profile');
            }
        } catch (error) {
            console.log(error);
        };   
    }
    
    return (

        <div className="container">

                <div className="boxOptions">

                <div className="titleSection">PERSONAL INFO</div>
                 
                <input require="true" className="inputs" type="text" name="name" onChange={updateCredentials} onBlur={()=>checkError("name")} placeholder="Name"/>
                <div className="validateError">{errors.eName}</div>
                
                <input require="true" className="inputs" type="text" name="surname" onChange={updateCredentials} onBlur={()=>checkError("surname")} placeholder="Surname"/>
                <div className="validateError">{errors.eSurname}</div>
                
                <input className="inputs" type="text" name="country" onChange={updateCredentials} onBlur={()=>checkError("country")} placeholder="Country"/>
                <div className="validateError">{errors.eCountry}</div>
                
                <input className="inputs" type="text" name="city" onChange={updateCredentials} onBlur={()=>checkError("city")} placeholder="City"/>
                <div className="validateError">{errors.eCity}</div>
                
                <input className="inputs" type="text" name="cp" onChange={updateCredentials} onBlur={()=>checkError("cp")} placeholder="C.P."/>
                <div className="validateError">{errors.eCP}</div>

                <div className="button" onClick={()=>UpInfo()}>SAVE</div>

                {props.logData.user.isComplete && (
                    <div className="button" onClick={()=>history.push("/profile")}>CANCEL</div>
                )}

            </div>

        </div>
    )
}

export default connect((state)=>(
    {logData:state.credentials}
))(UpdateInfo);
// IMPORT MOTORS
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT COMPONENTS
import ButtonLog from '../../components/ButtonLog/buttonLog';
// IMPORT ACTIONS
import {LOGIN} from '../../redux/types';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';


const Login = (props) => {

    let connection = "http://127.0.0.1:8000/api";
    // let connection = "https://killfilmsbackend.herokuapp.com";

    let history = useHistory();

    // Hooks
    const [credentials, setCredentials] = useState({email:'',password:'',options:'user'});

    // Handler
    const updateCredentials = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

   // FUNCION LOGUEAR
   const SignIn = async () => {

    // A continuación genearmos el body de datos
    let body = {
        email: credentials.email.toLowerCase(),
        password: credentials.password,
    }
    
    axios
        .post(`${connection}/login`, body)
        .then((res)=>{
            //Guardo en RDX
            props.dispatch({type:LOGIN,payload:res.data});
            alert("Gracias por loguearte")

            if(!res.data.token){
                history.push('/register')
            } else if (!res.data.user.name) {
                history.push('/updateinfo')                
            } else if (!res.data.user.gender) {
                history.push('/updatesexualinfo')                
            } else {
                history.push('/profile')
            }
        })
        .catch((error)=>{
            alert(error)
        });  
}



    return (
        <div className="containerLogin">
            <div className="boxOptions">
                <div className="boxLogin">
                    
                    <input className="inputs" type="email" name="email" onChange={updateCredentials} placeholder="Email"></input>
                    
                    <input className="inputs" type="password" name="password" onChange={updateCredentials} placeholder="Password"></input>

                    <div className="loginIcon" onClick={()=>SignIn()}><FontAwesomeIcon className="faLogin" icon={faPaperPlane}/></div>
                </div>

            <div className="barra"></div>

            <ButtonLog name="register"></ButtonLog>

            </div>
            
        </div>
    )
}

export default connect()(Login);
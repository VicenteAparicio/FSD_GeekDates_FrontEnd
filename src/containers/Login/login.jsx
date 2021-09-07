// IMPORT MOTORS
import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT COMPONENTS
// import BtLink from '../../components/BtLink/btlink';
// IMPORT ACTIONS
import {LOGIN, GETINFO} from '../../redux/types';



const Login = (props) => {

    // let connection = "http://127.0.0.1:8000/api";
    let connection = "https://geeksdateback.herokuapp.com/api";

    let history = useHistory();

    // Hooks
    const [credentials, setCredentials] = useState({email:'',password:'',options:'user'});

    // Handler
    const updateCredentials = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

   // FUNCION LOGUEAR
   const SignIn = async () => {

    
    try {
        // A continuación genearmos el body de datos
        let body = {
            email: credentials.email.toLowerCase(),
            password: credentials.password,
        }

        let res = await axios.post(`${connection}/login`, body)
        if (res) {
            //Guardo en RDX
            props.dispatch({type:LOGIN,payload:res.data});
            props.dispatch({type:GETINFO,payload:res.data.user});
            
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
        }
    } catch (error) {
        alert(error)
    }  
}



    return (
        <div className="container">
            <div className="boxOptions">
                <div className="boxLogin">
                    
                    <input className="inputs" type="email" name="email" onChange={updateCredentials} placeholder="Email"></input>
                    
                    <input className="inputs" type="password" name="password" onChange={updateCredentials} placeholder="Password"></input>

                    <div className="button" onClick={()=>SignIn()}>PLAY</div>
                    
                </div>

            <div className="barra"></div>

            <NavLink className="button" to="/register">NEW PLAYER</NavLink>

            </div>
            
        </div>
    )
}

export default connect()(Login);
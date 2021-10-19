// IMPORT MOTORS
import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT ACTIONS
import {LOGIN, GETINFO, GETHOBBIES} from '../../redux/types';



const Login = (props) => {

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
        let body = {
            email: credentials.email.toLowerCase(),
            password: credentials.password,
        }

        let res = await axios.post(`${connection}/login`, body)
        if (res) {
            

            //SAVE ON REDUX USER AND TOKEN
            props.dispatch({type:LOGIN,payload:res.data});
            props.dispatch({type:GETINFO,payload:res.data.user});

            alert("Gracias por loguearte")

            let bodyHobbie = {
                user_id: res.data.user.id
            }

            let reso = await axios.post(`${connection}/gethobbies`, bodyHobbie, {headers: {'Authorization': `Bearer ${res.data.token}`}})
            props.dispatch({type:GETHOBBIES,payload:reso.data.data[0]});

            

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
        <div className="containerHome">

            <div className="boxOptions">

                <div className="boxLogin">

                    <div className="inputBox">
                        <input className="inputs" type="email" name="email" onChange={updateCredentials} placeholder="Email"></input>
                    </div>
                    
                    <div className="inputBox">
                        <input className="inputs" type="password" name="password" onChange={updateCredentials} placeholder="Password"></input>
                    </div>
                    
                </div>
                
                <div className="button" onClick={()=>SignIn()}>PLAY</div>
            
                <NavLink className="button" to="/register">NEW PLAYER</NavLink>
                
            </div>
            
        </div>
    )
}

export default connect()(Login);
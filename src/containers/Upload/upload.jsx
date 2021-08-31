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

const Upload = (props) => {

    // let connection = "http://127.0.0.1:8000/api";
    let connection = "https://geeksdatebackend.herokuapp.com";

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
                alert("Gracias por loguearte")
                if(!res.data.token){
                    history.push('/register')
                } else if (!res.data.user.name) {
                    history.push('/updateinfo')                
                } else if (!res.data.user.gender) {
                    history.push('/updatesexualinfo')                
                }
            }
        } catch (error) {
            alert(error)
        };  
    }

    return (
        <div className="containerLogin">

        </div>
    )
}

export default connect()(Upload);
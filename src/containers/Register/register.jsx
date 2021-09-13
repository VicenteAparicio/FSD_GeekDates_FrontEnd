// IMPORT MOTORS
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT ACTIONS
import {LOGIN, GETINFO} from '../../redux/types';

const Register = (props) => {

    // let connection = "http://127.0.0.1:8000/api";
    let connection = "https://geeksdateback.herokuapp.com/api";
    
    let history = useHistory();

    // Hooks
    const [credentials, setCredentials] = useState({nick:'',email:'',password:'',age:'',phone:'',isAdmin:'false',isPremium:'false',isActive:'true'});

    const [errors, setErrors] = useState({eNick:'',eEmail:'',ePassword:'',ePhone:''});

    // Handler
    const updateCredentials = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    // FUNCTION ERROR CHECK
    const checkError = (arg) => {
        switch (arg){
            case 'nick':
                if ((credentials.nick.length < 2)||(! /^[a-z ,.'-]+$/i.test(credentials.nick))||(credentials.nick.length > 20)){
                    if (arg==='nick'){
                        setErrors({...errors, eNick: 'Not a validate nick'});
                    } 
                } else {
                    setErrors({...errors, eNick: ''});
                }
            break;

            case 'email':
                if (! /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(credentials.email)){
                    setErrors({...errors, eEmail: 'Not a validate email'});
                } else {
                    setErrors({...errors, eEmail: ''});
                }
                
            break;

            case 'password':
                if (! /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(credentials.password)){
                    setErrors({...errors, ePassword: 'Must contain at least 8 characters: 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters'});
                } else {
                    setErrors({...errors, ePassword: ''});
                }
            break;

            case 'phone':
                if ((! /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm.test(credentials.phone))||(credentials.phone.length > 16)){
                    setErrors({...errors, ePhone: 'Wrong phone number'});
                } else {
                    setErrors({...errors, ePhone: ''});
                }
            break;

            case 'age':
                if (credentials.age<18) {
                    setErrors({...errors, eAge: "You need be older than 18 to access here"});
                } else {
                    setErrors({...errors, eAge: ''});
                }
            break;

            default:
                break;
        }
    }

    const Registration = async () => {

        try {
            //A continuación generamos el body de datos
            let body = {
                email: credentials.email,
                password: credentials.password,
                nick: credentials.nick,
                phone: credentials.phone,
                age: credentials.age,
                isAdmin: credentials.isAdmin,
                isPremium: credentials.isPremium,
                isActive: credentials.isActive
            }
            let res = await axios.post(`${connection}/register`, body)
            if(res){
                alert("Gracias por registrarte con nosotros");
                SignIn();
            }
        }
        catch (error) {
                console.log(error);
        }   
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
            // SAVE ON REDUX USER AND TOKEN
            props.dispatch({type:LOGIN,payload:res.data});
            props.dispatch({type:GETINFO,payload:res.data.user});

            history.push('/updateInfo')
            
        }

    } catch (error) {
        alert(error)
    }  
}
    

    return (

        <div className="container">     

            <div className="boxOptions">

                <div className="titleSection">CREATE NEW PLAYER</div>

                        <input require="true" className="inputs" type="text" name="nick" onChange={updateCredentials} onBlur={()=>checkError("nick")} placeholder="Nick"/>
                        <div className="validateError">{errors.eNick}</div>

                        <input require="true" className="inputs" type="number" name="phone" onChange={updateCredentials} onBlur={()=>checkError("phone")} placeholder="Phone"/>
                        <div className="validateError">{errors.ePhone}</div>

                        <input require="true" className="inputs" type="email" name="email" onChange={updateCredentials} onBlur={()=>checkError("email")} placeholder="Email"/>
                        <div className="validateError">{errors.eEmail}</div>

                        <input require="true" className="inputs" type="password" name="password" onChange={updateCredentials} onBlur={()=>checkError("password")} placeholder="Password"/>
                        <div className="validateError">{errors.ePassword}</div>

                        <input className="inputs" type="number" name="age" onChange={updateCredentials} onBlur={()=>checkError("age")} placeholder="Age"/>
                        <div className="validateError">{errors.eAge}</div>

                        <div className="button" onClick={()=>Registration()}>CONTINUE</div>

                </div>

        </div>
    )
}

export default connect()(Register);
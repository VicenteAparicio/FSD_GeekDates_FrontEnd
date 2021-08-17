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

const Register = (props) => {

    let connection = "http://127.0.0.1:8000/api";
    // let connection = "https://killfilmsbackend.herokuapp.com";
    
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

        axios
            .post(`${connection}/register`, body)
            .then((res)=>{
                if(res){
                    alert("Gracias por registrarte con nosotros");
                    history.push('/login');
                }
            })
            .catch((error)=>{
                console.log(error);
            });   
    }
    

    

    return (

        <div className="containerRegister">     

            <div className="containerBox">

                <div className="titleSection">REGISTER</div>

                <div className="boxRegister">

                    <div className="regData">

                        <label className="labelsRegister" for="nick">NICK</label>
                        <input require="true" className="inputs" type="text" name="nick" onChange={updateCredentials} onBlur={()=>checkError("nick")} placeholder="Nick"/>
                        <div className="validateError">{errors.eNick}</div>

                        <label className="labelsRegister" for="phone">PHONE</label>
                        <input require="true" className="inputs" type="number" name="phone" onChange={updateCredentials} onBlur={()=>checkError("phone")} placeholder="Phone"/>
                        <div className="validateError">{errors.ePhone}</div>

                        <label className="labelsRegister" for="email">EMAIL</label>
                        <input require="true" className="inputs" type="email" name="email" onChange={updateCredentials} onBlur={()=>checkError("email")} placeholder="Email"/>
                        <div className="validateError">{errors.eEmail}</div>

                        <label className="labelsRegister" for="password">PASSWORD</label>
                        <input require="true" className="inputs" type="password" name="password" onChange={updateCredentials} onBlur={()=>checkError("password")} placeholder="Password"/>
                        <div className="validateError">{errors.ePassword}</div>

                        <label className="labelsRegister" for="age">AGE</label>
                        <input className="inputs" type="number" name="age" onChange={updateCredentials} onBlur={()=>checkError("age")} placeholder="Age"/>
                        <div className="validateError">{errors.eAge}</div>

                    </div>

                </div>
                
                <div className="sendButton" onClick={()=>Registration()}><FontAwesomeIcon className="faLogin" icon={faPaperPlane}/></div>
            </div>

        </div>
    )
}

export default connect()(Register);
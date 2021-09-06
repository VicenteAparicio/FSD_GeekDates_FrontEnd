// IMPORT MOTORS
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// IMPORT COMPONENTS
import Nav from '../../components/Nav/nav';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

const Register = () => {

    let connection = "http://127.0.0.1:8000/api";
    // let connection = "https://killfilmsbackend.herokuapp.com";
    
    let history = useHistory();

    // Hooks
    const [credentials, setCredentials] = useState({nick:'',name:'',surname:'',email:'',password:'',age:'',gender:'',country:'',city:'', cp:'',urlpic:'',isAdmin:'false',isPremium:'false',isActive:'true'});

    const [errors, setErrors] = useState({eNick:'',eName:'',eSurname:'',eEmail:'',ePassword:'',eAge:'',eGender:'',eCountry:'',eCity:'', eCP:'',eUrlpic:'',ePhone:''});

    const [sexuality, setSexuality] = useState('heterosexual');
    const [gender, setGender] = useState('');
    const [lookingFor, setLookingFor] = useState('');

    // Handler
    const updateCredentials = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    const updateOrientation = (e) => {
        setSexuality(e.target.value);
    }
    
    const updateGender = (e) => {
        setGender(e.target.value);
    }
    const updateLookingFor = (e) => {
        setLookingFor(e.target.value);
    }

    // FUNCTION ERROR CHECK
    const checkError = (arg) => {
        switch (arg){
            case 'name':
            case 'cname':
            case 'lastname':
                if ((credentials.name.length < 2)||(! /^[a-z ,.'-]+$/i.test(credentials.name))||(credentials.name.length > 20)){
                    if (arg==='name'){
                        setErrors({...errors, eName: 'Not a validate name'});
                    } 
                    // else if (arg==='cname'){
                    //     setErrors({...errors, eCName: 'Not a validate name'});
                    // } 
                    else if (arg==='surname'){
                        setErrors({...errors, eLastName: 'Not a validate surname'});
                    }
                    // else if (arg==='csurname'){
                    //     setErrors({...errors, eCLastName: 'Not a validate surname'});
                    // }
                } else {
                    setErrors({...errors, eName: ''});
                    setErrors({...errors, eCName: ''});
                    setErrors({...errors, eSurname: ''});
                    setErrors({...errors, eCSurname: ''});
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

    const Registration = async () => {

        //A continuación generamos el body de datos
        let body = {
            email: credentials.email,
            password: credentials.password,
            nick: credentials.nick,
            phone: credentials.phone,
            // name: credentials.name,
            // surname: credentials.surname,
            // age: credentials.age,            
            // country: credentials.country,
            // city: credentials.city,
            // cp: credentials.cp,
            // // urlpic: credentials.urlpic,
            // gender: gender,
            // sexuality: sexuality,
            // lookingFor: lookingFor,
            // isAdmin: credentials.isAdmin,
            // isPremium: credentials.isPremium,
            // isActive: credentials.isActive
        }

        console.log(body)
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
            <Nav/>
            

            <div className="containerBox">

                <div className="titleSection">DATA INFO</div>

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
                            {/* 
                        <label className="labelsRegister" for="urlpic">PHOTO</label>
                        <input className="inputs" type="text" name="urlpic" onChange={updateCredentials} onBlur={()=>checkError("urlpic")} placeholder="Photo"/>
                        <div className="validateError">{errors.eUrlpic}</div> */}

                    </div>

                    <div className="regData">

                        <label className="labelsRegister" for="name">NAME</label>
                        <input require="true" className="inputs" type="text" name="name" onChange={updateCredentials} onBlur={()=>checkError("name")} placeholder="Name"/>
                        <div className="validateError">{errors.eName}</div>

                        <label className="labelsRegister" for="surname">SURNAME</label>
                        <input require="true" className="inputs" type="text" name="surname" onChange={updateCredentials} onBlur={()=>checkError("surname")} placeholder="Surname"/>
                        <div className="validateError">{errors.eSurname}</div>

                        <label className="labelsRegister" for="age">AGE</label>
                        <input className="inputs" type="number" name="age" onChange={updateCredentials} onBlur={()=>checkError("age")} placeholder="Age"/>
                        <div className="validateError">{errors.eAge}</div>

                        {/*
                        <label className="labelsRegister" for="gender">GENDER</label>
                         <select onChange={updateGender}>
                            {genderOptions.map((option)=>(
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        
                        <label className="labelsRegister" for="sexualOrientation">SEXUAL ORIENTATION</label>
                        <select onChange={updateSexuality}>
                            {sexualOptions.map((option)=>(
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        */}

                    </div>
                
                    <div className="regData">
                            
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
                
                <div className="titleSection">PERSONAL INFO</div>
                
                <div className="boxRegister">
                    

                    <div className="regData">

                        <div className="checkerBox">
                            <div className="preferenceLabels">SEX</div>
                        
                            
                            {genderOptions.map((option)=>(
                                <div className="checkOpt" key={index}>
                                    <input className="radioInputs" type="radio" name="gender" value={option.value} onChange={updateGender}/>
                                    <label for={option.value}>{option.label}</label>
                                </div>
                            ))}
                        </div>

                    </div>
                    
                    <div className="regData">

                        <div className="checkerBox"> 
                            <div className="preferenceLabels">ORIENTATION</div> 
                             
                            {sexualOrientation.map((option)=>(
                                <div className="checkOpt" key={index}>
                                    <input className="radioInputs" type="radio" name="orientation" value={option.value} onClick={updateOrientation}/>
                                    <label for={option.value}>{option.label}</label>
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className="regData">

                        <div className="checkerBox">
                            <div className="preferenceLabels">LOOK FOR</div> 
                        
                            {lookForOptions.map((option)=>(
                                <div className="checkOpt" key={index}>
                                    <input className="radioInputs" type="radio" name="lookingFor" value={option.value} onClick={updateLookingFor}/>
                                    <label for={option.value}>{option.label}</label>
                                </div>
                            ))}
                        </div>
                    
                    </div>
                    
                </div>
                <div className="sendButton" onClick={()=>Registration()}><FontAwesomeIcon className="faLogin" icon={faPaperPlane}/></div>
            </div>

        </div>
    )
}

export default Register;
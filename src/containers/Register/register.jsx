// IMPORT MOTORS
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

const Register = () => {

    let connection = "http://127.0.0.1:8000/api";
    // let connection = "https://killfilmsbackend.herokuapp.com";
    
    let history = useHistory();

    // Hooks
    const [credentials, setCredentials] = useState({nick:'',name:'',surname:'',email:'',password:'',age:'', gender:'', country:'',city:'', cp:'',isAdmin:'false',isPremium:'false',isActive:'true'});

    const [errors, setErrors] = useState({eNick:'', eName: '',eSurname: '',eEmail: '',ePassword:'',eAge:'', eGender:'', eCountry:'',eCity:'', eCP:'', ePhone:''});

    const[sexuality, setSexuality] = useState('heterosexual');

    // Handler
    const updateCredentials = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    const updateSexuality = (e) => {
        setSexuality(e.target.value);
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
                    } else if (arg==='cname'){
                        setErrors({...errors, eCName: 'Not a validate name'});
                    } else if (arg==='surname'){
                        setErrors({...errors, eLastName: 'Not a validate surname'});
                    } else if (arg==='csurname'){
                        setErrors({...errors, eCLastName: 'Not a validate surname'});
                    }
                }else{
                    setErrors({...errors, eName: ''});
                    setErrors({...errors, eCName: ''});
                    setErrors({...errors, eSurname: ''});
                    setErrors({...errors, eCSurname: ''});
                }
            break;

            case 'email':
                if (! /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(credentials.email)){
                    setErrors({...errors, eEmail: 'Not a validate email'});
                }else{
                    setErrors({...errors, eEmail: ''});
                }
                
            break;

            case 'password':
                if (! /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(credentials.password)){
                    setErrors({...errors, ePassword: 'Must contain at least 8 characters: 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters'});
                }else{
                    setErrors({...errors, ePassword: ''});
                }
            break;

            case 'phone':
                if ((! /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm.test(credentials.phone))||(credentials.phone.length > 16)){
                    setErrors({...errors, ePhone: 'Wrong phone number'});
                }else{
                    setErrors({...errors, ePhone: ''});
                }
            break;


            default:
                break;
        }
    }

    const sexualOptions = [
        {
            label: "CHOOSE",
            value: ""
        },
        {
            label: "HETEROSEXUAL",
            value: "heterosexual"
        },
        {
            label: "GAY",
            value: "gay"
        },
        {
            label: "BISEXUAL",
            value: "bisexual"
        },
    ];

    const Registration = async () => {

        //A continuación genearmos el body de datos
        let body = {
            nick: credentials.nick,
            name: credentials.name,
            surname: credentials.surname,
            email: credentials.email,
            password: credentials.password,
            age: credentials.age,            
            phone: credentials.phone,
            country: credentials.country,
            city: credentials.city,
            cp: credentials.cp,
            gender: credentials.gender,
            sexuality: sexuality,
            isAdmin: credentials.isAdmin,
            isPremium: credentials.isPremium,
            isActive: credentials.isActive
        }

        console.log(body)
        axios
            .post(`${connection}/register`, body)
            .then((res)=>{
                if(res){
                    alert("Gracias por registrarte con nosotros")
                    history.push('/login')
                }
            })
            .catch((error)=>{
                console.log(error);
            });   
    }
    

    

    return (

        <div className="containerRegister">
            <div className="boxRegister">
                <div className="personalInfo">
                    <div className="titleSection">PERSONAL INFO</div>

                    <label className="labelsRegister" for="nick">NICK</label>
                    <input require="true" className="inputsRegister" type="text" name="nick" onChange={updateCredentials} onBlur={()=>checkError("nick")} placeholder="Nick"/>
                    <div className="validateError">{errors.eNick}</div>

                    <label className="labelsRegister" for="name">NAME</label>
                    <input require="true" className="inputsRegister" type="text" name="name" onChange={updateCredentials} onBlur={()=>checkError("name")} placeholder="Name"/>
                    <div className="validateError">{errors.eName}</div>

                    <label className="labelsRegister" for="surname">SURNAME</label>
                    <input require="true" className="inputsRegister" type="text" name="surname" onChange={updateCredentials} onBlur={()=>checkError("surname")} placeholder="Surname"/>
                    <div className="validateError">{errors.eSurname}</div>

                    <label className="labelsRegister" for="email">EMAIL</label>
                    <input require="true" className="inputsRegister" type="email" name="email" onChange={updateCredentials} onBlur={()=>checkError("email")} placeholder="Email"/>
                    <div className="validateError">{errors.eEmail}</div>

                    <label className="labelsRegister" for="phone">PHONE</label>
                    <input require="true" className="inputsRegister" type="number" name="phone" onChange={updateCredentials} onBlur={()=>checkError("phone")} placeholder="Phone"/>
                    <div className="validateError">{errors.ePhone}</div>

                    <label className="labelsRegister" for="password">PASSWORD</label>
                    <input require="true" className="inputsRegister" type="password" name="password" onChange={updateCredentials} onBlur={()=>checkError("password")} placeholder="Password"/>
                    <div className="validateError">{errors.ePassword}</div>

                    <label className="labelsRegister" for="age">AGE</label>
                    <input className="inputsRegister" type="number" name="age" onChange={updateCredentials} onBlur={()=>checkError("age")} placeholder="Age"/>
                    <div className="validateError">{errors.eAge}</div>

                    <label className="labelsRegister" for="gender">GENDER</label>
                    <input className="inputsRegister" type="text" name="gender" onChange={updateCredentials} onBlur={()=>checkError("gender")} placeholder="Gender"/>
                    <div className="validateError">{errors.eGender}</div>

                    <label className="labelsRegister" for="sexualOrientation">SEXUAL ORIENTATION</label>
                    <select value="" onChange={updateSexuality}>
                        {sexualOptions.map((option)=>(
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>   

                    <label className="labelsRegister" for="country">COUNTRY</label>
                    <input className="inputsRegister" type="text" name="country" onChange={updateCredentials} onBlur={()=>checkError("country")} placeholder="Country"/>
                    <div className="validateError">{errors.eCountry}</div>

                    <label className="labelsRegister" for="city">CITY</label>
                    <input className="inputsRegister" type="text" name="city" onChange={updateCredentials} onBlur={()=>checkError("city")} placeholder="City"/>
                    <div className="validateError">{errors.eCity}</div>

                    <label className="labelsRegister" for="cp">CP</label>
                    <input className="inputsRegister" type="text" name="cp" onChange={updateCredentials} onBlur={()=>checkError("cp")} placeholder="C.P."/>
                    <div className="validateError">{errors.eCP}</div>
                </div>

    
                

                <div className="sendButton" onClick={()=>Registration()}><FontAwesomeIcon className="faLogin" icon={faPaperPlane}/></div>
            </div>
        </div>
    )

}

export default Register;
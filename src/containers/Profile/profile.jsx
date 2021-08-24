// IMPORT MOTORS
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
// IMPORT ACTIONS
import {GETINFO} from '../../redux/types';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faPen, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


const Profile = (props) => {

    // let connection = "http://127.0.0.1:8000/api";
    let connection = "https://geeksdatebackend.herokuapp.com/";

    let history = useHistory();

    // HOOKS
    const [userEdit, setUserEdit] = useState({nick:props.getInfo.nick,name:props.getInfo.name, surname:props.getInfo.surname,age:props.getInfo.age,email:props.getInfo.email,country:props.getInfo.country,city:props.getInfo.city,cp:props.getInfo.cp});
    // const [userEdit, setUserEdit] = useState({name:'', surname:'',age:'',email:'',country:'',city:'',cp:''});
    const [allowEdit, setAllowEdit] = useState(false);

    useEffect(()=>{
        
    },[])
    // HANDLER
    const updateUser = (e) => {
        setUserEdit({...userEdit, [e.target.name]: e.target.value});
    }
    const edit = () => {
        setAllowEdit(true)
    }
    const cancelEdit = () => {
        setAllowEdit(false)
    }


    const saveEdit = async () => {
        let body = {
            "user_id": props.logData.user.id,
            "name": userEdit.name,
            "surname": userEdit.surname,
            // "password": userEdit.password,
            "email": userEdit.email,
            "country": userEdit.country,
            "city": userEdit.city,
            "cp": userEdit.cp
        }

        axios
        .post(`${connection}/updateinfo`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}})
        .then((res)=>{
            if (res){
                props.dispatch({type:GETINFO,payload:res.data.user});

            }
        })
        .catch((error)=>{
            console.log(error);
        });

        setAllowEdit(false);
    }


    const deleteUser = async (userId) => {
        
        try{
            let body = {
                "user_id": userId
            }
            await axios.post(`${connection}/deleteuser`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}})
        } catch (err) {
            console.log({message: err.message})
        }
        setTimeout(()=>{
            history.push("/register");
        }, 1000)
    }


    if (props.logData.token && allowEdit === false){
        return (
            <div className="profileContainer">
                     
                <div className="profileBox">
                    <div className="profileCard">
                        <div className="profileInfo">NICK: {userEdit.nick}</div>
                        <div className="profileInfo">NAME: {userEdit.name}</div>
                        <div className="profileInfo">SURNAME: {userEdit.surname}</div>
                        <div className="profileInfo">AGE: {userEdit.age}</div>
                        <div className="profileInfo">EMAIL: {userEdit.email}</div>
                        <div className="profileInfo">COUNTRY: {userEdit.country}</div>
                        <div className="profileInfo">CITY: {userEdit.city}</div>
                        <div className="profileInfo">C.P.: {userEdit.cp}</div>
                        
                        <div className="boxButton">
                            <div className="buttonProfile" onClick={()=>edit()}><FontAwesomeIcon className="faIcons" icon={faPen}/></div>
                            <div className="buttonProfile" onClick={()=>deleteUser(props.logData.user.id)}><FontAwesomeIcon className="faIcons" icon={faMinusSquare}/></div>
                        </div>
                    </div>
                
                    
                </div>
            </div>
            )
    } else if (props.logData.token && allowEdit === true) {
        return (
            <div className="profileContainer">
                
                <div className="profileBox">
                    <div className="profileCard">
                        <div className="titleSection">EDIT ACCOUNT</div>
                        <input className="upDataInfo" onChange={updateUser} type="text" name="nick" placeholder={userEdit.nick}></input>
                        <input className="upDataInfo" onChange={updateUser} type="text" name="name" placeholder={userEdit.name}></input>
                        <input className="upDataInfo" onChange={updateUser} type="text" name="surname" placeholder={userEdit.surname}></input>
                        <input className="upDataInfo" onChange={updateUser} type="text" name="email" placeholder={userEdit.email}></input>
                        {/* <input className="upDataInfo" onChange={updateUser} type="password" name="password" placeholder="Password" required></input> */}
                        <input className="upDataInfo" onChange={updateUser} type="text" name="country" placeholder={userEdit.country}></input>
                        <input className="upDataInfo" onChange={updateUser} type="text" name="city" placeholder={userEdit.city}></input>
                        <input className="upDataInfo" onChange={updateUser} type="text" name="cp" placeholder={userEdit.cp}></input>
                    </div>
                    <div className="boxButton">
                        <div className="buttonProfile" onClick={()=>saveEdit()}><FontAwesomeIcon className="faIcons" icon={faSave}/></div>
                        <div className="buttonProfile" onClick={()=>cancelEdit()}><FontAwesomeIcon className="faIcons" icon={faTimesCircle}/></div>
                    </div>
                </div>
            </div>
        )
    
    } else {
        setTimeout(()=>{
            history.push('/')
        }, 1000)
        return (
            <div></div>
        )
    }
}

export default connect((state)=>(
    {logData:state.credentials,
    getInfo:state.getinfo}
))(Profile);
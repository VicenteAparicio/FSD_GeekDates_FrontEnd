// IMPORT MOTORS
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {NavLink, useHistory} from 'react-router-dom';
import axios from 'axios';
// IMPORT ACTIONS
import {GETINFO} from '../../redux/types';



const Profile = (props) => {

    // let connection = "http://127.0.0.1:8000/api";
    let connection = "https://geeksdateback.herokuapp.com/api";

    let history = useHistory();

    // HOOKS
    const [userEdit, setUserEdit] = useState({nick:props.getInfo.nick, urlpic:props.getInfo.urlpic, name:props.getInfo.name, surname:props.getInfo.surname, email: props.getInfo.email, age:props.getInfo.age, country:props.getInfo.country, city:props.getInfo.city, cp:props.getInfo.cp, description:props.getInfo.description});
    const [passw, setPassw] = useState('');
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

    const updatePassw = (e) => {
        setPassw(e.target.value)
    }


    const saveEdit = async () => {
        
        try {

            let body = {
                "user_id": props.logData.user.id,
                "nick": userEdit.nick,
                "name": userEdit.name,
                "surname": userEdit.surname,
                "email": userEdit.email,
                "country": userEdit.country,
                "city": userEdit.city,
                "cp": userEdit.cp,
                "description": userEdit.description
            }

            if (passw !== ''){
                let newPass = {
                    password: passw
                }
                await axios.post(`${connection}/updatePass`, newPass, {headers: {'Authorization': `Bearer ${props.logData.token}`}})
            }
            
            let res = await axios.post(`${connection}/updateinfo`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}})

            if (res){
                props.dispatch({type:GETINFO,payload:res.data.user});
            }
        
        } catch (err) {
            console.log({message: err.message});
        }
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

    console.log("Este es mi props", props.hobby.data[0])

    if (props.logData.token && allowEdit === false){
        return (
            <div className="containerProfile">
                <div className="boxPhoto">
                    <div className="portrait">
                        <img className="photo" src={userEdit.urlpic}/>
                    </div>
                </div>

                <div className="profileBox">
                
                    <div className="profileCard">
                        
                        <div className="profileInfo"><div className="info">NICK:</div>{userEdit.nick}</div>
                        <div className="profileInfo"><div className="info">NAME:</div>{userEdit.name}</div>
                        <div className="profileInfo"><div className="info">SURNAME:</div>{userEdit.surname}</div>
                        <div className="profileInfo"><div className="info">AGE:</div>{userEdit.age}</div>
                        <div className="profileInfo"><div className="info">MAIL:</div> {userEdit.email}</div>
                        <div className="profileInfo"><div className="info">COUNTRY:</div>{userEdit.country}</div>
                        <div className="profileInfo"><div className="info">CITY:</div> {userEdit.city}</div>
                        <div className="profileInfo"><div className="info">C.P.:</div> {userEdit.cp}</div>
                        <div className="profileInfo"><div className="info">HOBBIES:</div>
                        <div className="hobbiesInfo">
                                    {props.hobby.data[0].tablegames ? <div className="hobInfo">Tablegames</div> : ''}
                                    {props.hobby.data[0].rolegames ? <div className="hobInfo">Rolegames</div> : ''}
                                    {props.hobby.data[0].videogames ? <div className="hobInfo">Videogames</div> : ''}
                                    {props.hobby.data[0].cosplay ? <div className="hobInfo">Cosplay</div> : ''}
                                    {props.hobby.data[0].anime ? <div className="hobInfo">Anime</div> : ''}
                                </div></div>
                        <div className="profileInfo infoText info">DESCRIPTION:</div>
                        <div className="profileInfoText">{userEdit.description}</div>
                        

                    </div>
                    <div className="boxButton">
                        <div className="button" onClick={()=>edit()}>EDIT</div>
                        <NavLink className="button" to="/updateSexualInfo">PREFERENCES</NavLink>
                        <NavLink className="button" to="/hobbies">HOBBIES</NavLink>
                        <NavLink className="button" to="/upload">PHOTO</NavLink>
                        <div className="button" onClick={()=>deleteUser(props.logData.user.id)}>DELETE</div>
                    </div>
                    
                
                    
                </div>
            </div>
            )
    } else if (props.logData.token && allowEdit === true) {
        return (
            <div className="containerHome">
                
                <div className="profileBox">
                    <div className="titleSection">EDIT ACCOUNT</div>
                    <div className="profileCard">
                        <input className="upDataInfo" onChange={updateUser} type="text" name="nick" placeholder={userEdit.nick}></input>
                        <input className="upDataInfo" onChange={updateUser} type="text" name="name" placeholder={userEdit.name}></input>
                        <input className="upDataInfo" onChange={updateUser} type="text" name="surname" placeholder={userEdit.surname}></input>
                        <input className="upDataInfo" onChange={updatePassw} type="password" name="password" placeholder="Password" required></input>
                        <input className="upDataInfo" onChange={updateUser} type="text" name="country" placeholder={userEdit.country}></input>
                        <input className="upDataInfo" onChange={updateUser} type="text" name="city" placeholder={userEdit.city}></input>
                        <input className="upDataInfo" onChange={updateUser} type="text" name="cp" placeholder={userEdit.cp}></input>
                        <input className="upDataInfo" onChange={updateUser} type="text" name="description" placeholder={userEdit.description}></input>
                    </div>
                    <div className="boxButton">
                        <div className="button" onClick={()=>saveEdit()}>SAVE</div>
                        <div className="button" onClick={()=>cancelEdit()}>CANCEL</div>
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
    getInfo:state.getinfo,
    hobby:state.gethobbies}
))(Profile);
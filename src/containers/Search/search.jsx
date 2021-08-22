// IMPORT MOTORS
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Search = (props) => {

    let connection = "http://127.0.0.1:8000/api";
    // let connection = "https://killfilmsbackend.herokuapp.com";
    
    let history = useHistory();

    // Hooks
    const [players, setPlayers] = useState([]);
    const [age, setAge] = useState({from:18, to:99});
    const [filtPlayers, setFiltPlayers] = useState([]);

    // Handler
    const ageRange = (e) => {
        setAge({...age, [e.target.name]: e.target.value});
    }

    useEffect(()=>{
        defaultPlayers();
        filtered();
    }, []);



    const updateAge = () => {
        setFiltPlayers(
            players.filter((player)=>
                player.age>=age.from && player.age<=age.to
            )
        );
    }

    const filtered = () => {
        console.log(props.getInfo.id)
        console.log(props.logData.user.id)
        setFiltPlayers(
            players.filter((player)=>
                player.user_id!=props.logData.user.id
            )
        );
    }    

    // DEFAULT SEARCH BASED ON USER PREFERENCES
    const defaultPlayers = async () => {

        let body = {
            "user_id": props.logData.user.id,
            "lookingfor":props.getInfo.lookingfor,
            "gender":props.getInfo.gender,
        }
        try{
            let res = await axios.post(`${connection}/defaultsearch`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}});
            if (res) {
                setPlayers(res.data.data);
                console.log(res.data.data)
            }
        } catch (err) {
            console.log({message: err.message})
        }
    }


    if (props.logData.token) {

        return (

            <div className="containerSearch">

                <div className="ageFilter">
                    <input className="ageRange" defaultValue="18" type="number" name="from" placeholder="from" onChange={ageRange}></input>
                    <input className="ageRange" defaultValue="99" type="number" name="to" placeholder="to" onChange={ageRange}></input>
                    <div className="buttonAge" onClick={()=>updateAge()}>AGE</div>
                    <div className="buttonAge" onClick={()=>filtered()}>Filtered</div>
                </div>
                <div className="boxSearch">
                    {filtPlayers.map((player, index)=>(
                        
                            <div className="playerCard" key={index} >
                                <div className="cardInfo">{player.user_id}</div>
                                <div className="cardInfo">{player.nick}</div>
                                <div className="cardInfo">{player.age} años</div>
                                <div className="cardInfo">{player.city}</div>
                                <div className="boxCardButtons">
                                    <div className="cardButtons"><FontAwesomeIcon className="faIcons" icon={faTimes}/></div>
                                    <div className="cardButtons"><FontAwesomeIcon className="faIcons" icon={faHeart}/></div>
                                </div>
                            </div>
                        
                    ))}
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
))(Search);
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

    const [players, setPlayers] = useState([]);
    const [filtPlayers, setFiltPlayers] = useState([]);

    const updateLookFor = () => {
        setFiltPlayers(
            players.filter((player)=>
                player.gender.toLowerCase().includes(props.getInfo.lookingfor)
            )
        );
    }

    useEffect(()=>{
        defaultPlayers();
    }, []);

    useEffect(()=>{

    });


    // DEFAULT SEARCH BASED ON USER PREFERENCES
    const defaultPlayers = async () => {

        let body = {
            "lookingfor":props.getInfo.lookingfor,
            "gender":props.getInfo.gender,
        }
        try{
            let res = await axios.post(`${connection}/defaultsearch`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}});
            if (res) {
                setPlayers(res.data.data);
            }
        } catch (err) {
            console.log({message: err.message})
        }
    }
    


    if (props.logData.token) {

        return (

            <div className="containerSearch">
                <div className="boxSearch">
                    {players.map((player, index)=>(
                        <div className="cardBox">
                            {console.log(player)}
                            <div className="playerCard" key={index}>
                                <div className="cardInfo">{player.nick}</div>
                                <div className="cardInfo">{player.age} años</div>
                                <div className="cardInfo">{player.city}</div>
                                <div className="boxCardButtons">
                                    <div className="cardButtons"><FontAwesomeIcon className="faIcons" icon={faTimes}/></div>
                                    <div className="cardButtons"><FontAwesomeIcon className="faIcons" icon={faHeart}/></div>
                                </div>
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
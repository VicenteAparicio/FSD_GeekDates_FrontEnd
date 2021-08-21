// IMPORT MOTORS
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

const Search = (props) => {

    let connection = "http://127.0.0.1:8000/api";
    // let connection = "https://killfilmsbackend.herokuapp.com";
    
    let history = useHistory();

    const [players, setPlayers] = useState([]);



    useEffect(()=>{
        allPlayers();
    }, []);

    useEffect(()=>{
    });

    const allPlayers = async () => {
        try{
            let res = await axios.get(`${connection}/allplayers`, {headers: {'Authorization': `Bearer ${props.logData.token}`}});
            setPlayers(res.data.data);
        } catch (err) {
            console.log({message: err.message})
        }
    }


    if (props.logData.token) {

        return (

            <div className="containerSearch">
                <div className="boxSearch">
                    {players.map((player, index)=>(
                        <div className="playerCard" key={index}>
                            <div className="cardInfo">{player.nick}</div>
                            <div className="cardInfo">{player.age} años</div>
                            <div className="cardInfo">{player.city}</div>
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
    {logData:state.credentials}
))(Search);
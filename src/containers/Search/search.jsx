// IMPORT MOTORS
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT COMPONENTS
import Nav from '../../components/Nav/nav';
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
    }, [])

    const allPlayers = async () => {
        try{
            let res = await axios.get(`${connection}/allplayers`, {headers: {'Authorization': `Bearer ${props.logData.token}`}});
            setPlayers(res.data.data);
            console.log(res)
        } catch (err) {
            console.log({message: err.message})
        }
    }
    allPlayers();


    if (props.logData.token) {

        return (

            <div className="containerSearch">
                
                

                {players.map((player, index)=>(
                    <div className="playerCard">
                        <div className="cardInfo">{player.nick}</div>
                        <div className="cardInfo">{player.age} años</div>
                        <div className="cardInfo">{player.city}</div>
                    </div>

                ))}
                


            </div>
        )
    } else {
        setTimeout(()=>{
            history.push('/')
        }, 1000)
        return (
            <div className="profileSearch">Not allowed</div>
        )
    }
}

export default connect((state)=>(
    {logData:state.credentials}
))(Search);
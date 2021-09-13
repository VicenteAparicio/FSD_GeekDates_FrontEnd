// IMPORT MOTORS
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart} from '@fortawesome/free-regular-svg-icons';


const Search = (props) => {

    let connection = "https://geeksdateback.herokuapp.com/api";
    
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
    }, []);


    // SEARCH BASED ON AGE RANGE
    const updateAge = () => {
        setFiltPlayers(
            players.filter((player)=>
                player.age>=age.from && player.age<=age.to && player.user_id!==props.logData.user.id
            )
        );
    }

    // DEFAULT SEARCH BASED ON USER PREFERENCES
    const defaultPlayers = async () => {

        let body = {
            "user_id": props.logData.user.id,
            "lookingfor":props.getInfo.lookingfor,
            "gender":props.getInfo.gender,
            "sexuality":props.getInfo.sexuality,
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

    // CREATE LOVER ROW AND WAIT FOR CONFIRMATION OR CONFIRM THE MATCH
    const Like = async (id) => {

        let body = {
            "user_a_id": props.logData.user.id,
            "user_b_id": id,
        }

        try{
            let res = await axios.post(`${connection}/match`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}});
            if (res) {
                alert(res.data.message);
            }
        } catch (err) {
            console.log({message: err.message})
        }
    }
    
    // EACH TIME USER CLICK ON FILTER THIS ADDS TO THE MAIN FILTER 
    const hobbieFn = (arg) =>{
            setFiltPlayers(players);
        switch(arg){

            case "tablegames":
                setFiltPlayers(
                    filtPlayers.filter((player)=>
                    player.tablegames==true && player.user_id!==props.logData.user.id
                    )
                );
                break;

            case "rolegames":
                setFiltPlayers(
                    filtPlayers.filter((player)=>
                    player.rolegames==true && player.user_id!==props.logData.user.id
                    )
                );
                break;

            case "videogames":
                setFiltPlayers(
                    filtPlayers.filter((player)=>
                    player.videogames==true && player.user_id!==props.logData.user.id
                    )
                );
                break;

            case "cosplay":
                setFiltPlayers(
                    filtPlayers.filter((player)=>
                    player.cosplay==true && player.user_id!==props.logData.user.id
                    )
                );
                break;

            case "anime":
                setFiltPlayers(
                    filtPlayers.filter((player)=>
                    player.anime==true && player.user_id!==props.logData.user.id
                    )
                );
                break;

            default:
                break;

        }
    }

    if (props.logData.token) {

        return (

            <div className="containerSearch">

                <div className="filters">
                    <div className="ageFilters">
                        <input className="ageRange" defaultValue="18" type="number" name="from" placeholder="from" onChange={ageRange}></input>
                        <input className="ageRange" defaultValue="99" type="number" name="to" placeholder="to" onChange={ageRange}></input>
                        <div className="button" onClick={()=>updateAge()}>SEARCH</div>
                    </div>
                    <div className="hobbieFilters">
                        <input className="buttonHobbies" type="radio" onChange={()=>hobbieFn("tablegames")} name="hobbies"/><label className="filterLabels" for="tablegames">TABLEGAMES</label>
                        <input className="buttonHobbies" type="radio" onChange={()=>hobbieFn("rolegames")}  name="hobbies"/><label className="filterLabels" for="rolegames">ROLEGAMES</label>
                        <input className="buttonHobbies" type="radio" onChange={()=>hobbieFn("videogames")} name="hobbies"/><label className="filterLabels" for="videogames">VIDEOGAMES</label>
                        <input className="buttonHobbies" type="radio" onChange={()=>hobbieFn("cosplay")}    name="hobbies"/><label className="filterLabels" for="cosplay">COSPLAY</label>
                        <input className="buttonHobbies" type="radio" onChange={()=>hobbieFn("anime")}      name="hobbies"/><label className="filterLabels" for="anime">ANIME</label>
                    </div>
                    
                </div>
                <div className="boxSearch">
                    {filtPlayers.map((player, index)=>(
                        
                            <div className="playerCard" key={index} >
                                <div className="playerPic">
                                    <img className="profilePhoto" src={player.urlpic}/>
                                </div>
                                <div className="cardInfo">
                                    <div>{player.nick.toUpperCase()}, {player.age}</div>
                                    <div>{player.city} </div>
                                </div>
                                <div className="textInfo">{player.description}</div>

                                <div className="hobbies">
                                    {player.tablegames ? <div className="cardInfo">TABLEGAMES</div> : ''}
                                    {player.rolegames ? <div className="cardInfo">ROLEGAMES</div> : ''}
                                    {player.videogames ? <div className="cardInfo">VIDEOGAMES</div> : ''}
                                    {player.cosplay ? <div className="cardInfo">COSPLAY</div> : ''}
                                    {player.anime ? <div className="cardInfo">ANIME</div> : ''}
                                </div>
                                <div className="boxCardButtons">
                                    <div className="cardButtons"><FontAwesomeIcon className="faIcons" icon={faHeart} onClick={()=>Like(player.user_id)}/></div>
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
    }
}

export default connect((state)=>(
    {logData:state.credentials,
    getInfo:state.getinfo}
))(Search);
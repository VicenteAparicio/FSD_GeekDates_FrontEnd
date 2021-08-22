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
    const [hobbie, setHobbie] = useState({tablegames:false, rolegames:false, videogames:false, cosplay:false, anime:false});

    // Handler
    const ageRange = (e) => {
        setAge({...age, [e.target.name]: e.target.value});
    }

    useEffect(()=>{
        defaultPlayers();
    }, []);

    useEffect(()=>{
    });

    // SEARCH BASED ON AGE RANGE
    const updateAge = () => {
        setFiltPlayers(
            players.filter((player)=>
                player.age>=age.from && player.age<=age.to&& player.user_id!==props.logData.user.id
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

    const hobbi123 = () => {
        let body = {
            tablegames: hobbie.tablegames,
            rolegames: hobbie.rolegames,
            videogames: hobbie.videogames,
            cosplay: hobbie.cosplay,
            anime: hobbie.anime,
        }
        console.log(body)
    }
 
    // const updateHoobies = () =>{
    //     setFiltPlayers(
    //         filtPlayers.filter((player)=>
    //         (player.rolegames==hobbie.rolegames||player.tablegames==1||player.videogames==hobbie.videogames||player.cosplay==hobbie.cosplay||player.anime==hobbie.anime)&& player.user_id!==props.logData.user.id
    //         )
    //     );
    // }

    // const hobbieFn = (arg) =>{
    //     switch(arg){

    //         case "tablegames":

    //             if(hobbie.tablegames == false){
    //                 setHobbie({...hobbie, [arg]: true});
    //                 setFiltPlayers(
    //                     players.filter((player)=>
    //                     player.tablegames==true&& player.user_id!==props.logData.user.id
    //                     )
    //                 );
    //             } else {
    //                 setHobbie({...hobbie, [arg]: false});
    //                 setFiltPlayers(
    //                     players.filter((player)=>
    //                     player.tablegames==false&& player.user_id!==props.logData.user.id
    //                     )
    //                 );
    //             }
    //             break;

    //         case "rolegames":

    //             if(hobbie.rolegames == 0){
    //                 setHobbie({...hobbie, [arg]: true});
    //                 setFiltPlayers(
    //                     players.filter((player)=>
    //                     player.rolegames==true&& player.user_id!==props.logData.user.id
    //                     )
    //                 );
    //             } else {
    //                 setHobbie({...hobbie, [arg]: false});
    //                 setFiltPlayers(
    //                     players.filter((player)=>
    //                     player.rolegames==false && player.user_id!==props.logData.user.id
    //                     )
    //                 );
    //             }
    //             break;

    //         case "videogames":
    //             if(hobbie.videogames === false){
    //                 setHobbie({...hobbie, [arg]: true});
    //             } else {
    //                 setHobbie({...hobbie, [arg]: false});
    //             }
    //             break;
    //         case "cosplay":
    //             if(hobbie.cosplay === false){
    //                 setHobbie({...hobbie, [arg]: true});
    //             } else {
    //                 setHobbie({...hobbie, [arg]: false});
    //             }
    //             break;
    //         case "anime":
    //             if(hobbie.anime === false){
    //                 setHobbie({...hobbie, [arg]: true});
    //             } else {
    //                 setHobbie({...hobbie, [arg]: false});
    //             }
    //             break;
    //         default:
    //             break;
    //     }
       
        
    // }

    const hobbieFn = (arg) =>{
        switch(arg){

            case "tablegames":
                setFiltPlayers(
                    players.filter((player)=>
                    player.tablegames==true&& player.user_id!==props.logData.user.id
                    )
                );
                break;

            case "rolegames":
                setFiltPlayers(
                    players.filter((player)=>
                    player.rolegames==true&& player.user_id!==props.logData.user.id
                    )
                );
                break;

            case "videogames":
                setFiltPlayers(
                    players.filter((player)=>
                    player.videogames==true&& player.user_id!==props.logData.user.id
                    )
                );
                break;

            case "cosplay":
                setFiltPlayers(
                    players.filter((player)=>
                    player.cosplay==true&& player.user_id!==props.logData.user.id
                    )
                );
                break;

            case "anime":
                setFiltPlayers(
                    players.filter((player)=>
                    player.anime==true&& player.user_id!==props.logData.user.id
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
                        <div className="buttonAge" onClick={()=>updateAge()}>GO</div>
                    </div>
                    <div className="hobbieFilters">
                        <input className="buttonHobbies" type="radio" placeholder="option" onChange={()=>hobbieFn("tablegames")} name="hobbies"/><div>TABLEGAMES</div>
                        <input className="buttonHobbies" type="radio" placeholder="option" onChange={()=>hobbieFn("rolegames")}  name="hobbies" /><div>ROLEGAMES</div>
                        <input className="buttonHobbies" type="radio" placeholder="option" onChange={()=>hobbieFn("videogames")} name="hobbies"/><div>VIDEOGAMES</div>
                        <input className="buttonHobbies" type="radio" placeholder="option" onChange={()=>hobbieFn("cosplay")}    name="hobbies"   /><div>COSPLAY</div>
                        <input className="buttonHobbies" type="radio" placeholder="option" onChange={()=>hobbieFn("anime")}      name="hobbies"     /><div>ANIME</div>
                    </div>
                    
                </div>
                <div className="boxSearch">
                    {filtPlayers.map((player, index)=>(
                        
                            <div className="playerCard" key={index} >
                                <div className="cardInfo">{player.user_id}</div>
                                <div className="cardInfo">{player.nick}</div>
                                <div className="cardInfo">{player.age} años</div>
                                <div className="cardInfo">{player.city}</div>
                                <div className="cardInfo">tablegames {player.tablegames}</div>
                                <div className="cardInfo">rolegames {player.rolegames}</div>
                                <div className="cardInfo">videogames {player.videogames}</div>
                                <div className="cardInfo">cosplay {player.cosplay}</div>
                                <div className="cardInfo">anime {player.anime}</div>
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
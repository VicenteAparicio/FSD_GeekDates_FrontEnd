// IMPORT MOTORS
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart} from '@fortawesome/free-regular-svg-icons';


const Search = (props) => {

    let connection = "http://127.0.0.1:8000/api";
    // let connection = "https://killfilmsbackend.herokuapp.com";
    
    let history = useHistory();

    // Hooks
    const [players, setPlayers] = useState([]);
    const [age, setAge] = useState({from:18, to:99});
    const [filtPlayers, setFiltPlayers] = useState([]);
    // const [hobbie, setHobbie] = useState({tablegames:false, rolegames:false, videogames:false, cosplay:false, anime:false});

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

    const Like = async (id) => {
        let body = {
            "user_a_id": props.logData.user.id,
            "user_b_id": id,
        }
        try{
            let res = await axios.post(`${connection}/match`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}});
            if (res) {
                console.log(res);
            }
        } catch (err) {
            console.log({message: err.message})
        }

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
                    filtPlayers.filter((player)=>
                    player.tablegames==true&& player.user_id!==props.logData.user.id
                    )
                );
                break;

            case "rolegames":
                setFiltPlayers(
                    filtPlayers.filter((player)=>
                    player.rolegames==true&& player.user_id!==props.logData.user.id
                    )
                );
                break;

            case "videogames":
                setFiltPlayers(
                    filtPlayers.filter((player)=>
                    player.videogames==true&& player.user_id!==props.logData.user.id
                    )
                );
                break;

            case "cosplay":
                setFiltPlayers(
                    filtPlayers.filter((player)=>
                    player.cosplay==true&& player.user_id!==props.logData.user.id
                    )
                );
                break;

            case "anime":
                setFiltPlayers(
                    filtPlayers.filter((player)=>
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

                <div className="filters ">
                    <div className="ageFilters">
                        <input className="ageRange" defaultValue="18" type="number" name="from" placeholder="from" onChange={ageRange}></input>
                        <input className="ageRange" defaultValue="99" type="number" name="to" placeholder="to" onChange={ageRange}></input>
                        <div className="buttonAge" onClick={()=>updateAge()}>GO</div>
                    </div>
                    <div className="hobbieFilters">
                        <input className="buttonHobbies" type="radio" placeholder="option" onChange={()=>hobbieFn("tablegames")} name="hobbies"/><label for="tablegames">TABLEGAMES</label>
                        <input className="buttonHobbies" type="radio" placeholder="option" onChange={()=>hobbieFn("rolegames")}  name="hobbies"/><label for="rolegames">ROLEGAMES</label>
                        <input className="buttonHobbies" type="radio" placeholder="option" onChange={()=>hobbieFn("videogames")} name="hobbies"/><label for="videogames">VIDEOGAMES</label>
                        <input className="buttonHobbies" type="radio" placeholder="option" onChange={()=>hobbieFn("cosplay")}    name="hobbies"/><label for="cosplay">COSPLAY</label>
                        <input className="buttonHobbies" type="radio" placeholder="option" onChange={()=>hobbieFn("anime")}      name="hobbies"/><label for="anime">ANIME</label>
                    </div>
                    
                </div>
                <div className="boxSearch">
                    {filtPlayers.map((player, index)=>(
                        
                            <div className="playerCard" key={index} >
                                <div className="cardInfo">{player.user_id}</div>
                                <div className="cardInfo">{player.nick}</div>
                                <div className="cardInfo">Level {player.age}</div>
                                <div className="cardInfo">{player.city}</div>
                                <div className="cardInfo">tablegames {player.tablegames}</div>
                                <div className="cardInfo">rolegames {player.rolegames}</div>
                                <div className="cardInfo">videogames {player.videogames}</div>
                                <div className="cardInfo">cosplay {player.cosplay}</div>
                                <div className="cardInfo">anime {player.anime}</div>
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
        return (
            <div></div>
        )
    }
}

export default connect((state)=>(
    {logData:state.credentials,
    getInfo:state.getinfo}
))(Search);
// IMPORT MOTORS
import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';


const Matches = (props) => {

    // let connection = "http://127.0.0.1:8000/api";
    let connection = "https://geeksdateback.herokuapp.com/api";


    let history = useHistory();
    
    const [lovers, setLovers] = useState([]);
    const [filt, setFilt] = useState([]);
    const [matchId, setMatchId] = useState('');
    const [matchName, setMatchName] = useState('');
    const [argsTotal, setArgsTotal] = useState(['']);
    const [textM, setTextM] = useState(' ');
    const [otherId, setOtherId] = useState(' ');

    useEffect(()=>{
        Lovers();
    }, []);

    // const filters = () =>{
    //     setFilt(
    //     lovers.filter((item)=>(item?.id !== arg))
    //     )
    // }

    // DEFAULT SEARCH BASED ON USER PREFERENCES
    const Lovers = async () => {

        let body = {
            "user_id": props.logData.user.id,
        }
        try{
            let res = await axios.post(`${connection}/lovermatches`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}});
            if (res) {
                setLovers(res.data.data);
            }
        } catch (err) {
            console.log({message: err.message})
        }
    }

    const Unmatch = async (id) => {
        console.log(id)
        let body = {
            "id": id,
        }
        try{
            let res = await axios.post(`${connection}/unmatch`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}});
            if (res) {
                alert(res.data.message);
            }
        } catch (err) {
            console.log({message: err.message})
        }
    }

    // SET MATCH ID AND CHECK FOR MESSAGES
    const setMatch = async (lovName, value, aId, bId) => {
        
        if (aId == props.logData.user.id){
            setOtherId(bId)
        } else {
            setOtherId(aId)
        }

        // SAVE NAME OF THE MATCH
        setMatchName(lovName);

        // CLEAN MESSAGES
        setArgsTotal([]);
        
        // SAVE LOVER ROW ID VALUE TO LOOK FOR THE CONVERSATION
        setMatchId(value);

        try{
            let body = {
                "match_id": value,
            }
            let res = await axios.post(`${connection}/checkmessage`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}});
            if (res) {

                // TRANSFORM OBJECT TO A ARRAY OF OBJECTS
                let array1 = [];
                array1 = Object.values(res.data.data);
                
                // GIVE ATRIBUTE CLASSES DEPENDS ON USER_FROM_ID
                for (let i=0; i<array1.length; i++){
                    if (array1[i].user_from_id==props.logData.user.id){
                        array1[i].classes = "from";
                        
                    } else {
                        array1[i].classes = "to";
                        array1[i].name = lovName;
                    }
                    
                }

                // SAVE CONVERSATION TO PRINT 
                setArgsTotal(array1);
            }

        } catch (err) {
            console.log({message: err.message})
        }
    }

    // SAVE NEW MESSAGE TEXT
    const getText = (e) => {
        setTextM(e.target.value);
    }

    // CREATE MESSAGE ROW
    const newmessage = async () =>{
        let body = {
            "user_from_id": props.logData.user.id,
            "user_to_id": otherId,
            "match_id": matchId,
            "text": textM
        }
        
        try{
            let res = await axios.post(`${connection}/newmessage`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}});
            if (res) {
                // document.getElementById("newMessage")
            }
        } catch (err) {
            console.log({message: err.message})
        }
    }

    if (props.logData.token){

        return (
            <div className="containerMatches">
                <div className="leftSide">
                
                <div className="listMatches">
                    {lovers.map((lover, index)=>(
             
                            <div className="loverCard" key={index}>
                                
                                <div className="unmatch"><FontAwesomeIcon className="faIcons" icon={faTimes}
                                    // onClick={()=>Unmatch(lover.matchIduser_a_id, lover.user_b_id)}/></div>
                                    onClick={()=>Unmatch(lover.id)}/></div>
                                
                                <div className="loverInfo">{lover.name.toLocaleUpperCase()}</div>

                                <div className="message"><FontAwesomeIcon className="faIcons" icon={faArrowAltCircleRight}
                                    onClick={()=>setMatch(lover.name, lover.id, lover.user_a_id, lover.user_b_id)}/></div>
                                
                            </div>
                        
                    ))}
                    </div>
                </div>
                <div className="rightSide">
                        
                {matchName && (

                        <div className="containerMessages">
                        
                        <div className="matchName">{matchName.toLocaleUpperCase()}</div>
                        <div className="messageBox">
                            {argsTotal.map((item, index)=>(
                                <div className="messageCard" key={index}>
                                    <div className={item.classes}>{item.name}
                                    {(item.classes === 'to') && (": ")}
                                    {item.text}</div>
                                </div>
                                ))}
                        </div>
                        <div className="senderBox">
                            <input className="messageText" id="newMessage" onFocus={(e) => e.target.value=''} onChange={getText} type="text" placeholder="new message"></input>
                            <div className="buttonMatch" onClick={()=>newmessage()}>SEND</div>
                        </div>
                        
                    </div>
                    
                )}

                </div>
                
            </div>
        )
    } else {
        setTimeout(()=>{
            history.push('/');
        }, 500)
    }
}

export default connect((state)=>(
    {logData:state.credentials}
))(Matches);
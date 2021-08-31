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
    let connection = "https://geeksdatebackend.herokuapp.com";


    let history = useHistory();
    
    const [lovers, setLovers] = useState([]);
    const [matchId, setMatchId] = useState('');
    const [argsTotal, setArgsTotal] = useState(['']);
    const [textM, setTextM] = useState(' ');
    const [otherId, setOtherId] = useState(' ');

    useEffect(()=>{
        Lovers();
    }, []);

    
    
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

    // DESTROY LOVER ROW 
    const Unmatch = async (a_id, b_id) => {

        let body = {
            "user_a_id": a_id,
            "user_b_id": b_id,
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
    const setMatch = async (value, aId, bId) => {
        
        if (aId == props.logData.user.id){
            setOtherId(bId)
        } else {
            setOtherId(aId)
        }

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
        console.log(body)
        try{
            let res = await axios.post(`${connection}/newmessage`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}});
            if (res) {
                alert(res.data.message);
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
                                    onClick={()=>Unmatch(lover.user_a_id, lover.user_b_id)}/></div>
                                
                                <div className="loverInfo">{lover.name}</div>

                                <div className="message"><FontAwesomeIcon className="faIcons" icon={faArrowAltCircleRight}
                                    onClick={()=>setMatch(lover.id, lover.user_a_id, lover.user_b_id)}/></div>
                                
                            </div>
                        
                    ))}
                    </div>
                </div>
                <div className="rightSide">

                    <div className="containerMessages">
                        {/* <div className="matchId">Lover row: {matchId}</div> */}
                        <div className="messageBox">
                            {argsTotal.map((item, index)=>(
                                <div className="messageCard" key={index}>
                                    <div className={item.classes}>{item.name, item.text}</div>
                                </div>
                                ))}
                        </div>
                        <input className="messageText" onChange={getText} type="text" placeholder="your message"></input>
                        <div className="buttonMessage" onClick={()=>newmessage()}>SEND</div>
                    </div>
                    

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
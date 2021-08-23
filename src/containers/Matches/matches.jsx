// IMPORT MOTORS
import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// IMPORT ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const Matches = (props) => {

    let connection = "http://127.0.0.1:8000/api";


    let history = useHistory();
    
    const [lovers, setLovers] = useState([]);

    useEffect(()=>{
        Lovers();
    }, []);

    useEffect(()=>{

    });

    
     // DEFAULT SEARCH BASED ON USER PREFERENCES
     const Lovers = async () => {

        let body = {
            "user_id": props.logData.user.id,
        }
        try{
            let res = await axios.post(`${connection}/lovermatches`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}});
            if (res) {
                setLovers(res.data.data);
                console.log('me repito')
                console.log(res.data)
            }
        } catch (err) {
            console.log({message: err.message})
        }
    }

    const Unmatch = async (a_id, b_id) => {
        let body = {
            "user_a_id": b_id,
            "user_b_id": a_id,
        }
        try{
            let res = await axios.post(`${connection}/unmatch`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}});
            if (res) {
                console.log(res.data.message);
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
             
                            <div className="loverCard" key={index} >
                                <div className="boxLoverButtons">
                                    <div className="cardButtons"><FontAwesomeIcon className="faIcons" icon={faTimes}
                                    onClick={()=>Unmatch(lover.user_a_id, lover.user_b_id)}/></div>
                                </div>
                                <div className="loverInfo">{lover.name}</div>
                                
                            </div>
                        
                    ))}
                    </div>
                </div>
                <div className="rightSide">

                </div>
                
            </div>
        )
    } else {
        setTimeout(()=>{
            history.push('/login');
        }, 500)
    }
}

export default connect((state)=>(
    {logData:state.credentials}
))(Matches);
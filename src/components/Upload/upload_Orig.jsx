// IMPORT MOTORS
import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';



const Upload = (props) => {

    let connection = "https://geeksdateback.herokuapp.com/api";

    const [pic, setPic] = useState([]);

    const changeFile = (e) => {
        setPic([]);
        if (e.target.files){
            const picArr = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            setPic((prevImages) => prevImages.concat(picArr));
            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file)
            );
        }
        // setPic(e.target.files[0])
    }

    const renderPhotos = (source) => {
        return source.map((photo) =>{
            return <img className="photo" src={photo} alt="" key={photo} ></img>
        });
    };

    const uploadToServer = (e) => {
        e.prevenDefault();
        let files = e.target[0].files;
        const formData = new FormData();
        for(let i=0; i<files.length; i++){
            formData.append('file[]', files[i])
        }
        axios({
            url: 'http://127.0.0.1:8000/api/upload',
            method: "POST",
            data: formData
        }) .then ((res) => {
            console.log(res)
        })
    }

    // const uploadPic = async () => {
    //     try {
    //         let body = {
    //             user_id: props.logData.user.id,
    //             image: pic
    //         }
    //         let res = await axios.post(`${connection}/upload`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}})
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // useEffect(()=>{
    //     console.log("Esto es el pic " + pic)
    // },[pic])

    return (
        <div className="containerUpload">
            <form onSubmit={(e)=>uploadToServer(e)} encType="multipart/form-data">
            <input type="file" id="file" name="file[]" multiple onChange={changeFile}/>
            <div className="result">{renderPhotos(pic)}</div>
            <input type="submit" name="Upload"/>
            {/* <button onClick={()=>uploadPic()}>UPLOAD</button> */}
            </form>
            
        </div>
    )

}

export default connect((state)=>(
    {logData:state.credentials}
))(Upload);
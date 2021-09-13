import React, { useState } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
// IMPORT ACTIONS
import {GETINFO} from '../../redux/types';


const Upload = (props) => {

    let connection = "https://geeksdateback.herokuapp.com/api";
    const [image, setImage] = useState('');
    const [preURL, setPreURL] = useState({});
    const [pic, setPic] = useState({});

    // LAMBDA API
    const API_ENDPOINT =  "https://qqawf68al1.execute-api.eu-west-3.amazonaws.com/default/getPresignedImageUrl";
    const source= "https://geekdatesstore.s3.eu-west-3.amazonaws.com/"


    const getPreURL = async (e) => {
      const f = e.target.files[0];
      console.log("Prepared file: ", f);

      // Get the presigned URL
      const response = await axios({
        method: 'GET',
        url: API_ENDPOINT
      })

      setPreURL(response);
      setPic(f);
    }

    const putAndSaveURL = async () => {

    
      // PUT request
      const result = await fetch(preURL.data.uploadURL, {
        method: 'PUT',
        headers: {
          "Content-type": "image/jpeg",
        },
        body: pic
      })
      console.log('Result: ', result)
      let photo = preURL.data.uploadURL.split('?')[0]
      
      setImage(photo);


      let body = {
        "user_id": props.logData.user.id,
        "urlpic": photo,
      }
      console.log(body.urlpic)

      let res = await axios.post(`${connection}/updateinfo`, body, {headers: {'Authorization': `Bearer ${props.logData.token}`}})

      if (res) {
          alert("Foto subida con éxito");
          props.dispatch({type:GETINFO,payload:res.data.user});
      } else {
          alert("ha habido un problema")
      }
      
    }
    

  return (
    <div className="containerUpload">
        <div className="boxForm">
                <div className="titleSection">UPLOAD YOUR JPG PHOTO</div>

                <input className="photoInput" type="file" id="imageInput" accept="image/jpg" onChange={getPreURL}/>

                <div className="button" onClick={putAndSaveURL}>SAVE</div>

                {image ? 
                        <img className="photo" src={image}/>
                : ''}
                
            
        </div>
    </div>
  );
}

export default connect((state)=>(
{logData:state.credentials}
))(Upload);
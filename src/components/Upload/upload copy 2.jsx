import React, { useState } from 'react';
import {connect} from 'react-redux';
// import imageUpload from 'react-images-upload'
import axios from 'axios';

// S3
import S3FileUpload from 'react-s3';
import { uploadFile } from 'react-s3';

const Upload = (props) => {

  // S3 CONFIG
  const config = {
    bucketName: 'geekdatesstore',
    // dirName: 'photos', /* optional */
    region: 'eu-west-3',
    accessKeyId:"",
    secretAccessKey: "",
}

  const [image, setImage] = useState([]);

  const getImage = async (e) => {
    console.log(e.target.files[0])

    try{
    let res = await S3FileUpload
      .uploadFile(e.target.files[0], config)
      if (res) {
        console.log(res)
      }
    } catch (error) {
      console.log(error);
  };   
  }

 

  return (
    <div className="app p-5">
      <form encType="multipart/form-data">
          <input type="file" id="imageInput" accept="image/*" onChange={getImage}/>
          <input type="submit"></input>
      </form>
    </div>
  );
}

export default connect((state)=>(
{logData:state.credentials}
))(Upload);
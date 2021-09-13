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
    accessKeyId:"AKIA33TBNO6SQ6BGZSZC",
    secretAccessKey: "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",
}


  const [image, setImage] = useState('');

  // const getImage = async (e) => {
  //   console.log(e.target.files[0])

  //       try{
  //       let res = await S3FileUpload
  //         .uploadFile(e.target.files[0], config)
  //         if (res) {
  //           console.log(res)
  //         }
  //       } catch (error) {
  //         console.log(error);
  //     };   
  //   }

    // LAMBDA API
    const API_ENDPOINT =  "https://qqawf68al1.execute-api.eu-west-3.amazonaws.com/default/getPresignedImageUrl";
    const source= "https://geekdatesstore.s3.eu-west-3.amazonaws.com/"


    const getDone = async (e) => {
      const f = e.target.files[0];
      console.log("Prepared file: ", f);

      // Get the presigned URL
      const response = await axios({
        method: 'GET',
        url: API_ENDPOINT
      })

      console.log("Response: ", response)

      // PUT request
      const result = await fetch(response.data.uploadURL, {
        method: 'PUT',
        headers: {
          "Content-type": "image/jpeg",
        },
        body: f
      })
      console.log('Result: ', result)
      let photo = response.data.uploadURL.split('?')[0]
      
      setImage(photo);
      
    }
 
    console.log(image)
    
  return (
    <div className="app p-5">
      <form encType="multipart/form-data">
          <input type="file" id="imageInput" accept="image/*" onChange={getDone}/>
          <input type="submit"></input>
          <img className="photo" src={image}/>
      </form>
    </div>
  );
}

export default connect((state)=>(
{logData:state.credentials}
))(Upload);
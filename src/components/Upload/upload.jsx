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
    region: '',
    accessKeyId:"",
    secretAccessKey: "",
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

    const uploadImage = async (e) => {
      console.log('Upload clicked')
      // Get the presigned URL
      const response = await axios({
        method: 'GET',
        url: API_ENDPOINT
      })
      console.log('Response: ', response)
      console.log('Uploading: ', this.image)
      let binary = atob(this.image.split(',')[1])
      let array = []
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
      }
      let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
      console.log('Uploading to: ', response.uploadURL)
      const result = await fetch(response.uploadURL, {
        method: 'PUT',
        body: blobData
      })
      console.log('Result: ', result)
      // Final URL for the user doesn't need the query string params
      this.uploadURL = response.uploadURL.split('?')[0]
    }

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
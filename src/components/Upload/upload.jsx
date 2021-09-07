import React, { useState } from 'react';
import {connect} from 'react-redux';
// import imageUpload from 'react-images-upload'
import axios from 'axios';

const Upload = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleImageChange = (e) => {
    setSelectedFiles([]);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file)
      );
    }
  };

  const renderPhotos = (source) => {
    return source.map((photo) => {
      return <img className="p-2" src={photo} alt="" key={photo} style={{ width: "20%", height: "180px" }} />;
    });
  };


  function uploadToServer(e) {
    e.preventDefault();
    console.log(e.target[0].files)
    var files = e.target[0].files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file[]', files[i])
    }

    axios.post('http://127.0.0.1:8000/api/upload', formData, {headers: {'Authorization': `Bearer ${props.logData.token}`}})

    // axios({
    //   url: 'http://127.0.0.1:8000/api/upload',
    //   method: "POST",
    //   data: formData,
    //   headers: {'Authorization': `Bearer ${props.logData.token}`}
    // })
    .then((res) => {
      console.log(res);
    })
  }
  return (
    <div className="app p-5">
      <form onSubmit={(e) => uploadToServer(e)} encType="multipart/form-data">
        <div>
          <input className="ml-2" type="file" id="file" name="file[]" multiple onChange={handleImageChange} />
          <div className="result">{renderPhotos(selectedFiles)}</div>
          <input type="submit" name=""></input>
        </div>
      </form>
    </div>
  );
}

export default connect((state)=>(
{logData:state.credentials}
))(Upload);
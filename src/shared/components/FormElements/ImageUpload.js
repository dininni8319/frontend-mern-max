import React, { useRef, useState, useEffect } from 'react';
import Button from './Button';

import './ImageUpload.css';

const ImageUpload = props => {
  const [ file, setFile ] = useState();
  const [ previewUrl, setPreviewUrl] = useState();
  const [ isValid, setIsValid ] = useState(false);

  // enstablish a connection to the DOM element of the input picker image
  const filePickerRef = useRef();
  
  const pickImageHandler = () => {
    filePickerRef.current.click() // method click() existes on the dom node 
  };

  useEffect(() => { 
    if (!file) {
      return;
    }
    //convert a file into a readeble image file
    const fileReader = new FileReader(); //browser side JS API

    fileReader.onload = () => {
      setPreviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  },[file])

  const pickeHandler = (event) => {
    // event.target.files native default js, if the input file
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true)
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  return (
    <div className='form-control'>
      <input 
        id={props.id} 
        ref={filePickerRef}
        type="file" 
        style={{ display: 'none' }}
        accept=".jpg,.png,.jpeg"
        onChange={pickeHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
         {previewUrl && <img src={previewUrl} alt="Preview" />}
         {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>PICK AN IMAGE</Button>
      </div>
      {!isValid && <p>{props.errorText}</p> }
    </div>
  )
};
 
export default ImageUpload;
import React, { useRef, useState, useEffect } from 'react';
import './imageUpload.css';
import Button from './button';

const ImageUpload = ({ id, center, onInput, errorText }) => {
    const filePickerRef = useRef();
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const pickkImageHandler = () => {
        filePickerRef.current.click();
    }

    useEffect(() => {
        if (!file) return;
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }, [file])

    const pickHandler = (e) => {
        let pickedFile;
        let fileIsValid = isValid;
        if (e.target.files && e.target.files.length === 1) {
            pickedFile = e.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        onInput(id, pickedFile, fileIsValid);
    }
    return (
        <div className='form-control'>
            <input
                id={id}
                ref={filePickerRef}
                type='file'
                style={{ display: 'none' }}
                accept='.jpg, .png, .jpeg'
                onChange={pickHandler}
            />
            <div className={`image-upload ${center && 'center'}`}>
                <div className='image-upload__preview'>
                    {previewUrl && <img src={previewUrl} alt='prv' />}
                    {!previewUrl && <p>Please pick an image.</p>}
                </div>
                <Button type='button' onClick={pickkImageHandler}>PICK IMAGE</Button>
            </div>
            {!isValid && <p><small>{errorText}</small></p>}
        </div>
    );
}

export default ImageUpload;
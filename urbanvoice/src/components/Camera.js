import React, { useRef, useCallback, useState, createContext, useContext,} from 'react';
import Webcam from 'react-webcam';
import { Button, Icon } from '@chakra-ui/react';
import { MdCamera } from 'react-icons/md'; 
import { ImageContext } from '../App'; 


const Camera= ({ onCapture }) => {
  const webcamRef = useRef(null);
  const { setImageSrc } = useContext(ImageContext);
  // Function to handle taking a photo
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    onCapture(imageSrc);
    console.log(imageSrc)
  }, [webcamRef]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ width: '100%', height: 'auto' }}
      />
         <Button leftIcon={<Icon as={MdCamera} />} onClick={capture} colorScheme="teal">
      Submit
    </Button>
    </div>
  );
};

export default Camera;

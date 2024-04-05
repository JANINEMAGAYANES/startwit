import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

const Camera= () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  // Function to handle taking a photo
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ width: '100%', height: 'auto' }}
      />
      <button onClick={capture}>Capture Photo</button>
      {imageSrc && (
        <div>
          <h2>Preview:</h2>
          <img src={imageSrc} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default Camera;

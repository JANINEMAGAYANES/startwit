import React, { useRef, useCallback, useState } from 'react';
import Camera from '../components/Camera';
import RecordButton from '../components/RecordButton';

const Report = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = () => {
    // Logic for submitting the form or performing other actions
    setIsSubmitted(true);
  };

  return (
    <div>
      <h1>Report</h1>
      <div>
      {isSubmitted ? null :(<><Camera/> <RecordButton /></>)}
      <h1></h1>
      <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Report;

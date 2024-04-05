import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const RecordButton = () => {
  const { transcript, resetTranscript, listening, startListening, stopListening } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  return (
    <div>
      <button onClick={startListening} disabled={listening}>Start Recording</button>
      <button onClick={stopListening} disabled={!listening}>Stop Recording</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};

export default RecordButton;

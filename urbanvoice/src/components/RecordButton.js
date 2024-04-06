import React, { useState, useContext } from 'react';
import { AudioContext } from '../App';

const RecordComponent = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState('');
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const { audio, setAudio } = useContext(AudioContext);

  const startRecording = () => {
    setIsRecording(true);

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        setSpeechRecognition(recognition);

        const chunks = [];

        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
          const audioUrl = URL.createObjectURL(blob);
          setAudioFile(audioUrl);
          recognition.stop();
        };

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setAudioFile(transcript);
          setAudio(transcript)
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
        };

        recognition.onend = () => {
          console.log('Speech recognition ended');
        };

        recognition.start();

        mediaRecorder.start();
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
    speechRecognition.stop();
  };

  return (
    <div>
      {isRecording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}

    </div>
  );
};

export default RecordComponent;

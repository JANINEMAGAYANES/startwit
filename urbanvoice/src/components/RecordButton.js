import { useState } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';

function RecordButton() {
  // State to store the recognized speech text
  const [value, setValue] = useState('');

  // useSpeechRecognition hook to handle speech recognition
  const { listen, stop } = useSpeechRecognition({
   

        onResult: (result) => {
          console.log("start")
          console.log(result)
          setValue(result);
        },
        onError: (err) => {
          console.error("Speech recognition error:", err);
        }
      })

  // Render the component
  return (
    <div>
      {/* Textarea to display the recognized speech text */}
      <textarea
        value={value}
        // Update the value state when text is manually entered
        onChange={(event) => setValue(event.target.value)}
      />
      {/* Button to start listening for speech input */}
      <button onMouseDown={listen} onMouseUp={stop}>
        🎤
      </button>
    </div>
  );
}

export default RecordButton;

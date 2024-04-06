import React, { createContext, useContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screen/Home';
import Report from './screen/Report';
import Form from './components/Form';
import { ChakraProvider } from '@chakra-ui/react'


export const ImageContext = createContext();
export const AudioContext = createContext();

function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [audio, setAudio] = useState("");

  return (
    <ImageContext.Provider value={{ imageSrc, setImageSrc }}>
    <AudioContext.Provider value={{ audio, setAudio }}>

    <ChakraProvider>
    <Router>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/Report" element={<Report />} />
      <Route path="/form" element={<Form />} />
      <Route path="/" element={<Home />} />
      </Routes>
  </Router>
  </ChakraProvider>  
  </AudioContext.Provider>
  </ImageContext.Provider>

  );
}

export default App;

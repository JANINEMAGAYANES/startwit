import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screen/Home';
import Report from './screen/Report';
import Form from './components/Form';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
    <Router>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/Report" element={<Report />} />
      <Route path="/form" element={<Form />} />
      </Routes>
  </Router>
  </ChakraProvider>
  );
}

export default App;

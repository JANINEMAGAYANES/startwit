import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screen/Home';
import Report from './screen/Report';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/Report" element={<Report />} />
      </Routes>
  </Router>
  );
}

export default App;

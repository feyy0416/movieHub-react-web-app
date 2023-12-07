import './App.css';
import Moviehub from './Moviehub';
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from 'axios';
axios.defaults.withCredentials=true;
function App() {
  
  return (

    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/Moviehub" />} />
          <Route path="/Moviehub/*" element={<Moviehub />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;

import React from 'react';
import './App.css';
import {Routes, Route, useLocation} from 'react-router-dom';
import {HomePage} from "./view/HomePage";
import {EquipmentPage} from './view/EquipmentPage';
import {RequestPage} from './view/RequestPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NaviBar} from "./components/NaviBar";
import {LoginPage} from "./view/LoginPage";
import {LogPage} from "./view/LogPage";

function App() {
  const location = useLocation();


  return (
    <>
      {location.pathname !== '/login'?
      <NaviBar></NaviBar> : null
      }
      <Routes>
            <Route path="/" element = {<HomePage/>}/>
            <Route path="/equipment" element = {<EquipmentPage/>}/>
            <Route path="/request" element = {<RequestPage/>}/>
            <Route path="/login" element = {<LoginPage/>}/>
            <Route path="/status_log" element = {<LogPage/>}/>
      </Routes>


    </>
  );
}

export default App;

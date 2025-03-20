import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import {HomePage} from "./view/HomePage";
import {EquipmentPage} from './view/EquipmentPage';
import {RequestRegistrationPage} from './view/RequestRegistrationPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NaviBar} from "./components/NaviBar";

function App() {
  return (
    <>
      <NaviBar></NaviBar>

      <Routes>
        <Route path="/" element = {<HomePage/>}/>
        <Route path="/equipment" element = {<EquipmentPage/>}/>
        <Route path="/request" element = {<RequestRegistrationPage/>}/>
      </Routes>

      <div>
        <h1>Волшебное реакт-приложение, которое никого не оставит равнодушным</h1>
      </div>
    </>
  );
}

export default App;

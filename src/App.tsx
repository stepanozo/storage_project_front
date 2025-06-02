import React, {useEffect, useState} from 'react';
import './App.css';
import {Routes, Route, Link, useLocation} from 'react-router-dom';
import {HomePage} from "./view/HomePage";
import {EquipmentPage} from './view/EquipmentPage';
import {RequestPage} from './view/RequestPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NaviBar} from "./components/NaviBar";
import {Nomenclature} from "./model/Nomenclature";
import {getAllNomenclatures} from "./api/equipmentApi";
import {LoginPage} from "./view/LoginPage";
import {StatusLogsPage} from "./view/StatusLogsPage";

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
            <Route path="/status_log" element = {<StatusLogsPage/>}/>
      </Routes>


    </>
  );
}

export default App;

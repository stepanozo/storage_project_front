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

function App() {

  const [nomenclatures, setNomenclatures] = useState<Nomenclature[]>([]);
  const location = useLocation();

  useEffect(() => {
    getAllNomenclatures()
      .then((data) => setNomenclatures(data))
  }, []);

  return (
    <>
      {location.pathname !== '/login'?
      <NaviBar></NaviBar> : null
      }
      <Routes>
        <Route path="/" element = {<HomePage/>}/>
        <Route path="/equipment" element = {<EquipmentPage
          nomenclatures = {nomenclatures}
          setNomenclatures = {setNomenclatures}
        />}/>
        <Route path="/request" element = {<RequestPage
          nomenclatures = {nomenclatures}
        />}/>
        <Route path="/login" element = {<LoginPage/>}/>
      </Routes>


    </>
  );
}

export default App;

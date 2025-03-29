import React, {useEffect, useState} from "react";
import {Nomenclature} from "../model/Nomenclature";
import {getAllEquipment, getAllNomenclatures} from "../api/equipmentApi";
import NomenclatureTable from "../components/NomenclatureTable";
import {Col, Row} from "react-bootstrap";
import EquipmentTable from "../components/EquipmentTable";
import {Equipment} from "../model/Equipment";

export const EquipmentPage = () => {

  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [nomenclatures, setNomenclatures] = useState<Nomenclature[]>([]);
  useEffect(() => {
    getAllNomenclatures()
      .then((data) => setNomenclatures(data))
  }, []);
  useEffect(() => {
    getAllEquipment()
      .then((data) => setEquipment(data.sort((a,b) => a.id - b.id)))
  }, []);

  const refreshEquipment = () => {
    getAllEquipment()
      .then((data) => setEquipment(data.sort((a,b) => a.id - b.id)))
  }


  return (
    <Row>
      <Col>
        <EquipmentTable equipment={equipment} setEquipment={setEquipment} refreshEquipment={refreshEquipment} nomenclatures = {nomenclatures}/>
      </Col>
      <Col>
        <NomenclatureTable nomenclatures={nomenclatures} setNomenclatures={setNomenclatures} />
      </Col>
    </Row>
  );
}

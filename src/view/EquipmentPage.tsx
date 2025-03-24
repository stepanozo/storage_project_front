import React, {useEffect, useState} from "react";
import {Nomenclature} from "../model/Nomenclature";
import {getAllEquipment, getAllNomenclatures} from "../api/equipmentApi";
import NomenclatureTable from "../components/NomenclatureTable";
import {Button, Col, Form, Row} from "react-bootstrap";
import EquipmentTable from "../components/EquipmentTable";

export const EquipmentPage = () => {

  const [nomenclatures, setNomenclatures] = useState<Nomenclature[]>([]);
  useEffect(() => {
    getAllNomenclatures()
      .then((data) => setNomenclatures(data))
  }, []);

  return (
    <Row>
      <Col>
        <EquipmentTable nomenclatures = {nomenclatures}/>
      </Col>
      <Col>
        <NomenclatureTable nomenclatures={nomenclatures} setNomenclatures={setNomenclatures} />
      </Col>
    </Row>
  );
}

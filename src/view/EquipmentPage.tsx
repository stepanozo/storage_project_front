import React, {useEffect, useState} from "react";
import {Nomenclature} from "../model/Nomenclature";
import {getAllEquipment, getAllNomenclatures} from "../api/equipmentApi";
import NomenclatureTable from "../components/NomenclatureTable";
import {Button, Col, Form, Row} from "react-bootstrap";
import EquipmentTable from "../components/EquipmentTable";

interface EquipmentPageProps {
  nomenclatures: Nomenclature[];
  setNomenclatures: (nomenclatures: Nomenclature[]) => void;
}

export const EquipmentPage: React.FC< EquipmentPageProps > = ({ nomenclatures, setNomenclatures}) => {

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

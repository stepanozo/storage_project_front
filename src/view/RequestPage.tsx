import React, {useEffect, useState} from "react";
import {Nomenclature} from "../model/Nomenclature";
import {getAllNomenclatures} from "../api/equipmentApi";
import {Col, Row} from "react-bootstrap";
import EquipmentTable from "../components/EquipmentTable";
import NomenclatureTable from "../components/NomenclatureTable";
import RequestTable from "../components/RequestTable";
import {getAllRequests} from "../api/requestApi";
import {Request} from "../model/Request";


export const RequestPage = () => {
  const [nomenclatures, setNomenclatures] = useState<Nomenclature[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    getAllNomenclatures()
      .then((data) => setNomenclatures(data))
  }, []);
  useEffect(() => {
    getAllRequests()
      .then((data) => setRequests(data))
  }, []);

  return (
    <RequestTable
      requests = {requests}
      setRequests={setRequests}
      nomenclatures={nomenclatures}
    />
  );
}
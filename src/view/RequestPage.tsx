import React, {useEffect, useState} from "react";
import {Nomenclature} from "../model/Nomenclature";
import {getAllNomenclatures} from "../api/equipmentApi";
import {Col, Row} from "react-bootstrap";
import EquipmentTable from "../components/EquipmentTable";
import NomenclatureTable from "../components/NomenclatureTable";
import RequestTable from "../components/RequestTable";
import {getAllRequests} from "../api/requestApi";
import {Request} from "../model/Request";


interface RequestPageProps {
  nomenclatures: Nomenclature[];
}

export const RequestPage: React.FC<RequestPageProps> = (props: RequestPageProps) => {

  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    getAllRequests()
      .then((data) => setRequests(data))
  }, []);

  return (
    <RequestTable
      requests = {requests}
      setRequests={setRequests}
      nomenclatures={props.nomenclatures}
    />
  );
}
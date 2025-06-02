import React, {useEffect, useState} from 'react';
import {Nomenclature} from '../model/Nomenclature'
import Table from 'react-bootstrap/Table'
import {Button, Col, Form, Row} from "react-bootstrap";
import {Equipment} from "../model/Equipment";
import {Check, Pencil, Trash, X} from "react-bootstrap-icons";
import {addEquipment, changeEquipmentCount, deleteEquipment} from "../api/equipmentApi";
import ModalConfirm from "./modal/modalConfirm";
import StatusLogDTO from "../api/dto/StatusLogDTO";

interface EquipmentTableProps {
  logs: StatusLogDTO[];
}

const StatusLogTable: React.FC<EquipmentTableProps> = ({logs}) => {

  const [logList, setLogList] = useState<StatusLogDTO[]>(logs);

  useEffect(() => {
    setLogList(logs);
  }, [logs]);

  const inputStyle = {
    border: 'black solid 1px',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  };

  if(!logs ||logs.length === 0 ){
    return <div>Нет данных для отображения</div>
  }
    return (
        <div style={{ minHeight: "300px", maxHeight: "300px", overflowY: "auto" }}>
            <Table striped="columns">
                <thead>
                <tr>
                    <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Изменение статуса</th>
                    <th style={{ border: '1px solid black', padding: '8px', width: '100px' }}>Время</th>
                </tr>
                </thead>
                <tbody>
                {logList.map((log) => (
                    <tr key={log.id}>
                        <td>{log.id}</td>
                        <td>
                            Заявка {log.userName} ({log.equipmentNomenclatureName} - {log.count} шт.):<br />
                            "{log.oldStatus || 'нет статуса'}" → "{log.newStatus}"
                        </td>
                        <td>
                            {log.changeTimestamp.toLocaleString()} {/* Форматирование даты */}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default StatusLogTable;
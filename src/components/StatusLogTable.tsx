import React, {useEffect, useState} from 'react';
import {Nomenclature} from '../model/Nomenclature'
import Table from 'react-bootstrap/Table'
import {Button, Col, Form, Row} from "react-bootstrap";
import {Equipment} from "../model/Equipment";
import {Check, Pencil, Trash, X} from "react-bootstrap-icons";
import {addEquipment, changeEquipmentCount, deleteEquipment} from "../api/equipmentApi";
import ModalConfirm from "./modal/modalConfirm";
import StatusLogDTO from "../api/dto/StatusLogDTO";
import UnifiedLogEntry from "../api/dto/UnifiedLogEntry";

interface EquipmentTableProps {
  logs: UnifiedLogEntry[];
}

const StatusLogTable: React.FC<EquipmentTableProps> = ({logs}) => {

  const [logList, setLogList] = useState<UnifiedLogEntry[]>(logs);

  useEffect(() => {
    setLogList(logs);
  }, [logs]);

  if(!logs ||logs.length === 0 ){
    return <div>Нет данных для отображения</div>
  }
    return (
        <div style={{ minHeight: "300px", maxHeight: "600px", overflowY: "auto" }}>
            <Table striped="columns">
                <thead>
                <tr>
                    <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Изменение статуса</th>
                    <th style={{ border: '1px solid black', padding: '8px', width: '200px' }}>Время</th>
                </tr>
                </thead>
                <tbody>
                {logList.map((log, index) => (
                    <tr key={`${log.logType}-${index}`}>
                        <td>{index + 1}</td> {/* Порядковый номер начиная с 1 */}
                        <td>
                            {log.logType === 'status' ? (
                                `Заявка пользователя ${log.originalData.userName} (${log.originalData.equipmentNomenclatureName} - ${log.originalData.count} шт.): "${log.originalData.oldStatus || 'нет статуса'}" → "${log.originalData.newStatus}"`
                            ) : (
                                `Изменение количества: ${log.originalData.equipmentName} (${log.originalData.oldCount} → ${log.originalData.newCount})`
                            )}
                        </td>
                        <td>
                            {log.timestamp.toLocaleString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default StatusLogTable;
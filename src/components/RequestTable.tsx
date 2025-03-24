import React, {useEffect, useState} from 'react';
import {Nomenclature} from '../model/Nomenclature'
import Table from 'react-bootstrap/Table'
import {Check, Pencil, Trash, X, XCircle} from 'react-bootstrap-icons';
import {Equipment} from "../model/Equipment";
import ModalConfirm from "./modal/modalConfirm";
import {Button, Col, Form, Row} from "react-bootstrap";
import { NewRequestDTO } from '../api/NewRequestDTO';
import {cancelRequest, createRequest, getAllRequests} from "../api/requestApi";
import {Request} from "../model/Request";
import {changeEquipmentCount} from "../api/equipmentApi";

interface RequestTableProps {
  requests: Request[];
  setRequests: (requests: Request[]) => void;
  nomenclatures: Nomenclature[];
}

const RequestTable: React.FC<RequestTableProps > = ({ requests, setRequests, nomenclatures}) => {

  const [requestList, setRequestList] = useState<Request[]>(requests);
  const [selectedItemToDeleteId, setSelectedItemToCancel] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [requestDTOtoRegister, setRequestDTOtoRegister] = useState<NewRequestDTO>({
    nomenclatureId: -1,
    count: -1,
  })

  const inputStyle = {
    border: 'black solid 1px',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  };

  useEffect(() => {
    setRequestList(requests.sort((a,b) => a.id - b.id));
  }, [requests]);

  const handleInputNewRequestNomenclatureIdChange = (nomenclatureId: number) => {
    setRequestDTOtoRegister(prevState => ({
        ...prevState,
        nomenclatureId: nomenclatureId
      }
    ));
  };
  const handleInputNewRequestCountChange = (count: number) => {
    setRequestDTOtoRegister(prevState => ({
        ...prevState,
        count: count
      }
    ));
  };

  const handleCancelClick = (id: number) => {
    setShowModal(true)
    setSelectedItemToCancel(id)
  };

  //todo расписать этот треш так, чтобы был запрет на удаление , которая есть на складе
  const confirmCancel = (id: number) => {

    //Это надо включить в том случае, если ты сотрудник
    // cancelRequest(id).then(() => setRequests(
    //   requests.filter(request => request.id !== id)
    // ))

    cancelRequest(id).then(() =>
      setRequests(
        requests.map((item) =>
          item.id === id ? {...item, status: 'Отменена'} : item
        )
      )
    );
    setSelectedItemToCancel(id);
  };

  const handleRegisterRequestClick = (requestDTOtoRegister: NewRequestDTO) => {
    if (requestDTOtoRegister.nomenclatureId > 0 &&
      requestDTOtoRegister.count > 0) {
      createRequest(requestDTOtoRegister).then(() => getAllRequests()
        .then((data) => setRequests(data.sort((a,b) => a.id - b.id)))
      )
    }
  };


  const handleCloseModal = () => {
    setShowModal(false)
  };

  const handleError = (errorText: string) => {
    //todo сделать вывод сообщения об ошибке
  };

  if(!requestList || requestList.length ===0 ){
    return <div>Нет данных для отображения</div>
  }
  return (
    <>
      <ModalConfirm
        text={'Вы уверены, что хотите отменить заявку?'}
        textConfirm={'Да, отменить'}
        show={showModal}
        id={selectedItemToDeleteId || 0}
        confirmDelete={confirmCancel}
        handleCloseModal={handleCloseModal}
      />
      <div style={{minHeight: "350px", maxHeight: "350px", overflowY: "auto"}}>
        <Table striped="columns">
          <thead>
          <tr>
            <th style={{border: '1px solid black', padding: '8px'}}>ID</th>
            <th style={{border: '1px solid black', padding: '8px'}}>Наименование</th>
            <th style={{border: '1px solid black', padding: '8px'}}>Статус</th>
            <th style={{border: '1px solid black', padding: '8px'}}>Количество</th>
            <th style={{border: '1px solid black', padding: '8px'}}>Сотрудник</th>
            <th style={{border: '1px solid black', padding: '8px'}}>Дата открытия</th>
            <th style={{border: '1px solid black', padding: '8px'}}>Дата закрытия</th>
            <th style={{border: '1px solid black', padding: '8px'}}>Действия</th>
          </tr>
          </thead>
          <tbody>
          {requests.map((request) =>
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.equipmentNomenclatureName}</td>
              <td>{request.status}</td>
              <td>{request.count}</td>
              <td>{request.userFullName}</td>
              <td>{(String(request.registrationDateTime)).replace('T', ' ').replaceAll('-','.')}</td>
              <td>{request.closureDateTime == null ? '-' : (String(request.closureDateTime)).replace('T', ' ').replaceAll('-','.')}</td>
              <td>
                {
                  request.status === 'Ожидает' && localStorage.getItem('fullName') === request.userFullName.toString() ?
                <button style={{border: "none", background: "none"}}
                            onClick = {() => handleCancelClick(request.id)}>
                      <XCircle/>
                </button>
                    : null
                }
              </td>
            </tr>
          )}
          </tbody>
        </Table>
      </div>

      <Row>
        <Col style={{minWidth: "150px", maxWidth: "280px"}}>
          <Form.Select  aria-label="Выберите номенклатуру" className="ms-2"
                       onChange= {(e) =>{
                         console.log("принимаем тмц");
                         handleInputNewRequestNomenclatureIdChange(Number(e.target.value))
                       }}
          >
            <option>Выберите номенклатуру</option>
            {nomenclatures.map((nomenclature) =>
                <option key={nomenclature.id} value= {nomenclature.id} >
                  {nomenclature.name}
                </option>
            )}
          </Form.Select>
        </Col>
        <Col style={{maxWidth: "90px"}}>
          <input
            type = "text"
            style = {inputStyle}
            defaultValue={""}
            onChange = {(e) => handleInputNewRequestCountChange(Number(e.target.value))}
          />
        </Col>

        <Col>
          <Button variant="primary" className= "me-3" onClick={() =>
            handleRegisterRequestClick(requestDTOtoRegister)
          }> Зарегистрировать
          </Button>
        </Col>
      </Row>

    </>
  );
};

export default RequestTable;
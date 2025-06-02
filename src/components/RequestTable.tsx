import React, {useEffect, useState} from 'react';
import {Nomenclature} from '../model/Nomenclature'
import Table from 'react-bootstrap/Table'
import {Check, XCircle} from 'react-bootstrap-icons';
import ModalConfirm from "./modal/modalConfirm";
import {Button, Col, Form, Row} from "react-bootstrap";
import { NewRequestDTO } from '../api/dto/NewRequestDTO';
import {cancelRequest, confirmReceivingRequest, createRequest, getAllRequests} from "../api/requestApi";
import {Request} from "../model/Request";

interface RequestTableProps {
  requests: Request[];
  setRequests: (requests: Request[]) => void;
  nomenclatures: Nomenclature[];
}

const RequestTable: React.FC<RequestTableProps > = ({ requests, setRequests, nomenclatures}) => {

  const [textModal, setTextModal] = useState<string>('')
  const [textConfirmModal, setTextConfirmModal] = useState<string>('')
  const [requestList, setRequestList] = useState<Request[]>(requests);
  const [selectedItem, setSelectedItem] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [requestDTOtoRegister, setRequestDTOtoRegister] = useState<NewRequestDTO>({
    nomenclatureId: -1,
    count: -1,
  })
  const [confirmFunctionModal, setConfirmFunctionModal] = useState<(id: number) => void>((id: number) => {})

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
    setTextModal('Вы уверены, что хотите отменить заявку?')
    setTextConfirmModal('Да, отменить')
    setSelectedItem(id)
    setConfirmFunctionModal(() => confirmCancel)
    setShowModal(true)
  };

  const handleConfirmReceivingClick = (id: number) => {
    setTextModal('Вы подтверждаете получение товара?')
    setTextConfirmModal('Да, подтвердить')
    setSelectedItem(id)
    setConfirmFunctionModal(() => confirmReceiving)
    setShowModal(true)
  };

  //todo расписать этот треш так, чтобы был запрет на удаление , которая есть на складе
  const confirmCancel = (id: number) => {
    cancelRequest(id).then(() =>
      setRequests(
        requests.map((item) =>
          item.id === id ? {...item, status: 'Отменена'} : item
        )
      )
    );
    setSelectedItem(id);
  };

  const confirmReceiving = (id: number) => {
    console.log('вызвался confirmReceiving')
    confirmReceivingRequest(id).then(() =>
      setRequests(
        requests.map((item) =>
          item.id === id ? {...item, status: 'Получено'} : item
        )
      )
    );
    setSelectedItem(id);
  };

  const handleRegisterRequestClick = (requestDTOtoRegister: NewRequestDTO) => {
    if (requestDTOtoRegister.nomenclatureId > 0 &&
      requestDTOtoRegister.count > 0) {
      createRequest(requestDTOtoRegister).then(() => getAllRequests()
        .then((data) => setRequests(data.sort((a,b) => a.id - b.id)))
      )
    }
  };

  function formatDateTime(dateString: string | null | undefined | Date): string {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  const handleCloseModal = () => {
    setShowModal(false)
  };
  if(!requestList || requestList.length ===0 ){
    return <div>Нет данных для отображения</div>
  }
  return (
    <>
      <ModalConfirm
        text={textModal}
        textConfirm={textConfirmModal}
        show={showModal}
        id={selectedItem || 0}
        confirmFunction={confirmFunctionModal}
        handleCloseModal={handleCloseModal}
      />
      <div style={{minHeight: "350px", maxHeight: "600px", overflowY: "auto"}}>
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
              <td>{formatDateTime(request.registrationDateTime)}</td>
              <td>{formatDateTime(request.closureDateTime)}</td>
              <td>
                {
                  request.status === 'Ожидает' && localStorage.getItem('fullName') === request.userFullName.toString() ?
                <button style={{border: "none", background: "none"}}
                            onClick = {() => handleCancelClick(request.id)}>
                      <XCircle/>
                </button>
                    :
                    request.status === 'Выполнена' && localStorage.getItem('fullName') === request.userFullName.toString() ?
                      <button style={{border: "none", background: "none"}}
                              onClick = {() => handleConfirmReceivingClick(request.id)}>
                        <Check/>
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
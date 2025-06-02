import React, {useEffect, useState} from 'react';
import {Nomenclature} from '../model/Nomenclature'
import Table from 'react-bootstrap/Table'
import {Button, Col, Form, Row} from "react-bootstrap";
import {Equipment} from "../model/Equipment";
import {Check, Pencil, Trash, X} from "react-bootstrap-icons";
import {addEquipment, changeEquipmentCount, deleteEquipment} from "../api/equipmentApi";
import ModalConfirm from "./modal/modalConfirm";

interface EquipmentTableProps {
  equipment: Equipment[];
  setEquipment: (equipment: Equipment[]) => void;
  nomenclatures: Nomenclature[];
  refreshEquipment: () => void
}

const EquipmentTable: React.FC<EquipmentTableProps> = ({equipment, setEquipment, nomenclatures, refreshEquipment }) => {

  const [tempEquipmentCount, setTempEquipmentCount] = useState<number>(0);
  const [newEquipmentCount, setNewEquipmentCount] = useState<number>(1);
  const [countChanged, setCountChanged] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<number>();
  const [selectedItemToDeleteId, setSelectedItemToDeleteId] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedNomenclatureIdToRegister, setSelectedNomenclatureIdToRegister] = useState<number>(-1)
  const [nomenclatureList, setNomenclatureList] = useState<Nomenclature[]>(nomenclatures);

  useEffect(() => {
    setNomenclatureList(nomenclatures);
  }, [nomenclatures]);

  const inputStyle = {
    border: 'black solid 1px',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  };

  const handleInputCountChange = (id: number, newCountValue: number) => {
    setTempEquipmentCount(newCountValue);
    setCountChanged(true);
  };

  const handleInputNewEquipmentCountChange = (value: number) => {
    setNewEquipmentCount(value);
  };

  const handleEditClick = (id: number) => {
    setSelectedItemId(id)
    setCountChanged(false);
  };

  const handleDeleteClick = (id: number) => {
    setShowModal(true)
    setCountChanged(false);
    setSelectedItemToDeleteId(id)
  };

  const confirmDelete = (id: number) => {
    setCountChanged(false);
    deleteEquipment(id).then(() => setEquipment(
      equipment.filter(equipment => equipment.id !== id)
    ))
    setSelectedItemId(-1);
    setSelectedItemToDeleteId(id);
  };



  const handleRegisterEquipmentClick = (nomenclature_id: number, count: number) => {
    console.log("Добавляем ТМЦ")
    addEquipment(nomenclature_id, count).then(() => refreshEquipment())
  };


  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedItemId(-1)
  };

  const handleCancelClick = () => {
    setSelectedItemId(-1)
  };

  const handleConfirmChangeCountClick = (id: number, count: number) => {
    if (countChanged) {
      changeEquipmentCount(id, count).then(() => refreshEquipment())
      }
  }

  if(!equipment ||equipment.length ===0 ){
    return <div>Нет данных для отображения</div>
  }
  return (
    <>
    <ModalConfirm
      text={'Вы уверены, что хотите удалить элемент?'}
      textConfirm={'Да, удалить'}
      show={showModal}
      id={selectedItemToDeleteId || 0}
      confirmFunction={confirmDelete}
      handleCloseModal={handleCloseModal}
    />
          <div style={{minHeight: "300px",maxHeight: "600px", overflowY: "auto"}}>
            <Table striped="columns">
              <thead>
              <tr>
                <th style={{border: '1px solid black', padding: '8px'}}>ID</th>
                <th style={{border: '1px solid black', padding: '8px'}}>Наименование</th>
                <th style={{border: '1px solid black', padding: '8px', width: '115px'}}>Количество</th>
                <th style={{border: '1px solid black', padding: '8px', width: '100px'}}>Действия</th>
              </tr>
              </thead>
              <tbody>
              {equipment.map((equipment) =>
                  <tr key={equipment.id}>
                    <td>{equipment.id}</td>
                    <td>{equipment.name}</td>
                    <td>
                      {equipment.id === selectedItemId ?
                        <input
                          type = "text"
                          style = {inputStyle}
                          defaultValue={equipment.count}
                          onChange = {(e) => handleInputCountChange(equipment.id, Number(e.target.value))}
                          />
                        : equipment.count}
                    </td>
                    <td>
                      {equipment.id === selectedItemId ?
                        <>
                          <button style={{border: "none", background: "none"}}
                                  onClick = {() => {
                                    handleConfirmChangeCountClick(selectedItemId, tempEquipmentCount)
                                    setSelectedItemId(-1)
                                  }}
                          >
                            <Check/>
                          </button>
                          <button style={{border: "none", background: "none"}}
                                  onClick = {() => handleCancelClick()}>
                            <X/>
                          </button>
                        </>
                        :
                        <>
                          <button style={{border: "none", background: "none"}}
                          onClick={() => handleDeleteClick(equipment.id)}>
                            <Trash/>
                          </button>
                          <button style={{border: "none", background: "none"}}
                                  onClick = {() => handleEditClick(equipment.id)}>
                            <Pencil/>
                          </button>
                        </>
                      }
                    </td>
                  </tr>
              )}
              </tbody>
            </Table>
          </div>
      <Row>
        <Col>
          <Form.Select style={{minWidth: "250px"}} aria-label="Выберите номенклатуру" className="ms-2"
                       onChange= {(e) =>{
                         console.log("принимаем тмц");
                         setSelectedNomenclatureIdToRegister(Number(e.target.value))
                       }}
          >
            <option>Выберите номенклатуру</option>
            {nomenclatureList.map((nomenclature) =>
                <option key={nomenclature.id} value= {nomenclature.id} >
                  {nomenclature.name}
                </option>
            )}
          </Form.Select>
        </Col>
        <Col>
          <input
            type = "text"
            style = {inputStyle}
            defaultValue={1}
            onChange = {(e) => handleInputNewEquipmentCountChange(Number(e.target.value))}
          />
        </Col>
        <Col>
          <Button variant="primary" onClick={() =>
            handleRegisterEquipmentClick(selectedNomenclatureIdToRegister, newEquipmentCount)

          }> Добавить
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default EquipmentTable;
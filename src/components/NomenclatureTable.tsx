import React, {useEffect, useState} from 'react';
import {Nomenclature} from '../api/Nomenclature'
import Table from 'react-bootstrap/Table'
import {Check, Pencil, Trash, X} from 'react-bootstrap-icons';
import {Equipment} from "../api/Equipment";
import {
  addEquipment,
  addNomenclature,
  changeEquipmentCount, changeNomenclatureTitle,
  deleteEquipment,
  deleteNomenclature,
  getAllEquipment,
  getAllNomenclatures
} from "../api/equipmentApi";
import ModalDelete from "./modal/modalDelete";
import {Button, Col, Form, Row} from "react-bootstrap";

interface NomenclatureTableProps {
  nomenclatures: Nomenclature[];
  setNomenclatures: (nomenclatures: Nomenclature[]) => void;
}

const NomenclatureTable: React.FC< NomenclatureTableProps > = ({ nomenclatures, setNomenclatures}) => {

  const [nomenclatureList, setNomenclatureList] = useState<Nomenclature[]>(nomenclatures);
  const [tempEquipmentTitle, setTempEquipmentTitle] = useState<string>("");
  const [titleChanged, setTitleChanged] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<number>();
  const [selectedItemToDeleteId, setSelectedItemToDeleteId] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [nomenclatureTitleToRegister, setNomenclatureTitleToRegister] = useState<string>("")

  const inputStyle = {
    border: 'black solid 1px',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  };

  useEffect(() => {
    setNomenclatureList(nomenclatures);
  }, [nomenclatures]);

  const handleInputTitleChange = (id: number, newTitleValue: string) => {
    setTempEquipmentTitle(newTitleValue);
    setTitleChanged(true);
  };

  const handleInputNewEquipmentTitleChange = (value: string) => {
    setNomenclatureTitleToRegister(value);
  };

  const handleEditClick = (id: number) => {
    setSelectedItemId(id)
    setTitleChanged(false);
  };

  const handleDeleteClick = (id: number) => {
    setShowModal(true)
    setTitleChanged(false);
    setSelectedItemToDeleteId(id)
  };

  //todo расписать этот треш так, чтобы был запрет на удаление номенклатуры, которая есть на складе
  const confirmDelete = (id: number) => {
    setTitleChanged(false);
    deleteNomenclature(id).then(() => setNomenclatureList((prev) =>
      prev.filter(nomenclature => nomenclature.id !== id)
    ))
    setSelectedItemId(-1);
    setSelectedItemToDeleteId(id);
  };

  const handleRegisterNomenclatureClick = (title: string) => {
    if (title !== "") {
      addNomenclature(title).then(() => getAllNomenclatures()
        .then((data) => setNomenclatures(data.sort((a, b) => a.id - b.id)))
      )
    }
  };


  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedItemId(-1)
  };

  const handleCancelClick = () => {
    setSelectedItemId(-1)
  };

  const handleConfirmChangeTitleClick = (id: number, title: string) => {
    if (titleChanged) {
      changeNomenclatureTitle(id,title).then(() => {
        setNomenclatures(nomenclatures.map(item =>
            item.id === id ? {...item, name: title} : item
          )
        )
      })
    }
  }

  const handleError = (errorText: string) => {
    //todo сделать вывод сообщения об ошибке
  };



  if(!nomenclatureList ||nomenclatureList.length ===0 ){
    return <div>Нет данных для отображения</div>
  }
  return (
    <>
      <ModalDelete
        show={showModal}
        id={selectedItemToDeleteId || 0}
        confirmDelete={confirmDelete}
        handleCloseModal={handleCloseModal}
      />
      <div style={{maxHeight: "300px", overflowY: "auto"}}>
        <Table striped="columns">
          <thead>
          <tr>
            <th style={{border: '1px solid black', padding: '8px'}}>ID</th>
            <th style={{border: '1px solid black', padding: '8px'}}>Наименование</th>
            <th style={{border: '1px solid black', padding: '8px', width: '100px'}}>Действия</th>
          </tr>
          </thead>
          <tbody>
          {nomenclatureList.map((nomenclature) =>
            <tr key={nomenclature.id}>
              <td>{nomenclature.id}</td>
              <td>
                {nomenclature.id === selectedItemId ?
                  <input
                    type = "text"
                    style = {inputStyle}
                    defaultValue={nomenclature.name}
                    onChange = {(e) => handleInputTitleChange(nomenclature.id, e.target.value)}
                  />
                  : nomenclature.name}
              </td>
              <td>
                {nomenclature.id === selectedItemId ?
                  <>
                    <button style={{border: "none", background: "none"}}
                            onClick = {() => {
                              handleConfirmChangeTitleClick(selectedItemId, tempEquipmentTitle)
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
                            onClick={() => handleDeleteClick(nomenclature.id)}>
                      <Trash/>
                    </button>
                    <button style={{border: "none", background: "none"}}
                            onClick = {() => handleEditClick(nomenclature.id)}>
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
        <Col style={{minWidth: "320px"}}>
          <input
            type = "text"
            style = {inputStyle}
            defaultValue={""}
            onChange = {(e) => handleInputNewEquipmentTitleChange(e.target.value)}
          />
        </Col>
        <Col>
          <Button variant="primary" className= "me-3" onClick={() =>
            handleRegisterNomenclatureClick(nomenclatureTitleToRegister)
          }> Зарегистрировать
          </Button>
        </Col>
      </Row>

    </>
  );
};

export default NomenclatureTable;
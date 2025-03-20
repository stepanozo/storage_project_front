import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {deleteEquipment} from "../../api/equipmentApi";


export interface ModalDeleteProps {
  show: boolean;
  id: number;
  confirmDelete: (id: number) => void;
  handleCloseModal: () => void;
}

const ModalDelete = (props: ModalDeleteProps) => {
  return (
    <>
      <Modal show={props.show} onHide={() => props.handleCloseModal()} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Подтвердить удаление</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы уверены, что хотите удалить элемент?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() =>
            props.handleCloseModal()
          }>
            Отмена
          </Button>
          <Button variant="primary" onClick={
            () => {
              props.confirmDelete(props.id)
              props.handleCloseModal();
            }
          }>
            Да, удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDelete;
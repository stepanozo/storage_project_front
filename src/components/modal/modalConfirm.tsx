import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export interface ModalConfirmProps {
  text: string;
  textConfirm: string;
  show: boolean;
  id: number;
  confirmFunction: (id: number) => void;
  handleCloseModal: () => void;
}

const ModalConfirm = (props: ModalConfirmProps) => {
  return (
    <>
      <Modal show={props.show} onHide={() => props.handleCloseModal()} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Подтверждение</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() =>
            props.handleCloseModal()
          }>
            Отмена
          </Button>
          <Button variant="primary" onClick={
            () => {
              console.log('НАЖАЛ КНОПКУ')
              props.confirmFunction(props.id)
              props.handleCloseModal();
            }
          }>
            {props.textConfirm}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfirm;
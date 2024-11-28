import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type ModalProp = {
    show: boolean; 
    onHide: () => void;
    onConfirm: () => void;
    message: string
}

export function VerticallyCenteredModal({ show, onHide, onConfirm, message }: ModalProp) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirmation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
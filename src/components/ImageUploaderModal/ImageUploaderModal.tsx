import Modal from 'react-bootstrap/Modal';
import ImageUploader from '../ImageUploader/ImageUploader';
import { BookPropType } from '../../types/books/book.type';
import './ImageUploaderModal.css'

type ImageUploaderModalProps = {
    show: boolean; 
    onHide: () => void;
    book: BookPropType;
}

export function ImageUploaderModal({ show, onHide, book }: ImageUploaderModalProps) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="custom-modal-header">
      </Modal.Header>
      <Modal.Body>
        <ImageUploader book={book} onHide={onHide}/>
      </Modal.Body>
    </Modal>
  );
}
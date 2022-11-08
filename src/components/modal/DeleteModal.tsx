import { MouseEventHandler } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export interface Props {
  onHide: any;
  handleDelete: MouseEventHandler<HTMLButtonElement>;
  show: boolean;
}

export default function DeleteModal(props: Props) {
  const { handleDelete, ...modalProps } = props;

  return (
    <Modal {...modalProps} centered size="sm">
      <Modal.Header>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <b>Are you sure ?</b>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="button"
          variant="danger"
          onClick={props.handleDelete}
        >
          ok
        </Button>
        <Button className="button" variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

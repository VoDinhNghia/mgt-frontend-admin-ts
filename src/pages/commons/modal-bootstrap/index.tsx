import React from "react";
import { modalTypes } from "../../../constants/constant";
import { Modal, Button } from "react-bootstrap";
import { ImodalBootstrapCommon } from "../../../interfaces/common.interface";

const ModalBootstrapCommon = (props: ImodalBootstrapCommon) => {
  const {
    type,
    isShowModal,
    onCloseModal,
    onAdd,
    onDelete,
    onUpdate,
    nameTitle,
    body,
  } = props;

  return (
    <Modal show={isShowModal}>
      <Modal.Header closeButton={true} onHide={() => onCloseModal()}>
        {type === modalTypes.ADD ? <h4>Add {nameTitle}</h4> : null}
        {type === modalTypes.DELETE ? <h4>Delete {nameTitle}</h4> : null}
        {type === modalTypes.UPDATE ? <h4>Update {nameTitle}</h4> : null}
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        {type === modalTypes.ADD ? (
          <Button variant="outline-primary" size="sm" onClick={() => onAdd()}>
            Add
          </Button>
        ) : null}
        {type === modalTypes.UPDATE ? (
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => onUpdate()}
          >
            Update
          </Button>
        ) : null}
        {type === modalTypes.DELETE ? (
          <Button variant="outline-danger" size="sm" onClick={() => onDelete()}>
            Yes
          </Button>
        ) : null}
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => onCloseModal()}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalBootstrapCommon;

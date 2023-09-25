import React, { useState } from "react";
import { IpropModalPermission } from "../../../interfaces/permission.interface";
import { connect } from "react-redux";
import {
  modalTypes,
  moduleOptions,
  permissionOptions,
} from "../../../constants/constant";
import { Form, Modal, Button } from "react-bootstrap";
import Select from "react-select";
import { IeventOnchangeSelect } from "../../../interfaces/common.interface";

const ModalPermissionMgtPage = (props: IpropModalPermission) => {
  const { type, isShowModal, onCloseModal, adminInfo } = props;
  const [moduleName, setModuleName] = useState("");
  const permissions = adminInfo?.permissions?.map(
    (per: { _id: string; moduleName: string }) => {
      return {
        value: per?._id,
        label: per?.moduleName,
      };
    }
  );

  return (
    <Modal show={isShowModal}>
      <Modal.Header closeButton={true} onHide={() => onCloseModal()}>
        {type === modalTypes.ADD ? <h4>Add permisson for admin</h4> : null}
        {type === modalTypes.DELETE ? <h4>Delete permission</h4> : null}
      </Modal.Header>
      <Modal.Body>
        {type === modalTypes.ADD ? (
          <>
            <Form.Label>Select module name</Form.Label>
            <Select
              options={moduleOptions}
              onChange={(e: IeventOnchangeSelect) => setModuleName(e.value)}
            />
            {moduleName ? (
              <>
                <Form.Label className="mt-2">Selete permission</Form.Label>
                <Select isMulti options={permissionOptions} />
              </>
            ) : null}
          </>
        ) : null}
        {type === modalTypes.DELETE ? (
          <>
            <Form.Label>Select module name</Form.Label>
            <Select options={permissions} />
          </>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        {type === modalTypes.ADD ? (
          <Button variant="outline-primary" size="sm">
            Add
          </Button>
        ) : null}
        {type === modalTypes.DELETE ? (
          <Button variant="outline-danger" size="sm">
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

export default connect()(ModalPermissionMgtPage);

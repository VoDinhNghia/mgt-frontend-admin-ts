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
import { permissionActions } from "../../../store/actions";

const ModalPermissionMgtPage = (props: IpropModalPermission) => {
  const { type, isShowModal, onCloseModal, adminInfo, dispatch, fetchAdmins } =
    props;
  const [moduleName, setModuleName] = useState("");
  const [permissionId, setPermissionId] = useState("");
  const [permission, setPermission] = useState([]);
  const permissions = adminInfo?.permissions?.map(
    (per: { _id: string; moduleName: string }) => {
      return {
        value: per?._id,
        label: per?.moduleName,
      };
    }
  );

  const addPermisson = () => {
    dispatch({
      type: permissionActions.ADD_PERMISSION,
      payload: {
        user: adminInfo?.profile?._id,
        moduleName,
        permission: permission?.map((per: { value: string }) => {
          return per?.value;
        }),
      },
    });
    fetchAndCloseModal();
  };

  const deletePermission = () => {
    dispatch({
      type: permissionActions.DELETE_PERMISSION,
      id: permissionId,
    });
    fetchAndCloseModal();
  };

  const fetchAndCloseModal = () => {
    setTimeout(() => {
      fetchAdmins();
      onCloseModal();
    }, 100);
  };

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
                <Select
                  isMulti
                  options={permissionOptions}
                  onChange={(values: IeventOnchangeSelect) =>
                    setPermission(values)
                  }
                />
              </>
            ) : null}
          </>
        ) : null}
        {type === modalTypes.DELETE ? (
          <>
            <Form.Label>Select module name</Form.Label>
            <Select
              options={permissions}
              onChange={(e: IeventOnchangeSelect) => setPermissionId(e.value)}
            />
          </>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        {type === modalTypes.ADD ? (
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => addPermisson()}
          >
            Add
          </Button>
        ) : null}
        {type === modalTypes.DELETE ? (
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => deletePermission()}
          >
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

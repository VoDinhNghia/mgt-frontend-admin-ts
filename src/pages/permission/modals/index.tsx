import React, { useState } from "react";
import { IpropModalPermission } from "../../../interfaces/permission.interface";
import { connect } from "react-redux";
import {
  modalTypes,
  moduleOptions,
  permissionOptions,
} from "../../../constants/constant";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { IeventOnchangeSelect } from "../../../interfaces/common.interface";
import { permissionActions } from "../../../store/actions";
import ModalBootstrapCommon from "../../commons/modal-bootstrap";

const ModalPermissionMgtPage = (props: IpropModalPermission) => {
  const { type, isShowModal, onCloseModal, adminInfo, dispatch, fetchAdmins } =
    props;
  const [state, setState] = useState({
    moduleName: "",
    permission: [],
    permissionId: "",
  });
  const permissions = adminInfo?.permissions?.map(
    (per: { _id: string; moduleName: string }) => {
      return {
        value: per?._id,
        label: per?.moduleName,
      };
    }
  );

  const { moduleName, permission, permissionId } = state;

  const onAdd = () => {
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

  const onDelete = () => {
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

  const content = (
    <div>
      {type === modalTypes.DELETE ? (
        <>
          <Form.Label>Select module name</Form.Label>
          <Select
            options={permissions}
            onChange={(e: IeventOnchangeSelect) =>
              setState({ ...state, permissionId: e.value })
            }
          />
        </>
      ) : (
        ""
      )}
      {type === modalTypes.ADD ? (
        <>
          <Form.Label>Select module name</Form.Label>
          <Select
            options={moduleOptions}
            onChange={(e: IeventOnchangeSelect) =>
              setState({ ...state, moduleName: e.value })
            }
          />
          {moduleName ? (
            <>
              <Form.Label className="mt-2">Selete permission</Form.Label>
              <Select
                isMulti
                options={permissionOptions}
                onChange={(values: IeventOnchangeSelect) =>
                  setState({ ...state, permission: values })
                }
              />
            </>
          ) : null}
        </>
      ) : (
        ""
      )}
    </div>
  );

  return (
    <ModalBootstrapCommon
      isShowModal={isShowModal}
      type={type}
      onCloseModal={() => onCloseModal()}
      nameTitle="permission"
      onAdd={() => onAdd()}
      onDelete={() => onDelete()}
      body={content}
    />
  );
};

export default connect()(ModalPermissionMgtPage);

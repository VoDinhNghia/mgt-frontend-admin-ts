import React, { useState } from "react";
import { IpropImportFilterUser } from "../../../interfaces/user.interface";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import {
  modalTypes,
  selectMuiTypes,
  userRoleOptions,
  userStatusOptions,
} from "../../../constants/constant";
import { Form } from "react-bootstrap";
import { IeventOnchangeFile } from "../../../interfaces/common.interface";
import { userActions } from "../../../store/actions";
import SelectMuiCommon from "../../commons/select-mui";
import DialogModalCommonPage from "../../commons/dialog-mui";

const FilterAndImportModal = (props: IpropImportFilterUser) => {
  const { type, isShowModal, onCloseModal, dispatch, fetchUsers } = props;
  const [state, setState] = useState({
    file: "",
    role: "",
    status: "",
  });

  const onFilter = () => {
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        status: state.status,
        role: state.role,
      },
    });
    closeModal();
  };

  const onImport = () => {
    const formData = new FormData();
    formData.append("file", state.file);
    dispatch({
      type: userActions.IMPORT_USER,
      payload: formData,
    });
    setTimeout(() => {
      fetchUsers();
      onCloseModal();
    }, 100);
  };

  const closeModal = () => {
    setTimeout(() => {
      onCloseModal();
    }, 70);
  };

  const content = (
    <div>
      {type === modalTypes.IMPORT ? (
        <form onSubmit={() => onImport()}>
          <Form.Label>Select file csv:</Form.Label>
          <Form.Control
            type="file"
            required={true}
            onChange={(e: IeventOnchangeFile) =>
              setState({ ...state, file: e.target.files[0] })
            }
          />
          <Button variant="contained" className="mt-4 w-100" type="submit">
            Import
          </Button>
        </form>
      ) : (
        ""
      )}
      {type === modalTypes.FILTER ? (
        <>
          <p>Role:</p>
          <SelectMuiCommon
            type={selectMuiTypes.NORMAL}
            options={userRoleOptions}
            onChangeSelect={(value: string) =>
              setState({ ...state, role: value })
            }
          />
          <p className="mt-2">Status:</p>
          <SelectMuiCommon
            type={selectMuiTypes.NORMAL}
            options={userStatusOptions}
            onChangeSelect={(value: string) =>
              setState({ ...state, status: value })
            }
          />
        </>
      ) : (
        ""
      )}
    </div>
  );

  return (
    <DialogModalCommonPage
      type={type}
      isShowModal={isShowModal}
      onCloseModal={() => onCloseModal()}
      onFilter={() => onFilter()}
      isShowButtonUpdate={true}
      content={content}
      nameTitle="user"
    />
  );
};

export default connect()(FilterAndImportModal);

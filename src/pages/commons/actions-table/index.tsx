import React from "react";
import { Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { IpropActionTableCommon } from "../../../interfaces/common.interface";

const ActionTableCommon = (props: IpropActionTableCommon) => {
  const { setState, state, rowData, isPermissionDelete, isPermissionUpdate } =
    props;

  return (
    <>
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() =>
          setState({
            ...state,
            isShowModalUpdate: true,
            rowData,
          })
        }
        disabled={!isPermissionUpdate}
      >
        <BsPencilSquare />
      </Button>{" "}
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() =>
          setState({
            ...state,
            isShowModalDelete: true,
            rowData,
          })
        }
        disabled={!isPermissionDelete}
      >
        <BsTrash />
      </Button>
    </>
  );
};

export default ActionTableCommon;

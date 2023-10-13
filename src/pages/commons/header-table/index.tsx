import React from "react";
import { TableHead, TableRow, TableCell } from "@mui/material";
import { IheaderTableCommon } from "../../../interfaces/common.interface";

const HeaderTableCommon = (props: IheaderTableCommon) => {
  const { headerList = [] } = props;

  return (
    <TableHead>
      <TableRow className="fs-6">
        {headerList?.map((column, index) => (
          <TableCell
            key={`${index}-${column.id}`}
            className="bg-success text-white"
            style={column.id === "actions" ? { width: column?.minWidth || 102 } : undefined}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default HeaderTableCommon;

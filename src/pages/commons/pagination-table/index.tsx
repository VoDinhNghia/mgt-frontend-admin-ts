import React from "react";
import { TablePagination } from "@mui/material";
import { IpaginationTableCommon } from "../../../interfaces/common.interface";

const PaginationTableCommon = (props: IpaginationTableCommon) => {
  const { total, limit, page, setState, fetchList, state } = props;

  const handleChangePage = (event: unknown, newPage: number) => {
    setState({ ...state, page: newPage });
    fetchList(newPage + 1, limit);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value);
    setState({ ...state, limit: newLimit });
    fetchList(1, newLimit);
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={total}
      rowsPerPage={limit}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default PaginationTableCommon;

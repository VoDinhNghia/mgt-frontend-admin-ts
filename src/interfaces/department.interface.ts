import { IparamsFetchList } from "./common.interface";

export interface IcreateDepartment {
  name?: string;
  introduction?: string;
  foundYear?: string;
  manager?: string;
  contacts?: {
    office?: string;
    email?: string;
    phone?: string;
    fax?: string;
  };
  function?: [
    {
      title?: string;
      content?: string;
    },
  ];
  task?: [
    {
      title?: string;
      content?: string;
    },
  ];
  attachment?: string[];
}

export interface IcreateMultiDepartmentStaff {
  staffs?: [
    {
      staff?: string;
      joinDate?: Date | string;
    },
  ];
  department?: string;
}

export interface IcreateDepartmentStaff {
  staff?: string;
  joinDate?: Date | string;
  department?: string;
}

export interface IparamsFetchDepartments extends IparamsFetchList {
  manager?: string;
}

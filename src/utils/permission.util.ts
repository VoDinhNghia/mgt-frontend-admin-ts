import { userRoles } from "../constants/constant";
import { Ipermissions, IuserInfo } from "../interfaces/login.interface";
import { getCurrentUser, getPermission } from "../services/auth.service";

export const validateRoleSa = () => {
  const currentUser = getCurrentUser();
  const isRoleSa = currentUser?.role === userRoles.SUPPER_ADMIN;
  return isRoleSa;
};

export const findModuleName = (moduleName: string) => {
  const permissionList = getPermission();
  const existPermission = permissionList?.find(
    (per: Ipermissions) => per?.moduleName === moduleName
  );
  return existPermission || [];
};

export const validateAccessModule = (moduleName: string) => {
  const isRoleSa = validateRoleSa();
  const result = findModuleName(moduleName);
  const isAccess = result || isRoleSa ? true : false;
  return isAccess;
};

export const validateAction = (action: string, moduleName: string) => {
  const isRoleSa = validateRoleSa();
  const permissionModule = findModuleName(moduleName);
  const { permission = [] } = permissionModule;
  const isPermissonAction = permission?.includes(action);
  const isPermisson = isRoleSa || isPermissonAction ? true : false;
  return isPermisson;
};

export const headerPermisionTable = () => {
  const headers = [
    {
      id: "index",
      label: "#",
      minWidth: 170,
    },
    {
      id: "name",
      label: "Name",
      minWidth: 170,
    },
    {
      id: "code",
      label: "Code",
      minWidth: 170,
    },
    {
      id: "moduleName",
      label: "Module Name",
      minWidth: 170,
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 170,
    },
  ];
  return headers;
};

export const handleDataPermissionTable = (listAdmin = []) => {
  const data = listAdmin?.map((admin: IuserInfo, index: number) => {
    const { profile } = admin;
    return {
      _id: admin?._id,
      index: index + 1,
      name: `${profile?.lastName} ${profile?.middleName} ${profile?.firstName}`,
      code: profile?.code,
      permissions: admin?.permissions,
      moduleNames: admin?.permissions?.map((per: Ipermissions) => {
        return per?.moduleName;
      }),
      profile,
    };
  });
  return data;
};

export const colors = ["primary", "success", "warning", "danger", "info"];

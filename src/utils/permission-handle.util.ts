import { userRoles } from "../constants/constant";
import { Ipermissions } from "../interfaces/login.interface";
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

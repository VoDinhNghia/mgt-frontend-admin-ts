export const routes = {
  dashboard: "/dashboard",
  login: "/login",
  userMgt: "/user-mgt",
  permissionMgt: "/permission-mgt",
};

export const STUDENT_SERVER_URL = process.env.REACT_APP_API_STUDENT_URL;

export const userRoles = {
  SUPPER_ADMIN: "SUPPER_ADMIN",
  ADMIN: "ADMIN",
};

export const moduleNames = {
  USER_MANAGEMENT: "Users Management",
  ROOM_MANAGEMENT: "Rooms Management",
  FACULTIES_MANAGEMENT: "Faculties Management",
  PERMISSION_MANAGEMENT: "Permission Management",
  SETTINGS: "Settings",
  AWARDS_MANAGEMENT: "Awards Management",
  BRANCH_MANAGEMENT: "Branch Management",
};

export const moduleOptions = [
  {
    value: "Users Management",
    label: "Users Management",
  },
  {
    value: "Rooms Management",
    label: "Rooms Management",
  },
  {
    value: "Faculties Management",
    label: "Faculties Management",
  },
  {
    value: "Permission Management",
    label: "Permission Management",
  },
  {
    value: "Settings",
    label: "Settings",
  },
  {
    value: "Awards Management",
    label: "Awards Management",
  },
  {
    value: "Branch Management",
    label: "Branch Management",
  },
];

export const modalTypes = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  UPDATE_PASSWORD: "UPDATE_PASSWORD",
  UPDATE_PROFILE: "UPDATE_PROFILE",
  DELETE: "DELETE",
  VIEW: "VIEW",
  IMPORT: "IMPORT",
  FILTER: "FILTER",
};

export const userGenderOptions = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

export const userRoleOptions = [
  {
    value: "ADMIN",
    label: "ADMIN",
  },
  {
    value: "STUDENT",
    label: "STUDENT",
  },
  {
    value: "LECTURER",
    label: "LECTURER",
  },
  {
    value: "LIBRARIAN",
    label: "LIBRARIAN",
  },
  {
    value: "ACCOUNTANT",
    label: "ACCOUNTANT",
  },
  {
    value: "STAFF",
    label: "STAFF",
  },
];

export const userStatusOptions = [
  {
    value: "ACTIVE",
    label: "ACTIVE",
  },
  {
    value: "INACTIVE",
    label: "INACTIVE",
  },
];

export const permissonTypes = {
  ONLY_VIEW: "ONLY_VIEW",
  EDIT: "EDIT",
  DELETE: "DELETE",
  ADD: "ADD",
};

/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IeventOnchangeInput {
  target: {
    value: string;
  };
}

export type IeventOnchangeSelect = any;

export interface IparamsFetchList {
  searchKey?: string;
  page?: number;
  limit?: number;
}

export interface IactionRedux {
  type: string;
  payload: any;
}

export interface IparamSaga {
  payload: any;
  id: string;
}

export interface IresponseAxios {
  data: {
    statusCode: number;
    data: any;
    message: string;
  };
}

export type IreturnTypeSaga = any;
export type ItakeLatestSaga = any;

export interface IuserReducer {
  listUsers?: object[] | string | number | boolean | any;
  totalUser?: number;
  userInfo?: any;
  dispatch?: any;
  listAdmins?: any;
}

export interface IstateRedux {
  UserReducer: IuserReducer;
  PermissionReducer: {
    listPermissions: any;
    totalPermission: number;
  };
  RoomReducer: {
    listRooms: any;
    totalRoom: number;
  };
  FacultyReducer: {
    listFaculties: any;
    totalFaculty: number;
    listMajors: any;
    totalMajor: number;
  };
  SettingReducer: {
    listLearningRates: any;
    totalLearningRate: number;
    listSubjectPass: any;
    totalSubjectPass: number;
    listMoneyCredits: any;
    totalMoneyCredit: number;
  };
  SemesterReducer: {
    listSemesters: any;
    totalSemester: number;
  };
  AwardReducer: {
    listAwards: any;
    totalAward: number;
  };
  BranchReducer: {
    listBranchs: any;
    totalBranch: number;
  };
  ClassSubjectReducer: {
    listClasses: any;
    totalClass: number;
    listSubjects: any;
    totalSubject: number;
  };
  CourseReducer: {
    listCourses: any;
    totalCourse: number;
  };
  UnionReducer: {
    listUnions: any;
    totalUnion: number;
    listUnionMembers: any;
    totalUnionMember: number;
    listUnionImages: any;
    totalUnionImage: number;
  };
  SchoolReducer: {
    schoolInfo: any;
  };
  ScholarshipReducer: {
    listScholarships: any;
    totalScholarship: number;
    listUserScholarships: any;
    totalUserScholarship: number;
  };
  PaymentReducer: {
    listPayments: any;
    totalPayment: number;
  };
  InstitutesReducer: {
    listInstitutes: any;
    totalInstitutes: number;
  };
  DepartmentReducer: {
    listDepartments: any;
    totalDepartment: number;
  };
  CenterReducer: {
    listCenters: any;
    totalCenter: number;
  };
  CountryReducer: {
    listCountries: any;
    totalCountry: number;
    listProvinces: any;
    totalProvince: number;
    listDistricts: any;
    totalDistrict: number;
    listWards: any;
    totalWard: number;
  };
  NewsReducer: {
    listNews: any;
    totalNews: number;
  };
  TrainningPointReducer: {
    listTrainningPoints: any;
    totalTrainningPoint: number;
    listVoluntees: any;
    totalVoluntee: number;
  };
  StudyProcessReducer: {
    listStudyProcess: any;
    totalStudyProcess: number;
    listStudyStudents: any;
    totalStudyStudent: number;
  };
}

export interface IpropsNavToggle {
  expand: boolean;
  setExpand: Function;
}

export interface IpropAddAndSearchTable {
  dispatch?: any;
  title?: string;
  onSearch?: Function | any;
  onShowAdd?: Function | any;
  isDisableBtnAdd?: boolean | any;
  titleSearch?: string;
}

export interface IpropModalCommon {
  dispatch?: any;
  isShowModal?: boolean | any;
  onCloseModal?: Function | any;
  type?: string;
}

export type IeventOnchangeFile = any;

export interface IpropReadMore {
  children?: any;
  isReadMore?: boolean | any;
  setReadMore?: Function | any;
  lengthSlice?: number;
  title?: string;
}

export type IallStateReadMore = any;

export interface IheaderTableCommon {
  headerList: {
    id: string;
    label: string;
    minWidth?: number;
  }[];
}

export interface IpaginationTableCommon {
  page: number;
  limit: number;
  total: number;
  setState: any;
  fetchList: any;
  state: any;
}

export interface IpropActionTableCommon {
  state: any;
  setState: any;
  isPermissionUpdate?: boolean | any;
  isPermissionDelete?: boolean | any;
  rowData?: any;
}

export interface ImodalCommon extends IpropModalCommon {
  onDelete?: any;
  nameTitle?: string;
  content?: any;
  onFilter?: any;
  isShowButtonUpdate?: boolean | any;
  onUpdate?: any;
}

export interface IpropTextFieldForm {
  field: string;
  defaultValue?: string;
  register: any;
  errors: any;
  type?: string;
  rows?: number;
}

export interface IpropSelectReactForm {
  field: string;
  defaultValue?: string | any;
  errors: any;
  control: any;
  options: any;
}

export interface IpropSelectMuiForm {
  field?: string;
  defaultValue?: string | any;
  errors?: any;
  control?: any;
  options: any;
  register?: any;
  type?: string;
  onChangeSelect?: any;
}

export interface ImodalBootstrapCommon extends IpropModalCommon {
  onAdd?: any;
  onUpdate?: any;
  onDelete?: any;
  body: any;
  nameTitle: string;
}

export interface IpropTitleHeader {
  title: string;
}

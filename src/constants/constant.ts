export const routes = {
  dashboard: "/dashboard",
  login: "/login",
  userMgt: "/user-mgt",
  permissionMgt: "/permission-mgt",
  roomMgt: "/room-mgt",
  facultyMgt: "/faculty-mgt",
  settingMgt: "/setting-mgt",
  awardMgt: "/award-mgt",
  branchMgt: "/branch-mgt",
  classSubjectMgt: "/class-subject-mgt",
  courseMgt: "/course-mgt",
  unionsMgt: "/unions-mgt",
  semesterMgt: "/semester-mgt",
  schoolMgt: "/school-mgt",
  scholarshipMgt: "/scholarship-mgt",
  degreelevelMgt: "/degreelevel-mgt",
  paymentMgt: "/payment-mgt",
  institutesMgt: "/institutes-mgt",
  deparmentMgt: "/department-mgt",
  centerMgt: "/center-mgt",
  countriesMgt: "/countries-mgt",
  newsMgt: "/news-mgt",
  trainningPointMgt: "/trainning-point-mgt",
  studyProcessMgt: "/study-process-mgt",
  blogServiceMgt: "/blogs-service-mgt",
  attendanceServiceMgt: "/attendance-mgt",
  libraryServiceMgt: "/library-service-mgt",
};

export const STUDENT_SERVER_URL = process.env.REACT_APP_API_STUDENT_URL;

export const userRoles = {
  SUPPER_ADMIN: "SUPPER_ADMIN",
  ADMIN: "ADMIN",
  LECTURER: "LECTURER",
};

export const moduleNames = {
  USER_MANAGEMENT: "Users Management",
  ROOM_MANAGEMENT: "Rooms Management",
  FACULTIES_MANAGEMENT: "Faculties Management",
  PERMISSION_MANAGEMENT: "Permission Management",
  SETTINGS: "Settings",
  AWARDS_MANAGEMENT: "Awards Management",
  BRANCH_MANAGEMENT: "Branch Management",
  CLASS_SUBJECT_MANAGEMENT: "Class Subject Management",
  COURSE_MANAGEMENT: "Courses Management",
  UNIONS_MANAGEMENT: "Unions Management",
  SEMESTERS_MANAGEMENT: "Semesters Management",
  SCHOOL_MANAGEMENT: "School Management",
  SCHOLARSHIPS_MANAGEMENT: "Scholarships Management",
  DEGREELEVELS_MANAGEMENT: "Degreelevels Management",
  PAYMENTS_MANAGEMENT: "Payments Management",
  INSTITUTES_MANAGEMENT: "Institutes Management",
  DEPARTMENTS_MANAGEMENT: "Departments Management",
  CENTER_MANAGEMENT: "Center Management",
  COUNTRIES_MANAGEMENT: "Countries Management",
  NEWS_MANAGEMENT: "News Management",
  TRAINNING_POINT_MANAGEMENT: "Trainning Point Management",
  STUDY_PROCESS_MANAGEMENT: "Study Process Management",
  BLOG_SERVICE_MANAGEMENT: "Blogs Service Management",
  ATTENDANCE_SERVICE_MANAGEMENT: "Attendance Management",
  LIBRARY_SERVICE_MANAGEMENT: "Library Service Management",
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
  {
    value: "Class Subject Management",
    label: "Class Subject Management",
  },
  {
    value: "Courses Management",
    label: "Courses Management",
  },
  {
    value: "Unions Management",
    label: "Unions Management",
  },
  {
    value: "Semesters Management",
    label: "Semesters Management",
  },
  {
    value: "School Management",
    label: "School Management",
  },
  {
    value: "Scholarships Management",
    label: "Scholarships Management",
  },
  {
    value: "Degreelevels Management",
    label: "Degreelevels Management",
  },
  {
    value: "Payments Management",
    label: "Payments Management",
  },
  {
    value: "Institutes Management",
    label: "Institutes Management",
  },
  {
    value: "Departments Management",
    label: "Departments Management",
  },
  {
    value: "Center Management",
    label: "Center Management",
  },
  {
    value: "Countries Management",
    label: "Countries Management",
  },
  {
    value: "News Management",
    label: "News Management",
  },
  {
    value: "Trainning Point Management",
    label: "Trainning Point Management",
  },
  {
    value: "Study Process Management",
    label: "Study Process Management",
  },
  {
    value: "Blogs Service Management",
    label: "Blogs Service Management",
  },
  {
    value: "Attendance Management",
    label: "Attendance Management",
  },
  {
    value: "Library Service Management",
    label: "Library Service Management",
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

export const permissionOptions = [
  {
    value: "ONLY_VIEW",
    label: "ONLY_VIEW",
  },
  {
    value: "EDIT",
    label: "EDIT",
  },
  {
    value: "DELETE",
    label: "DELETE",
  },
  {
    value: "ADD",
    label: "ADD",
  },
];

export const roomOptions = [
  {
    value: "CLASS_ROOM",
    label: "CLASS_ROOM",
  },
  {
    value: "MEETING",
    label: "MEETING",
  },
  {
    value: "GROUP_STUDY",
    label: "GROUP_STUDY",
  },
  {
    value: "LIBRARIAN",
    label: "LIBRARIAN",
  },
  {
    value: "OFFICE_DEPARTMENT",
    label: "OFFICE_DEPARTMENT",
  },
];

export const formatDateTime = "YYYY-MM-DD Hm:mm:ss";
export const formatDate = "YYYY-MM-DD";

export const learningRateType = {
  TEN_POINT_SCALE: "TEN_POINT_SCALE",
  FOUR_POINT_SCALE: "FOUR_POINT_SCALE",
  POINT_TRAINNING: "POINT_TRAINNING",
};

export const learningRateOption = [
  {
    value: "TEN_POINT_SCALE",
    label: "TEN_POINT_SCALE",
  },
  {
    value: "FOUR_POINT_SCALE",
    label: "FOUR_POINT_SCALE",
  },
  {
    value: "POINT_TRAINNING",
    label: "POINT_TRAINNING",
  },
];

export const subjectPassSettingType = {
  FINAL_EXAM_POINT: "FINAL_EXAM_POINT",
  ACCUMULATED_POINT: "ACCUMULATED_POINT",
};

export const subjectPassSettingOptions = [
  {
    value: "FINAL_EXAM_POINT",
    label: "FINAL_EXAM_POINT",
  },
  {
    value: "ACCUMULATED_POINT",
    label: "ACCUMULATED_POINT",
  },
];

export const awardTypes = {
  PERSONAL: "PERSONAL",
  GROUP: "GROUP",
  FACULTY: "FACULTY",
  CLASS: "CLASS",
  MAJORS: "MAJORS",
  UNIVERSITY: "UNIVERSITY",
};

export const awardOptions = [
  {
    value: "PERSONAL",
    label: "PERSONAL",
  },
  {
    value: "GROUP",
    label: "GROUP",
  },
  {
    value: "FACULTY",
    label: "FACULTY",
  },
  {
    value: "CLASS",
    label: "CLASS",
  },
  {
    value: "MAJORS",
    label: "MAJORS",
  },
  {
    value: "UNIVERSITY",
    label: "UNIVERSITY",
  },
];

export const inputTypes = {
  TEXT: "text",
  TEXT_AREA: "textarea",
  NUMBER: "number",
  EMAIL: "email",
  PASSWORD: "password",
};

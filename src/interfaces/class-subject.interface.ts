/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Ioptions,
  IparamsFetchList,
  IpropModalCommon,
} from "./common.interface";

export interface IcreateClass {
  course?: string | any;
  name?: string;
  degreeLevel?: string | any;
  classSize?: number;
  major?: string | any;
  homeroomteacher?: string | any;
}

export interface IcreateSubject {
  course?: string;
  name?: string;
  degreeLevel?: string;
  major?: string;
  lecturer?: string;
  semester?: string;
  openTime?: Date | string;
  closeTime?: Date | string;
  size?: number;
  numberCredits?: number;
  learnDate?: string;
  time?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  elective?: boolean;
  calculateCumulativePoint?: boolean;
  midTermTest?: Iexam;
  finalExam?: Iexam;
  studentEssay?: Iexam;
}

export interface Iexam {
  week?: number;
  time?: number | string;
  output?: string;
  percent?: number;
  examDate?: Date | string;
}

export interface IparmasFetchClass extends IparamsFetchList {
  major?: string;
  course?: string;
  degreeLevel?: string;
  homeroomteacher?: string;
}

export interface IparmasFetchSubject extends IparamsFetchList {
  major?: string;
  course?: string;
  degreeLevel?: string;
  homeroomteacher?: string;
}

export interface IoptionsClass {
  userOptions?: Ioptions[];
  courseOptions?: Ioptions[];
  majorOptions?: Ioptions[];
  degreeLevelOptions?: Ioptions[];
}
export interface IpropsClassTab extends IoptionsClass {
  dispatch?: any;
  listClasses?: any;
  totalClass?: number;
}

export interface IrowClassTable extends IcreateClass {
  _id?: string;
  createdBy?: string | any;
  createdAt?: Date | string;
}

export interface IpropsSubjectTab extends IoptionsClass {
  dispatch?: any;
  listSubjects?: any;
  totalSubject?: number;
}

export interface IrowSubjectTable {
  _id?: string;
  name?: string;
  lecturer?: {
    _id?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
  };
  major?: {
    _id?: string;
    name?: string;
  };
  course?: {
    _id?: string;
    name?: string;
  };
  degreeLevel?: {
    _id?: string;
    name?: string;
  };
  semester?: {
    _id?: string;
    name?: string;
    year?: string;
  };
  openTime?: Date | string;
  closeTime?: Date | string;
  size?: number;
  numberCredits?: number;
  elective?: boolean | any;
  calculateCumulativePoint?: boolean | any;
  numberOfFailed?: number;
  numberOfPass?: number;
  status?: boolean | any;
  process?: {
    _id?: string;
    learnDate?: string;
    time?: string;
    startDate?: Date | string;
    endDate?: Date | string;
    midTermTest?: Iexam | any;
    finalExam: Iexam | any;
    studentEssay: Iexam | any;
  };
}

export interface IpropsModalClassPage extends IpropModalCommon {
  fetchClasses?: any;
  classInfo?: any;
  userOptions?: Ioptions[];
  courseOptions?: Ioptions[];
  majorOptions?: Ioptions[];
  degreeLevelOptions?: Ioptions[];
}

export interface IpropsClassMgtPage {
  dispatch?: any;
  listMajors?: any;
  listDegreelevels?: any;
  listCourses?: any;
  listUsers?: any;
}

export interface IpropsModalSubjectPage extends IpropModalCommon {
  fetchSubjects?: any;
  listSemesters?: any;
  subjectInfo?: any;
  size?: string | any;
  userOptions?: Ioptions[];
  courseOptions?: Ioptions[];
  majorOptions?: Ioptions[];
  degreeLevelOptions?: Ioptions[];
}

export interface IpropProcessSubject {
  title?: string;
  fields?: {
    week?: string | any;
    time?: string | any;
    output?: string | any;
    percent?: string | any;
    examDate?: string | any;
  };
  register?: any;
  errors?: any;
  subjectInfo?: any;
  type?: string;
}

export interface IpropSubjectInfoForm extends IoptionsClass {
  register?: any;
  errors?: any;
  control?: any;
  semesterOptions?: Ioptions[];
  subjectInfo?: any;
}

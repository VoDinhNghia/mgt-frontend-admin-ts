/* eslint-disable @typescript-eslint/no-explicit-any */
import { IparamsFetchList } from "./common.interface";

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

export interface IpropsClassTab {
  dispatch?: any;
  listClasses?: any;
  totalClass?: number;
}

export interface IrowClassTable extends IcreateClass {
  _id?: string;
  createdBy?: string | any;
  createdAt?: Date | string;
}

export interface IpropsSubjectTab {
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
    midTermTest?: {
      week?: number;
      time?: number;
      output?: string;
      percent?: number;
      examDate?: Date | string;
    };
    finalExam: {
      week?: number;
      time?: number;
      output?: string;
      percent?: number;
      examDate?: Date | string;
    };
    studentEssay: {
      week?: number;
      time?: number;
      output?: string;
      percent?: number;
      examDate?: Date | string;
    };
  };
}

import { IparamsFetchList } from "./common.interface";

export interface IcreateClass {
  course?: string;
  name?: string;
  degreeLevel?: string;
  classSize?: number;
  major?: string;
  homeroomteacher?: string;
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
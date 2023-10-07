import { IparamsFetchList } from "./common.interface";

export interface IcreateRegisterSubject {
  subject?: string;
  studyprocess?: string;
  statusRegister?: boolean;
}

export interface IparamsFetchStudyProcess extends IparamsFetchList {
  user?: string;
}

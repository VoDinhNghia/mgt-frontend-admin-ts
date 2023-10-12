/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IcreateCourse {
  name?: string;
  year?: string;
  total?: number;
}

export interface IrowTableCourse extends IcreateCourse {
  _id?: string;
}

export interface IpropCourse {
  dispatch?: any;
  listCourses?: any;
  totalCourse?: number;
}

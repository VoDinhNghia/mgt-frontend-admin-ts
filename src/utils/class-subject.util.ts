import { TypeOf, boolean, number, object, string } from "zod";
import { IrowSubjectTable } from "../interfaces/class-subject.interface";
import { formatDate, processSubjectTypes } from "../constants/constant";
import moment from "moment";

export const headerTableClass = [
  {
    id: "index",
    label: "#",
    minWidth: 120,
  },
  {
    id: "name",
    label: "Name",
    minWidth: 120,
  },
  {
    id: "classSize",
    label: "Class Size",
    minWidth: 120,
  },
  {
    id: "major",
    label: "Major",
    minWidth: 120,
  },
  {
    id: "degreeLevel",
    label: "DegreeLevel",
    minWidth: 120,
  },
  {
    id: "course",
    label: "Course",
    minWidth: 120,
  },
  {
    id: "homeroomteacher",
    label: "Home Room Teacher",
    minWidth: 120,
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 102,
  },
];

export const headerTableSubject = [
  {
    id: "index",
    label: "#",
    minWidth: 120,
  },
  {
    id: "name",
    label: "Name",
    minWidth: 120,
  },
  {
    id: "semester",
    label: "Semester",
    minWidth: 120,
  },
  {
    id: "major",
    label: "Major",
    minWidth: 120,
  },
  {
    id: "degreeLevel",
    label: "DegreeLevel",
    minWidth: 120,
  },
  {
    id: "course",
    label: "Course",
    minWidth: 120,
  },
  {
    id: "lecturer",
    label: "Lecturer",
    minWidth: 120,
  },
  {
    id: "detail",
    label: "Detail",
    minWidth: 120,
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 102,
  },
];

export const registerSchemaClassForm = object({
  name: string().nonempty("name is required"),
  course: string().nonempty("course is required"),
  degreeLevel: string().nonempty("degreelevel is required"),
  classSize: string()
    .nonempty("classSize is required")
    .transform((size) => parseInt(size))
    .pipe(number().max(1000).min(1)),
  major: string().nonempty("major is required"),
  homeroomteacher: string().nonempty("homeroomteacher is required"),
});

export type IregisterInputClassForm = TypeOf<typeof registerSchemaClassForm>;

export const fieldsMidTermTest = {
  week: "weekMidTermTest",
  time: "timeMidTermTest",
  percent: "percentMidTermTest",
  examDate: "examDateMidTermTest",
  output: "outputMidTermTest",
};

export const fieldsStudentEssay = {
  week: "weekStudentEssay",
  time: "timeStudentEssay",
  percent: "percentStudentEssay",
  examDate: "examDateStudentEssay",
  output: "outputStudentEssay",
};

export const fieldsFinalExam = {
  week: "weekFinalExam",
  time: "timeFinalExam",
  percent: "percentFinalExam",
  examDate: "examDateFinalExam",
  output: "outputFinalExam",
};

export const getDefaultValue = (
  type: string,
  subjectInfo: IrowSubjectTable,
  field: string
) => {
  switch (type) {
    case processSubjectTypes.MID_TERM_TEST:
      return subjectInfo?.process?.midTermTest[field];

    case processSubjectTypes.STUDENT_ESSAY:
      return subjectInfo?.process?.studentEssay[field];

    case processSubjectTypes.FINAL_EXAM:
      return subjectInfo?.process?.finalExam[field];

    default:
      return "";
  }
};

export const registerSchemaSubjectForm = object({
  name: string().nonempty("name is required"),
  course: string().nonempty("course is required"),
  degreeLevel: string().nonempty("degreelevel is required"),
  major: string().nonempty("major is required"),
  lecturer: string().nonempty("lecturer is required"),
  semester: string().nonempty("semester is required"),
  time: string().nonempty("time is required"),
  size: string()
    .nonempty("size is required")
    .transform((size) => parseInt(size))
    .pipe(number().max(1000).min(1)),
  openTime: string()
    .nonempty("openTime is required")
    .transform((op) => moment(op).format(formatDate)),
  closeTime: string()
    .nonempty("closeTime is required")
    .transform((cl) => moment(cl).format(formatDate)),
  numberCredits: string()
    .nonempty("numberCredits is required")
    .transform((no) => parseInt(no))
    .pipe(number().max(30).min(1)),
  learnDate: string().nonempty("learnDate is required"),
  startDate: string()
    .nonempty("startDate is required")
    .transform((sd) => moment(sd).format(formatDate)),
  endDate: string()
    .nonempty("endDate is required")
    .transform((ed) => moment(ed).format(formatDate)),
  elective: boolean(),
  calculateCumulativePoint: boolean(),
  weekMidTermTest: string()
    .nonempty("weekMidTermTest is required")
    .transform((no) => parseInt(no))
    .pipe(number().max(1000).min(1)),
  timeMidTermTest: string()
    .nonempty("timeMidTermTest is required")
    .transform((no) => parseInt(no))
    .pipe(number().max(3000).min(1)),
  percentMidTermTest: string()
    .nonempty("percentMidTermTest is required")
    .transform((no) => parseInt(no))
    .pipe(number().max(100).min(0)),
  examDateMidTermTest: string()
    .nonempty("examDateMidTermTest is required")
    .transform((sd) => moment(sd).format(formatDate)),
  outputMidTermTest: string().nonempty("outputMidTermTest is required"),
  weekStudentEssay: string()
    .nonempty("weekStudentEssay is required")
    .transform((no) => parseInt(no))
    .pipe(number().max(1000).min(1)),
  timeStudentEssay: string()
    .nonempty("timeStudentEssay is required")
    .transform((no) => parseInt(no))
    .pipe(number().max(3000).min(1)),
  percentStudentEssay: string()
    .nonempty("percentStudentEssay is required")
    .transform((no) => parseInt(no))
    .pipe(number().max(100).min(0)),
  examDateStudentEssay: string()
    .nonempty("examDateStudentEssay is required")
    .transform((sd) => moment(sd).format(formatDate)),
  outputStudentEssay: string().nonempty("outputStudentEssay is required"),
  weekFinalExam: string()
    .nonempty("weekFinalExam is required")
    .transform((no) => parseInt(no))
    .pipe(number().max(1000).min(1)),
  timeFinalExam: string()
    .nonempty("timeFinalExam is required")
    .transform((no) => parseInt(no))
    .pipe(number().max(3000).min(1)),
  percentFinalExam: string()
    .nonempty("percentFinalExam is required")
    .transform((no) => parseInt(no))
    .pipe(number().max(100).min(0)),
  examDateFinalExam: string()
    .nonempty("examDateFinalExam is required")
    .transform((sd) => moment(sd).format(formatDate)),
  outputFinalExam: string().nonempty("outputFinalExam is required"),
});

export type IregisterInputSubjectForm = TypeOf<
  typeof registerSchemaSubjectForm
>;

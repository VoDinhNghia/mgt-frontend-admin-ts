import { TypeOf, number, object, string } from "zod";

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

export const handleOptionCommon = (listItem = []) => {
  const options = listItem?.map((item: { _id: string; name: string }) => {
    return {
      value: item?._id,
      label: item?.name,
    };
  });
  return options;
};

export const handleCourseOptions = (listCourses = []) => {
  const options = handleOptionCommon(listCourses);
  return options;
};

export const handleMajorOptions = (listMajors = []) => {
  const options = handleOptionCommon(listMajors);
  return options;
};

export const handleDegreelevelOptions = (listDegreelevels = []) => {
  const options = handleOptionCommon(listDegreelevels);
  return options;
};

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

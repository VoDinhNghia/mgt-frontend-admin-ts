import { TypeOf, number, object, string } from "zod";

export const headerTableCourse = [
  {
    id: "index",
    label: "#",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "year",
    label: "Year",
  },
  {
    id: "total",
    label: "Total",
  },
  {
    id: "actions",
    label: "Actions",
  },
];

export const registerSchemaCourseForm = object({
  name: string().nonempty("name is required"),
  year: string().nonempty("year is required"),
  total: string()
    .nonempty("total is required")
    .transform((to) => parseInt(to))
    .pipe(number().max(1000000).min(0)),
});

export type IregisterInputCourseForm = TypeOf<typeof registerSchemaCourseForm>;

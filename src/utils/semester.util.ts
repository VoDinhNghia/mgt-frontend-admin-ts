import { TypeOf, object, string } from "zod";

export const headerTableSemesters = [
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
    id: "year",
    label: "Year",
    minWidth: 120,
  },
  {
    id: "code",
    label: "Code",
    minWidth: 120,
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 102,
  },
];

export const registerSchemaSemesterForm = object({
  name: string().nonempty("name must is provided"),
  year: string().nonempty("year must is provided"),
});

export type IregisterInputSemesterForm = TypeOf<
  typeof registerSchemaSemesterForm
>;

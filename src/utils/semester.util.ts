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

export const yearSemesterOptions = [
  {
    value: "2013-2014",
    label: "2013-2014",
  },
  {
    value: "2014-2015",
    label: "2014-2015",
  },
  {
    value: "2015-2016",
    label: "2015-2016",
  },
  {
    value: "2016-2017",
    label: "2016-2017",
  },
  {
    value: "2017-2018",
    label: "2017-2018",
  },
  {
    value: "2018-2019",
    label: "2018-2019",
  },
  {
    value: "2019-2020",
    label: "2019-2020",
  },
  {
    value: "2020-2021",
    label: "2020-2021",
  },
  {
    value: "2021-2022",
    label: "2021-2022",
  },
  {
    value: "2022-2023",
    label: "2022-2023",
  },
  {
    value: "2023-2024",
    label: "2023-2024",
  },
  {
    value: "2024-2025",
    label: "2024-2025",
  },
  {
    value: "2025-2026",
    label: "2025-2026",
  },
  {
    value: "2026-2027",
    label: "2026-2027",
  },
  {
    value: "2027-2028",
    label: "2027-2028",
  },
  {
    value: "2028-2029",
    label: "2028-2029",
  },
  {
    value: "2029-2030",
    label: "2029-2030",
  },
];

export const registerSchemaSemesterForm = object({
  name: string().nonempty("name must is provided"),
  year: string().nonempty("year must is provided"),
});

export type IregisterInputSemesterForm = TypeOf<
  typeof registerSchemaSemesterForm
>;

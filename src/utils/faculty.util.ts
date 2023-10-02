import moment from "moment";
import { TypeOf, object, string } from "zod";
import { formatDate } from "../constants/constant";

export const headerTableFaculty = () => {
  const data = [
    {
      id: "index",
      label: "#",
      minWidth: 170,
    },
    {
      id: "name",
      label: "Name",
      minWidth: 170,
    },
    {
      id: "introduction",
      label: "Introduction",
      minWidth: 170,
    },
    {
      id: "foundYear",
      label: "Found Year",
      minWidth: 170,
    },
    {
      id: "headOfSection",
      label: "Head Of Section",
      minWidth: 170,
    },
    {
      id: "eputeHead",
      label: "Epute Head",
      minWidth: 170,
    },
    {
      id: "award",
      label: "Awards",
      minWidth: 170,
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 102,
    },
  ];
  return data;
};

export const headerTableMajor = () => {
  const data = [
    {
      id: "index",
      label: "#",
      minWidth: 170,
    },
    {
      id: "name",
      label: "Name",
      minWidth: 170,
    },
    {
      id: "introduction",
      label: "Introduction",
      minWidth: 170,
    },
    {
      id: "foundYear",
      label: "Found Year",
      minWidth: 170,
    },
    {
      id: "facukty",
      label: "Faculty",
      minWidth: 170,
    },
    {
      id: "headOfSection",
      label: "Head Of Section",
      minWidth: 170,
    },
    {
      id: "eputeHead",
      label: "Epute Head",
      minWidth: 170,
    },
    {
      id: "award",
      label: "Awards",
      minWidth: 170,
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 102,
    },
  ];
  return data;
};

export const registerSchemaFacultyForm = object({
  name: string().nonempty("name must is provided"),
  introduction: string().nullable(),
  foundYear: string()
    .nonempty("found year must is provided")
    .transform((fo) => moment(fo).format(formatDate)),
  headOfSection: string().nonempty("headOfSection must is provided"),
  eputeHead: string().nonempty("eputeHead must is provided"),
});

export type IregisterInputFacultyForm = TypeOf<
  typeof registerSchemaFacultyForm
>;

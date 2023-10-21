import { TypeOf, object, string } from "zod";

export const headerTableDegreelevel = [
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
    id: "description",
    label: "Description",
    minWidth: 120,
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 120,
  },
];

export const registerSchemaDegreelevelForm = object({
  name: string().nonempty("name is required"),
  description: string().nullable(),
});

export type IregisterInputDegreelevelForm = TypeOf<
  typeof registerSchemaDegreelevelForm
>;

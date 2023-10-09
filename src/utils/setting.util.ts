import { TypeOf, number, object, string } from "zod";

export const headerTableLearningRate = [
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
    id: "type",
    label: "Type",
    minWidth: 120,
  },
  {
    id: "minimum",
    label: "Minimum",
    minWidth: 120,
  },
  {
    id: "maximum",
    label: "Maximum",
    minWidth: 120,
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 102,
  },
];

export const headerTableSubjectPass = [
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
    id: "type",
    label: "Type",
    minWidth: 120,
  },
  {
    id: "condition",
    label: "Condition",
    minWidth: 120,
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 102,
  },
];

export const headerTableMoneyCredit = [
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
    id: "moneyPerCredit",
    label: "Money Per Credit",
    minWidth: 120,
  },
  {
    id: "semester",
    label: "Semester",
    minWidth: 120,
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 102,
  },
];

export const registerSchemaLearningRateForm = object({
  name: string().nonempty("name must is provided"),
  type: string().nonempty("type must is provided"),
  minimum: string()
    .nonempty("minimum must is provided")
    .transform((mini) => parseInt(mini))
    .pipe(number().max(10).min(0)),
  maximum: string()
    .nonempty("maximum must is provided")
    .transform((mini) => parseInt(mini))
    .pipe(number().max(10).min(0)),
});

export type IregisterInputLearningRateForm = TypeOf<
  typeof registerSchemaLearningRateForm
>;

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
    .transform((mini) => parseFloat(mini))
    .pipe(number().max(10).min(0)),
  maximum: string()
    .nonempty("maximum must is provided")
    .transform((mini) => parseFloat(mini))
    .pipe(number().max(10).min(0)),
});

export type IregisterInputLearningRateForm = TypeOf<
  typeof registerSchemaLearningRateForm
>;

export const registerSchemaSubjectPassForm = object({
  name: string().nonempty("name must is provided"),
  type: string().nonempty("type must is provided"),
  condition: string()
    .nonempty("condition must is provided")
    .transform((con) => parseFloat(con))
    .pipe(number().max(10).min(0)),
});

export type IregisterInputSubjectPassForm = TypeOf<
  typeof registerSchemaSubjectPassForm
>;

export const registerSchemaMoneyCreditForm = object({
  name: string().nonempty("name must is provided"),
  moneyPerCredit: string()
    .nonempty("moneyPerCredit must is provided")
    .transform((money) => parseInt(money))
    .pipe(number().max(100000000).min(0)),
  semester: string().nonempty("semester must is provided"),
});

export type IregisterInputMoneyCreditForm = TypeOf<
  typeof registerSchemaMoneyCreditForm
>;

export const handleSemesterOptions = (listSemesters = []) => {
  const options = listSemesters?.map(
    (semester: { _id: string; name: string; year: string }) => {
      return {
        value: semester?._id,
        label: `${semester?.name} (${semester?.year})`,
      };
    }
  );
  return options;
};

import { TypeOf, number, object, string } from "zod";

export const headerRoomTable = () => {
  const headers = [
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
      id: "type",
      label: "Type",
      minWidth: 170,
    },
    {
      id: "capacity",
      label: "Capacity",
      minWidth: 170,
    },
    {
      id: "description",
      label: "Description",
      minWidth: 170,
    },
    {
      id: "divice",
      label: "Divice",
      minWidth: 170,
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 170,
    },
  ];
  return headers;
};

export const registerSchema = object({
  name: string().nonempty("name must is provided"),
  roomType: string().nonempty("type must is provided"),
  capacity: string().transform((capa) => parseInt(capa)).pipe(number().max(500).min(0)),
  description: string().nullable(),
  airConditioner: string().nonempty("airConditioner must is provided"),
  projector: string().nonempty("projector must is provided"),
  status: string().nonempty("status must is provided"),
});

export type IregisterInput = TypeOf<typeof registerSchema>;
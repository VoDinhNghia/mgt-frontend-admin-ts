import { object, string, TypeOf } from "zod";
import { IuserInfo } from "../interfaces/login.interface";
import { Iprofile } from "../interfaces/user.interface";

export const headersUserTable = () => {
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
      id: "email",
      label: "Email",
      minWidth: 170,
    },
    {
      id: "code",
      label: "Code",
      minWidth: 170,
    },
    {
      id: "status",
      label: "Status",
      minWidth: 170,
    },
    {
      id: "role",
      label: "Role",
      minWidth: 170,
    },
    {
      id: "award",
      label: "Award",
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

export const handleDataUserTable = (listUsers = []) => {
  const data = listUsers?.map((user: IuserInfo, index: number) => {
    const profile: Iprofile = user?.profile;
    return {
      _id: user?._id,
      index: index + 1,
      name: `${profile?.lastName} ${profile?.middleName} ${profile?.firstName}`,
      email: user?.email,
      code: profile?.code,
      status: user?.status,
      role: user?.role,
      award: [],
    };
  });
  return data;
};

export const registerSchemaUserAddForm = object({
  email: string()
    .nonempty("Email must is provided")
    .email("This is not a valid email"),
  passWord: string().nonempty("password must is provided").min(6),
  role: string().nonempty("role must is provided"),
  mobile: string().nonempty("mobile must is provided"),
  gender: string().nonempty("gender must is provided"),
  firstName: string().nonempty("firstName must is provided"),
  lastName: string().nonempty("lastName must is provided"),
  middleName: string().nullable(),
});

export type IregisterInputUserAddForm = TypeOf<
  typeof registerSchemaUserAddForm
>;

export const registerSchemaUpdatePasswordForm = object({
  currentPassword: string().nonempty("currentPass must is provided"),
  newPassword: string().nonempty("newPassword must is provided").min(6),
  confirmPassword: string().nonempty("confirmPassword must is provided").min(6),
}).refine((data) => data?.newPassword === data.confirmPassword, {
  message: "confirmPassword don't match",
  path: ["confirmPassword"],
});

export type IregisterInputUpdatePassordForm = TypeOf<
  typeof registerSchemaUpdatePasswordForm
>;

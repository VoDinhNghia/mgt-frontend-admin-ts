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
    }
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

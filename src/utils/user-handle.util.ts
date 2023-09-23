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
      label: "name",
      minWidth: 170,
    },
    {
      id: "email",
      label: "email",
      minWidth: 170,
    },
    {
      id: "code",
      label: "code",
      minWidth: 170,
    },
    {
      id: "status",
      label: "status",
      minWidth: 170,
    },
    {
      id: "role",
      label: "role",
      minWidth: 170,
    },
    {
      id: "award",
      label: "award",
      minWidth: 170,
    },
    {
      id: "actions",
      label: "actions",
      minWidth: 170,
    }
  ];
  return headers;
};

export const handleDataUserTable = (listUsers = []) => {
  const data = listUsers?.map((user: IuserInfo, index: number) => {
    const profile: Iprofile = user?.profile;
    return {
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

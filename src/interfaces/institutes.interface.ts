export interface IcreateInstitutes {
  unitName?: string;
  url?: string;
  foundYear?: Date | string;
  parson?: string;
  viceParson?: string;
  contacts?: {
    office?: string;
    email?: string;
    phone?: string;
    fax?: string;
  };
  function?: [
    {
      title?: string;
      content?: string;
    },
  ];
  task?: [
    {
      title?: string;
      content?: string;
    },
  ];
  attachment?: string[];
}

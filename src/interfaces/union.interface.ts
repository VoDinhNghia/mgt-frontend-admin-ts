export interface IcreateUnions {
  url?: string;
  nameUnit?: string;
  address?: string;
  mobile?: string;
  email?: string;
  introduction?: string;
  function?: string;
}

export interface IcreateUnionMember {
  union?: string;
  user?: string;
  position?: string;
}

export interface IcreateUnionImage {
  union?: string;
  attachment?: string;
  description?: string;
}

export interface IparamsGetUnionMember {
  union?: string;
  user?: string;
}

export interface IparamsGetUnionImage {
  union?: string;
}

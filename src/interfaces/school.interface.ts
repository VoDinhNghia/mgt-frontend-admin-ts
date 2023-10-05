export interface Ischool {
  name?: string;
  schoolCode?: string;
  numberTotal?: number;
  image?: string[];
  award?: string[];
  location?: {
    province?: string;
    country?: string;
    district?: string;
    ward?: string;
    address?: string;
  };
  contactInfo?: {
    email?: string;
    fax?: string;
    mobile?: string;
  };
  policy?: [
    {
      name?: string;
      effectiveDate?: Date | string;
      content?: string;
      attachment?: string;
    },
  ];
  yearFound?: Date | string;
  generalInfo?: string;
}

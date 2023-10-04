export interface IcreateBranch {
  title?: string;
  name?: string;
  description?: string;
  website?: string;
  location?: {
    province?: string;
    district?: string;
    ward?: string;
    country?: string;
    address?: string;
  };
  contactInfo?: {
    email?: string;
    fax?: string;
    mobile?: string;
  };
}

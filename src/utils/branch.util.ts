import { TypeOf, object, string } from "zod";

export const registerSchemaBranchForm = object({
  title: string().nonempty("title must is provided"),
  name: string().nonempty("name must is provided"),
  description: string().nullable(),
  website: string().nonempty("website must is provided"),
  province: string().nonempty("province must is provided"),
  district: string().nonempty("district must is provided"),
  ward: string().nonempty("ward must is provided"),
  country: string().nonempty("country must is provided"),
  address: string().nonempty("address must is provided"),
  email: string()
    .nonempty("email must is provided")
    .email("this email not valid"),
  fax: string().nullable(),
  mobile: string().nullable(),
});

export type IregisterInputBranchForm = TypeOf<typeof registerSchemaBranchForm>;

export const handleCountryOptions = (listCountries = []) => {
  const options = listCountries.map((item: { _id: string; name: string }) => {
    return {
      value: item?._id,
      label: item?.name,
    };
  });
  return options;
};

export const handleProvinceOptions = (listProvinces = []) => {
  const options = listProvinces.map((item: { _id: string; name: string }) => {
    return {
      value: item?._id,
      label: item?.name,
    };
  });
  return options;
};

export const handleDistrictOptions = (listDistricts = []) => {
  const options = listDistricts.map((item: { _id: string; name: string }) => {
    return {
      value: item?._id,
      label: item?.name,
    };
  });
  return options;
};

export const handleWardOptions = (listWards = []) => {
  const options = listWards.map((item: { _id: string; name: string }) => {
    return {
      value: item?._id,
      label: item?.name,
    };
  });
  return options;
};

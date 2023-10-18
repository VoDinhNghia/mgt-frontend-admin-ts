export const handleOptionCommon = (listItem = []) => {
  const options = listItem?.map((item: { _id: string; name: string }) => {
    return {
      value: item?._id,
      label: item?.name,
    };
  });
  return options;
};

export const handleCourseOptions = (listCourses = []) => {
  const options = handleOptionCommon(listCourses);
  return options;
};

export const handleMajorOptions = (listMajors = []) => {
  const options = handleOptionCommon(listMajors);
  return options;
};

export const handleDegreelevelOptions = (listDegreelevels = []) => {
  const options = handleOptionCommon(listDegreelevels);
  return options;
};

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

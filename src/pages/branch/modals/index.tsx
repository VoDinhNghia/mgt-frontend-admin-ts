import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import { inputTypes, modalTypes } from "../../../constants/constant";
import { branchActions, countriesActions } from "../../../store/actions";
import { IpropModalBranch } from "../../../interfaces/branch.interface";
import {
  IregisterInputBranchForm,
  registerSchemaBranchForm,
} from "../../../utils/branch.util";
import { IstateRedux } from "../../../interfaces/common.interface";
import DialogModalCommonPage from "../../commons/dialog-mui";
import TextFieldCommon from "../../commons/textfield-input";
import SelectReactCommon from "../../commons/select-react";
import {
  handleCountryOptions,
  handleDistrictOptions,
  handleProvinceOptions,
  handleWardOptions,
} from "../../../utils/util";

const ModalBranchPage = (props: IpropModalBranch) => {
  const {
    type,
    isShowModal,
    onCloseModal,
    branchInfo = {},
    dispatch,
    fetchBranchs,
    listCountries = [],
    listDistricts = [],
    listProvinces = [],
    listWards = [],
  } = props;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    control,
  } = useForm<IregisterInputBranchForm>({
    resolver: zodResolver(registerSchemaBranchForm),
  });

  const countryOptions = handleCountryOptions(listCountries);
  const provinceOptions = handleProvinceOptions(listProvinces);
  const districtOptions = handleDistrictOptions(listDistricts);
  const wardOptions = handleWardOptions(listWards);

  const onSubmitHandlerAdd: SubmitHandler<IregisterInputBranchForm> = (
    values
  ) => {
    const {
      name,
      website,
      description,
      title,
      province,
      district,
      ward,
      country,
      address,
      email,
      fax,
      mobile,
    } = values;
    dispatch({
      type: branchActions.ADD_BRANCH,
      payload: {
        title,
        name,
        description,
        website,
        location: {
          province,
          district,
          ward,
          country,
          address,
        },
        contactInfo: [
          {
            email,
            fax,
            mobile,
          },
        ],
      },
    });
    fetchAndCloseModal();
  };

  const onSubmitHandlerUpdate: SubmitHandler<IregisterInputBranchForm> = (
    values
  ) => {
    const {
      name,
      website,
      description,
      title,
      province,
      district,
      ward,
      country,
      address,
      email,
      fax,
      mobile,
    } = values;
    dispatch({
      type: branchActions.UPDATE_BRANCH,
      id: branchInfo?._id,
      payload: {
        title,
        name,
        description,
        website,
        location: {
          province,
          district,
          ward,
          country,
          address,
        },
        contactInfo: [
          {
            email,
            fax,
            mobile,
          },
        ],
      },
    });
    fetchAndCloseModal();
  };

  const onDelete = () => {
    dispatch({
      type: branchActions.DELETE_BRANCH,
      id: branchInfo?._id,
    });
    fetchAndCloseModal();
  };

  const fetchAndCloseModal = () => {
    setTimeout(() => {
      fetchBranchs();
      onCloseModal();
    }, 100);
  };

  const fetchCountries = () => {
    dispatch({
      type: countriesActions.GET_LIST_COUNTRY,
    });
  };

  const fetchProvinces = () => {
    dispatch({
      type: countriesActions.GET_LIST_PROVINCE,
    });
  };

  const fetchDistricts = () => {
    dispatch({
      type: countriesActions.GET_LIST_DISTRICT,
    });
  };

  const fetchWards = () => {
    dispatch({
      type: countriesActions.GET_LIST_WARD,
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    fetchCountries();
    fetchDistricts();
    fetchProvinces();
    fetchWards();
    reset({
      ...branchInfo,
      province: branchInfo?.location?.province?._id,
      district: branchInfo?.location?.district?._id,
      ward: branchInfo?.location?.ward?._id,
      country: branchInfo?.location?.country?._id,
      address: branchInfo?.location?.address,
      email: branchInfo?.contactInfo?.email,
      fax: branchInfo?.contactInfo?.fax,
      mobile: branchInfo?.contactInfo?.mobile,
    });
  }, [isSubmitSuccessful, branchInfo]);

  const content = (
    <div>
      {type == modalTypes.DELETE ? (
        <p>
          Are you want to delete this <b>{branchInfo?.name}</b>?
        </p>
      ) : (
        ""
      )}
      {type === modalTypes.ADD || type === modalTypes.UPDATE ? (
        <form
          onSubmit={
            type === modalTypes.ADD
              ? handleSubmit(onSubmitHandlerAdd)
              : handleSubmit(onSubmitHandlerUpdate)
          }
        >
          <p>Name: </p>
          <TextFieldCommon
            field="name"
            defaultValue={branchInfo?.name || ""}
            errors={errors}
            register={register}
          />
          <p className="mt-2">Title: </p>
          <TextFieldCommon
            field="title"
            defaultValue={branchInfo?.title || ""}
            errors={errors}
            register={register}
          />
          <p className="mt-2">Website: </p>
          <TextFieldCommon
            field="website"
            defaultValue={branchInfo?.website || ""}
            errors={errors}
            register={register}
          />
          <p className="mt-2">Country: </p>
          <SelectReactCommon
            field="country"
            control={control}
            defaultValue={
              countryOptions?.find(
                (c) => c?.value === branchInfo?.location?.country?._id
              ) || ""
            }
            errors={errors}
            options={countryOptions}
          />
          <p className="mt-2">Province: </p>
          <SelectReactCommon
            field="province"
            control={control}
            defaultValue={
              provinceOptions?.find(
                (c) => c?.value === branchInfo?.location?.province?._id
              ) || ""
            }
            errors={errors}
            options={provinceOptions}
          />
          <p className="mt-2">District: </p>
          <SelectReactCommon
            field="district"
            control={control}
            defaultValue={
              districtOptions?.find(
                (c) => c?.value === branchInfo?.location?.district?._id
              ) || ""
            }
            errors={errors}
            options={districtOptions}
          />
          <p className="mt-2">Ward: </p>
          <SelectReactCommon
            field="ward"
            control={control}
            defaultValue={
              wardOptions?.find(
                (c) => c?.value === branchInfo?.location?.ward?._id
              ) || ""
            }
            errors={errors}
            options={wardOptions}
          />
          <p className="mt-2">Street: </p>
          <TextFieldCommon
            field="address"
            defaultValue={branchInfo?.address || ""}
            errors={errors}
            register={register}
          />
          <p className="mt-2">Email: </p>
          <TextFieldCommon
            field="email"
            defaultValue={
              branchInfo?.contactInfo?.length > 0
                ? branchInfo?.contactInfo[0]?.email
                : ""
            }
            errors={errors}
            register={register}
          />
          <p className="mt-2">Fax: </p>
          <TextFieldCommon
            field="fax"
            defaultValue={
              branchInfo?.contactInfo?.length > 0
                ? branchInfo?.contactInfo[0]?.fax
                : ""
            }
            errors={errors}
            register={register}
          />
          <p className="mt-2">Mobile: </p>
          <TextFieldCommon
            field="mobile"
            defaultValue={
              branchInfo?.contactInfo?.length > 0
                ? branchInfo?.contactInfo[0]?.mobile
                : ""
            }
            errors={errors}
            register={register}
          />
          <p className="mt-2">Description: </p>
          <TextFieldCommon
            field="description"
            type={inputTypes.TEXT_AREA}
            defaultValue={branchInfo?.description || ""}
            errors={errors}
            register={register}
          />
          <Button type="submit" variant="contained" className="mt-4 w-100">
            SAVE
          </Button>
        </form>
      ) : (
        ""
      )}
      {type === modalTypes.VIEW ? (
        <div>
          {branchInfo?.contactInfo?.map(
            (contact: { email: string; fax: string; mobile: string }) => {
              return (
                <div key={contact?.email}>
                  <p>Email: {contact?.email}</p>
                  <p>Fax: {contact?.fax}</p>
                  <p>Mobile: {contact?.mobile}</p>
                </div>
              );
            }
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );

  return (
    <DialogModalCommonPage
      type={type}
      isShowModal={isShowModal}
      onCloseModal={() => onCloseModal()}
      onDelete={() => onDelete()}
      content={content}
      nameTitle="branch"
    />
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listCountries: state.CountryReducer.listCountries,
    listProvinces: state.CountryReducer.listProvinces,
    listDistricts: state.CountryReducer.listDistricts,
    listWards: state.CountryReducer.listWards,
  };
};

export default connect(mapStateToProps)(ModalBranchPage);

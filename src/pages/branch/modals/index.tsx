import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { connect } from "react-redux";
import { Button, TextField } from "@mui/material";
import { inputTypes, modalTypes } from "../../../constants/constant";
import { branchActions, countriesActions } from "../../../store/actions";
import { IpropModalBranch } from "../../../interfaces/branch.interface";
import {
  IregisterInputBranchForm,
  handleCountryOptions,
  handleDistrictOptions,
  handleProvinceOptions,
  handleWardOptions,
  registerSchemaBranchForm,
} from "../../../utils/branch.util";
import { IstateRedux } from "../../../interfaces/common.interface";
import ModalCommonPage from "../../commons/modal-common";
import TextFieldCommon from "../../commons/textfield-input";
import SelectReactCommon from "../../commons/select-react";

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

  const deleteContent = (
    <p>
      Are you want to delete this <b>{branchInfo?.name}</b>?
    </p>
  );
  const addUpdateContent = (
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
        defaultValue={type === modalTypes.UPDATE ? branchInfo?.name : ""}
        errors={errors}
        register={register}
      />
      <p className="mt-2">Title: </p>
      <TextFieldCommon
        field="title"
        defaultValue={type === modalTypes.UPDATE ? branchInfo?.title : ""}
        errors={errors}
        register={register}
      />
      <p className="mt-2">Website: </p>
      <TextFieldCommon
        field="website"
        defaultValue={type === modalTypes.UPDATE ? branchInfo?.website : ""}
        errors={errors}
        register={register}
      />
      <p className="mt-2">Country: </p>
      <SelectReactCommon
        field="country"
        control={control}
        defaultValue={
          type === modalTypes.UPDATE
            ? countryOptions?.find(
                (c) => c?.value === branchInfo?.location?.country?._id
              )
            : ""
        }
        errors={errors}
        options={countryOptions}
      />
      <p className="mt-2">Province: </p>
      <SelectReactCommon
        field="province"
        control={control}
        defaultValue={
          type === modalTypes.UPDATE
            ? provinceOptions?.find(
                (c) => c?.value === branchInfo?.location?.province?._id
              )
            : ""
        }
        errors={errors}
        options={provinceOptions}
      />
      <p className="mt-2">District: </p>
      <SelectReactCommon
        field="district"
        control={control}
        defaultValue={
          type === modalTypes.UPDATE
            ? districtOptions?.find(
                (c) => c?.value === branchInfo?.location?.district?._id
              )
            : ""
        }
        errors={errors}
        options={districtOptions}
      />
      <p className="mt-2">Ward: </p>
      <SelectReactCommon
        field="ward"
        control={control}
        defaultValue={
          type === modalTypes.UPDATE
            ? wardOptions?.find(
                (c) => c?.value === branchInfo?.location?.ward?._id
              )
            : ""
        }
        errors={errors}
        options={wardOptions}
      />
      <p className="mt-2">Street: </p>
      <TextFieldCommon
        field="address"
        defaultValue={type === modalTypes.UPDATE ? branchInfo?.address : ""}
        errors={errors}
        register={register}
      />
      <p className="mt-2">Email: </p>
      <TextFieldCommon
        field="email"
        defaultValue={
          type === modalTypes.UPDATE
            ? branchInfo?.contactInfo?.length > 0
              ? branchInfo?.contactInfo[0]?.email
              : ""
            : ""
        }
        errors={errors}
        register={register}
      />
      <p className="mt-2">Fax: </p>
      <TextFieldCommon
        field="fax"
        defaultValue={
          type === modalTypes.UPDATE
            ? branchInfo?.contactInfo?.length > 0
              ? branchInfo?.contactInfo[0]?.fax
              : ""
            : ""
        }
        errors={errors}
        register={register}
      />
      <p className="mt-2">Mobile: </p>
      <TextField
        size="small"
        type="text"
        fullWidth={true}
        defaultValue={
          type === modalTypes.UPDATE
            ? branchInfo?.contactInfo?.length > 0
              ? branchInfo?.contactInfo[0]?.mobile
              : ""
            : ""
        }
        error={!!errors["mobile"]}
        helperText={errors["mobile"] ? errors["mobile"].message : ""}
        {...register("mobile")}
      />
      <TextFieldCommon
        field="mobile"
        defaultValue={
          type === modalTypes.UPDATE
            ? branchInfo?.contactInfo?.length > 0
              ? branchInfo?.contactInfo[0]?.mobile
              : ""
            : ""
        }
        errors={errors}
        register={register}
      />
      <p className="mt-2">Description: </p>
      <TextFieldCommon
        field="description"
        type={inputTypes.TEXT_AREA}
        defaultValue={type === modalTypes.UPDATE ? branchInfo?.description : ""}
        errors={errors}
        register={register}
      />
      <Button type="submit" variant="contained" className="mt-4 w-100">
        SAVE
      </Button>
    </form>
  );
  const viewContent = (
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
  );

  return (
    <ModalCommonPage
      type={type}
      isShowModal={isShowModal}
      onCloseModal={() => onCloseModal()}
      onDelete={() => onDelete()}
      content={
        type === modalTypes.DELETE
          ? deleteContent
          : type === modalTypes.VIEW
          ? viewContent
          : addUpdateContent
      }
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

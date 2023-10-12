import React, { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { connect } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  IconButton,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { modalTypes } from "../../../constants/constant";
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
import {
  IeventOnchangeSelect,
  IstateRedux,
} from "../../../interfaces/common.interface";
import Select from "react-select";

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

  const deleteBranch = () => {
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

  return (
    <Dialog
      open={isShowModal}
      onClose={() => onCloseModal()}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle>
        {type === modalTypes.VIEW ? "View detail location" : null}
        {type === modalTypes.UPDATE ? "Update branch" : null}
        {type === modalTypes.DELETE ? "Delete branch" : null}
        {type === modalTypes.ADD ? "Add new branch" : null}
        <IconButton className="DialogTitleClose" onClick={() => onCloseModal()}>
          X
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {type === modalTypes.VIEW ? (
          <>
            <p>Location view</p>
          </>
        ) : null}
        {type === modalTypes.ADD || type === modalTypes.UPDATE ? (
          <>
            <form
              onSubmit={
                type === modalTypes.ADD
                  ? handleSubmit(onSubmitHandlerAdd)
                  : handleSubmit(onSubmitHandlerUpdate)
              }
            >
              <p>Name: </p>
              <TextField
                size="small"
                type="text"
                fullWidth={true}
                defaultValue={
                  type === modalTypes.UPDATE ? branchInfo?.name : null
                }
                error={!!errors["name"]}
                helperText={errors["name"] ? errors["name"].message : ""}
                {...register("name")}
              />
              <p className="mt-2">Title: </p>
              <TextField
                size="small"
                type="text"
                fullWidth={true}
                defaultValue={
                  type === modalTypes.UPDATE ? branchInfo?.title : null
                }
                error={!!errors["title"]}
                helperText={errors["title"] ? errors["title"].message : ""}
                {...register("title")}
              />
              <p className="mt-2">Website: </p>
              <TextField
                size="small"
                type="text"
                fullWidth={true}
                defaultValue={
                  type === modalTypes.UPDATE ? branchInfo?.website : null
                }
                error={!!errors["website"]}
                helperText={errors["website"] ? errors["website"].message : ""}
                {...register("website")}
              />
              <p className="mt-2">Country: </p>
              <FormControl
                fullWidth={true}
                size="small"
                error={Boolean(errors["country"])}
              >
                <Controller
                  render={({ field: { onChange } }) => (
                    <Select
                      options={countryOptions}
                      onChange={(val: IeventOnchangeSelect) =>
                        onChange(val.value)
                      }
                      defaultValue={
                        type === modalTypes.UPDATE
                          ? countryOptions?.find(
                              (c) =>
                                c?.value === branchInfo?.location?.country?._id
                            )
                          : ""
                      }
                    />
                  )}
                  name="country"
                  control={control}
                />
                <FormHelperText>
                  {errors["country"] ? errors["country"].message : ""}
                </FormHelperText>
              </FormControl>
              <p className="mt-2">Province: </p>
              <FormControl
                fullWidth={true}
                size="small"
                error={Boolean(errors["province"])}
              >
                <Controller
                  render={({ field: { onChange } }) => (
                    <Select
                      options={provinceOptions}
                      onChange={(val: IeventOnchangeSelect) =>
                        onChange(val.value)
                      }
                      defaultValue={
                        type === modalTypes.UPDATE
                          ? provinceOptions?.find(
                              (c) =>
                                c?.value === branchInfo?.location?.province?._id
                            )
                          : ""
                      }
                    />
                  )}
                  name="province"
                  control={control}
                />
                <FormHelperText>
                  {errors["province"] ? errors["province"].message : ""}
                </FormHelperText>
              </FormControl>
              <p className="mt-2">District: </p>
              <FormControl
                fullWidth={true}
                size="small"
                error={Boolean(errors["district"])}
              >
                <Controller
                  render={({ field: { onChange } }) => (
                    <Select
                      options={districtOptions}
                      onChange={(val: IeventOnchangeSelect) =>
                        onChange(val.value)
                      }
                      defaultValue={
                        type === modalTypes.UPDATE
                          ? districtOptions?.find(
                              (c) =>
                                c?.value === branchInfo?.location?.district?._id
                            )
                          : ""
                      }
                    />
                  )}
                  name="district"
                  control={control}
                />
                <FormHelperText>
                  {errors["district"] ? errors["district"].message : ""}
                </FormHelperText>
              </FormControl>
              <p className="mt-2">Ward: </p>
              <FormControl
                fullWidth={true}
                size="small"
                error={Boolean(errors["ward"])}
              >
                <Controller
                  render={({ field: { onChange } }) => (
                    <Select
                      options={wardOptions}
                      onChange={(val: IeventOnchangeSelect) =>
                        onChange(val.value)
                      }
                      defaultValue={
                        type === modalTypes.UPDATE
                          ? wardOptions?.find(
                              (c) =>
                                c?.value === branchInfo?.location?.ward?._id
                            )
                          : ""
                      }
                    />
                  )}
                  name="ward"
                  control={control}
                />
                <FormHelperText>
                  {errors["ward"] ? errors["ward"].message : ""}
                </FormHelperText>
              </FormControl>
              <p className="mt-2">Street: </p>
              <TextField
                size="small"
                type="text"
                fullWidth={true}
                defaultValue={
                  type === modalTypes.UPDATE ? branchInfo?.address : null
                }
                error={!!errors["address"]}
                helperText={errors["address"] ? errors["address"].message : ""}
                {...register("address")}
              />
              <p className="mt-2">Email: </p>
              <TextField
                size="small"
                type="text"
                fullWidth={true}
                defaultValue={
                  type === modalTypes.UPDATE
                    ? branchInfo?.contactInfo[0]?.email
                    : ""
                }
                error={!!errors["email"]}
                helperText={errors["email"] ? errors["email"].message : ""}
                {...register("email")}
              />
              <p className="mt-2">Fax: </p>
              <TextField
                size="small"
                type="text"
                fullWidth={true}
                defaultValue={
                  type === modalTypes.UPDATE ? branchInfo?.contactInfo[0]?.fax : ""
                }
                error={!!errors["fax"]}
                helperText={errors["fax"] ? errors["fax"].message : ""}
                {...register("fax")}
              />
              <p className="mt-2">Mobile: </p>
              <TextField
                size="small"
                type="text"
                fullWidth={true}
                defaultValue={
                  type === modalTypes.UPDATE
                    ? branchInfo?.contactInfo[0]?.mobile
                    : ""
                }
                error={!!errors["mobile"]}
                helperText={errors["mobile"] ? errors["mobile"].message : ""}
                {...register("mobile")}
              />
              <p className="mt-2">Description: </p>
              <TextField
                size="small"
                type="textarea"
                multiline={true}
                rows={4}
                fullWidth={true}
                defaultValue={
                  type === modalTypes.UPDATE ? branchInfo?.description : ""
                }
                error={!!errors["description"]}
                helperText={
                  errors["description"] ? errors["description"].message : ""
                }
                {...register("description")}
              />
              <Button type="submit" variant="contained" className="mt-4 w-100">
                SAVE
              </Button>
            </form>
          </>
        ) : null}
        {type === modalTypes.DELETE ? (
          <span>
            Are you want to delete this <b>{branchInfo?.name}</b>?
          </span>
        ) : null}
      </DialogContent>
      <DialogActions>
        {type === modalTypes.DELETE ? (
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => deleteBranch()}
          >
            Yes
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
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

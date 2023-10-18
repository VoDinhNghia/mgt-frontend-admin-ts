import React, { useEffect } from "react";
import { IpropModalMoneyCredit } from "../../../../interfaces/setting.interface";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import { modalTypes } from "../../../../constants/constant";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IregisterInputMoneyCreditForm,
  registerSchemaMoneyCreditForm,
} from "../../../../utils/setting.util";
import { IstateRedux } from "../../../../interfaces/common.interface";
import { semesterActions, settingActions } from "../../../../store/actions";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import TextFieldCommon from "../../../commons/textfield-input";
import SelectMuiCommon from "../../../commons/select-mui";
import { handleSemesterOptions } from "../../../../utils/util";

const ModalMoneyCreditPage = (props: IpropModalMoneyCredit) => {
  const {
    type,
    isShowModal,
    onCloseModal,
    moneyCreditInfo = {},
    listSemesters = [],
    fetchMoneyCredit,
    dispatch,
  } = props;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    control,
  } = useForm<IregisterInputMoneyCreditForm>({
    resolver: zodResolver(registerSchemaMoneyCreditForm),
  });

  const semesterOptions = handleSemesterOptions(listSemesters);

  const onSubmitHandlerAdd: SubmitHandler<IregisterInputMoneyCreditForm> = (
    values
  ) => {
    const { name, moneyPerCredit, semester } = values;
    dispatch({
      type: settingActions.ADD_MONEY_CREDIT,
      payload: {
        name,
        moneyPerCredit,
        semester,
      },
    });
    fetchAndCloseModal();
  };

  const onSubmitHandlerUpdate: SubmitHandler<IregisterInputMoneyCreditForm> = (
    values
  ) => {
    const { name, moneyPerCredit, semester } = values;
    dispatch({
      type: settingActions.UPDATE_MONEY_CREDIT,
      id: moneyCreditInfo?._id,
      payload: {
        name,
        moneyPerCredit,
        semester,
      },
    });
    fetchAndCloseModal();
  };

  const onDelete = () => {
    dispatch({
      type: settingActions.UPDATE_MONEY_CREDIT,
      id: moneyCreditInfo?._id,
    });
    fetchAndCloseModal();
  };

  const fetchSemester = () => {
    dispatch({
      type: semesterActions.GET_LIST_SEMESTER,
    });
  };

  const fetchAndCloseModal = () => {
    setTimeout(() => {
      fetchMoneyCredit();
      onCloseModal();
    }, 100);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    reset({
      ...moneyCreditInfo,
      semester: moneyCreditInfo?.semester?._id,
      moneyPerCredit: moneyCreditInfo?.moneyPerCredit?.toString(),
    });
    fetchSemester();
  }, [isSubmitSuccessful, moneyCreditInfo]);

  const content = (
    <div>
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
            defaultValue={moneyCreditInfo?.name || ""}
            errors={errors}
            register={register}
          />
          <p className="mt-2">Type: </p>
          <SelectMuiCommon
            field="semester"
            options={semesterOptions}
            defaultValue={moneyCreditInfo?.semester?._id || ""}
            control={control}
            errors={errors}
            register={register}
          />
          <p className="mt-2">Money Per Credit: </p>
          <TextFieldCommon
            field="moneyPerCredit"
            defaultValue={moneyCreditInfo?.moneyPerCredit || ""}
            errors={errors}
            register={register}
          />
          <Button variant="contained" className="w-100 mt-4" type="submit">
            SAVE
          </Button>
        </form>
      ) : (
        ""
      )}
      {type === modalTypes.DELETE ? (
        <p>
          Are you want to delete this <b>{moneyCreditInfo?.name}</b>?
        </p>
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
      nameTitle="money credit"
    />
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listSemesters: state.SemesterReducer.listSemesters,
  };
};

export default connect(mapStateToProps)(ModalMoneyCreditPage);

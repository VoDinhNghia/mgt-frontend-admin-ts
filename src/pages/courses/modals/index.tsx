import React from "react";
import { connect } from "react-redux";
import { IpropModalCourse } from "../../../interfaces/course.interface";
import { modalTypes } from "../../../constants/constant";
import DialogCommonPage from "../../commons/dialog-common";

const ModalCoursePage = (props: IpropModalCourse) => {
  const { type, isShowModal, onCloseModal, courseInfo = {} } = props;

  const onDelete = () => {
    alert("Delete");
  };

  const addUpdateContent = <p>Hello</p>;

  const deleteContent = (
    <p>
      Are you want to delete this <b>{courseInfo?.name}</b>?
    </p>
  );

  return (
    <DialogCommonPage
      type={type}
      isShowModal={isShowModal}
      onCloseModal={() => onCloseModal()}
      onDelete={() => onDelete()}
      content={type === modalTypes.DELETE ? deleteContent : addUpdateContent}
      nameTitle="course"
    />
  );
};

export default connect()(ModalCoursePage);

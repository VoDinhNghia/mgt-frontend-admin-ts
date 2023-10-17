import React, { useEffect } from "react";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import { connect } from "react-redux";
import { IpropsModalSubjectPage } from "../../../../interfaces/class-subject.interface";
import { Button } from "@mui/material";
import { modalTypes } from "../../../../constants/constant";
import { semesterActions } from "../../../../store/actions";
import { IstateRedux } from "../../../../interfaces/common.interface";
import { handleSemesterOptions } from "../../../../utils/setting.util";
import { Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ProcessSubjectForm from "./process-form";
import {
  fieldsFinalExam,
  fieldsMidTermTest,
  fieldsStudentEssay,
} from "../../../../utils/class-subject.util";
import SubjectInfoForm from "./general-form";

const ModalSubjectPage = (props: IpropsModalSubjectPage) => {
  const {
    type,
    isShowModal,
    onCloseModal,
    subjectInfo = {},
    size = "xs",
    majorOptions = [],
    userOptions = [],
    degreeLevelOptions = [],
    courseOptions = [],
    dispatch,
    listSemesters = [],
  } = props;
  const {
    register,
    formState: { errors },
    control,
  } = useForm();
  const semesterOptions = handleSemesterOptions(listSemesters);

  const onDelete = () => {
    alert("on delete");
  };
  const fetchSemesters = () => {
    dispatch({
      type: semesterActions.GET_LIST_SEMESTER,
    });
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  const content = (
    <div>
      {type === modalTypes.ADD || type === modalTypes.UPDATE ? (
        <form>
          <Row>
            <Col xl={5}>
              <SubjectInfoForm 
                register={register}
                errors={errors}
                control={control}
                userOptions={userOptions}
                courseOptions={courseOptions}
                semesterOptions={semesterOptions}
                degreeLevelOptions={degreeLevelOptions}
                majorOptions={majorOptions}
              />
            </Col>
            <Col xl={7}>
              <ProcessSubjectForm
                title="Mid Term Test"
                fields={fieldsMidTermTest}
                register={register}
                errors={errors}
              />
              <ProcessSubjectForm
                title="Student Essay"
                fields={fieldsStudentEssay}
                register={register}
                errors={errors}
              />
              <ProcessSubjectForm
                title="Final Exam"
                fields={fieldsFinalExam}
                register={register}
                errors={errors}
              />
            </Col>
          </Row>
          <p className="text-center">
            <Button variant="contained" className="w-50 mt-3" type="submit">
              Save
            </Button>
          </p>
        </form>
      ) : (
        ""
      )}
      {type === modalTypes.DELETE ? (
        <p>
          Are you want to delete this <b>{subjectInfo?.name}</b>?
        </p>
      ) : (
        ""
      )}
      {type === modalTypes.VIEW ? <p>View detail subject</p> : ""}
    </div>
  );

  return (
    <DialogModalCommonPage
      type={type}
      isShowModal={isShowModal}
      onCloseModal={() => onCloseModal()}
      nameTitle="subject"
      size={size}
      onDelete={() => onDelete()}
      content={content}
    />
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listSemesters: state.SemesterReducer.listSemesters,
  };
};

export default connect(mapStateToProps)(ModalSubjectPage);

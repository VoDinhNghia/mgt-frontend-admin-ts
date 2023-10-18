import React, { useEffect } from "react";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import { connect } from "react-redux";
import { IpropsModalSubjectPage } from "../../../../interfaces/class-subject.interface";
import { Button } from "@mui/material";
import {
  modalTypes,
  processSubjectTypes,
} from "../../../../constants/constant";
import {
  classSubjectActions,
  semesterActions,
} from "../../../../store/actions";
import { IstateRedux } from "../../../../interfaces/common.interface";
import { handleSemesterOptions } from "../../../../utils/util";
import { Row, Col } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import ProcessSubjectForm from "./process-form";
import {
  IregisterInputSubjectForm,
  fieldsFinalExam,
  fieldsMidTermTest,
  fieldsStudentEssay,
  registerSchemaSubjectForm,
} from "../../../../utils/class-subject.util";
import SubjectInfoForm from "./general-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
    fetchSubjects,
  } = props;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    control,
  } = useForm<IregisterInputSubjectForm>({
    resolver: zodResolver(registerSchemaSubjectForm),
  });
  const semesterOptions = handleSemesterOptions(listSemesters);

  const handleAdd: SubmitHandler<IregisterInputSubjectForm> = (values) => {
    const payload = {
      course: values?.course,
      name: values?.name,
      degreeLevel: values?.degreeLevel,
      major: values?.major,
      lecturer: values?.lecturer,
      semester: values?.semester,
      openTime: values?.openTime,
      closeTime: values?.closeTime,
      size: values?.size,
      numberCredits: values?.numberCredits,
      learnDate: values?.learnDate,
      time: values?.time,
      startDate: values?.startDate,
      endDate: values?.endDate,
      elective: values?.elective,
      calculateCumulativePoint: values?.calculateCumulativePoint,
      midTermTest: {
        week: values?.weekMidTermTest,
        time: values?.timeMidTermTest,
        output: values?.outputMidTermTest,
        percent: values?.percentMidTermTest,
        examDate: values?.examDateMidTermTest,
      },
      studentEssay: {
        week: values?.weekStudentEssay,
        time: values?.timeStudentEssay,
        output: values?.outputStudentEssay,
        percent: values?.percentStudentEssay,
        examDate: values?.examDateStudentEssay,
      },
      finalExam: {
        week: values?.weekFinalExam,
        time: values?.timeFinalExam,
        output: values?.outputFinalExam,
        percent: values?.percentFinalExam,
        examDate: values?.examDateFinalExam,
      },
    };
    dispatch({
      type: classSubjectActions.ADD_SUBJECT,
      payload,
    });
    fetchAndCloseModal();
  };
  const handleUpdate: SubmitHandler<IregisterInputSubjectForm> = (values) => {
    const payload = {
      course: values?.course,
      name: values?.name,
      degreeLevel: values?.degreeLevel,
      major: values?.major,
      lecturer: values?.lecturer,
      semester: values?.semester,
      openTime: values?.openTime,
      closeTime: values?.closeTime,
      size: values?.size,
      numberCredits: values?.numberCredits,
      learnDate: values?.learnDate,
      time: values?.time,
      startDate: values?.startDate,
      endDate: values?.endDate,
      elective: values?.elective,
      calculateCumulativePoint: values?.calculateCumulativePoint,
      midTermTest: {
        week: values?.weekMidTermTest,
        time: values?.timeMidTermTest,
        output: values?.outputMidTermTest,
        percent: values?.percentMidTermTest,
        examDate: values?.examDateMidTermTest,
      },
      studentEssay: {
        week: values?.weekStudentEssay,
        time: values?.timeStudentEssay,
        output: values?.outputStudentEssay,
        percent: values?.percentStudentEssay,
        examDate: values?.examDateStudentEssay,
      },
      finalExam: {
        week: values?.weekFinalExam,
        time: values?.timeFinalExam,
        output: values?.outputFinalExam,
        percent: values?.percentFinalExam,
        examDate: values?.examDateFinalExam,
      },
    };
    dispatch({
      type: classSubjectActions.UPDATE_SUBJECT,
      id: subjectInfo?._id,
      payload,
    });
    fetchAndCloseModal();
  };
  const onDelete = () => {
    dispatch({
      type: classSubjectActions.DELETE_SUBJECT,
      id: subjectInfo?._id,
    });
    fetchAndCloseModal();
  };

  const fetchSemesters = () => {
    dispatch({
      type: semesterActions.GET_LIST_SEMESTER,
    });
  };

  const fetchAndCloseModal = () => {
    setTimeout(() => {
      fetchSubjects();
      onCloseModal();
    }, 100);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    fetchSemesters();
    reset({
      ...subjectInfo,
      major: subjectInfo?.major?._id,
      course: subjectInfo?.course?._id,
      degreeLevel: subjectInfo?.degreeLevel?._id,
      lecturer: subjectInfo?.lecturer?._id,
      size: subjectInfo?.size?.toString(),
      semester: subjectInfo?.semester?._id,
      numberCredits: subjectInfo?.numberCredits?.toString(),
    });
  }, [isSubmitSuccessful, subjectInfo]);

  const content = (
    <div>
      {type === modalTypes.ADD || type === modalTypes.UPDATE ? (
        <form
          onSubmit={
            type === modalTypes.ADD
              ? handleSubmit(handleAdd)
              : handleSubmit(handleUpdate)
          }
        >
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
                subjectInfo={subjectInfo}
              />
            </Col>
            <Col xl={7}>
              <ProcessSubjectForm
                title="Mid Term Test"
                fields={fieldsMidTermTest}
                register={register}
                errors={errors}
                subjectInfo={subjectInfo}
                type={processSubjectTypes.MID_TERM_TEST}
              />
              <ProcessSubjectForm
                title="Student Essay"
                fields={fieldsStudentEssay}
                register={register}
                errors={errors}
                subjectInfo={subjectInfo}
                type={processSubjectTypes.STUDENT_ESSAY}
              />
              <ProcessSubjectForm
                title="Final Exam"
                fields={fieldsFinalExam}
                register={register}
                errors={errors}
                subjectInfo={subjectInfo}
                type={processSubjectTypes.FINAL_EXAM}
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

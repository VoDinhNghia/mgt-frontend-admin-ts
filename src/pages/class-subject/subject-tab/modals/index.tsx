import React, { useEffect } from "react";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import { connect } from "react-redux";
import { IpropsModalSubjectPage } from "../../../../interfaces/class-subject.interface";
import { Button } from "@mui/material";
import { modalTypes } from "../../../../constants/constant";
import { semesterActions } from "../../../../store/actions";
import { IstateRedux } from "../../../../interfaces/common.interface";
import { handleSemesterOptions } from "../../../../utils/setting.util";

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
  const semesterOptions = handleSemesterOptions(listSemesters);
  console.log("semesterOptions", semesterOptions);
  console.log("majorOptions", majorOptions);
  console.log("degreeLevelOptions", degreeLevelOptions);
  console.log("courseOptions", courseOptions);
  console.log("userOptions", userOptions);

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
          <Button
            variant="contained"
            size="small"
            className="w-100 mt-3"
            type="submit"
          >
            Save
          </Button>
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

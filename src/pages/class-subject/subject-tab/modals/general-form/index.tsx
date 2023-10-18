import React from "react";
import { Card } from "react-bootstrap";
import { IpropSubjectInfoForm } from "../../../../../interfaces/class-subject.interface";
import TextFieldCommon from "../../../../commons/textfield-input";
import { formatDate, inputTypes } from "../../../../../constants/constant";
import SelectReactCommon from "../../../../commons/select-react";
import CheckBoxMuiCommon from "../../../../commons/checkbox-mui";
import moment from "moment";

const SubjectInfoForm = (props: IpropSubjectInfoForm) => {
  const {
    register,
    errors,
    control,
    courseOptions = [],
    userOptions = [],
    degreeLevelOptions = [],
    semesterOptions = [],
    majorOptions = [],
    subjectInfo = {},
  } = props;

  return (
    <Card>
      <Card.Header className="bg-primary text-white fs-6">
        Subject info
      </Card.Header>
      <Card.Body className="bg-light">
        <span>
          <CheckBoxMuiCommon
            field="elective"
            label="Elective"
            control={control}
            defaultValue={subjectInfo?.elective || false}
          />
          <CheckBoxMuiCommon
            field="calculateCumulative"
            label="Cumulative"
            control={control}
            defaultValue={subjectInfo?.calculateCumulative || true}
          />
        </span>
        <p>Name: </p>
        <TextFieldCommon
          field="name"
          register={register}
          errors={errors}
          defaultValue={subjectInfo?.name}
        />
        <p className="mt-2">Course: </p>
        <SelectReactCommon
          field="course"
          options={courseOptions}
          errors={errors}
          control={control}
          defaultValue={
            courseOptions?.find(
              (item) => item.value === subjectInfo?.course?._id
            ) || ""
          }
        />
        <p className="mt-2">DegreeLevel: </p>
        <SelectReactCommon
          field="degreeLevel"
          options={degreeLevelOptions}
          errors={errors}
          control={control}
          defaultValue={
            degreeLevelOptions?.find(
              (item) => item.value === subjectInfo?.degreeLevel?._id
            ) || ""
          }
        />
        <p className="mt-2">Major: </p>
        <SelectReactCommon
          field="major"
          options={majorOptions}
          errors={errors}
          control={control}
          defaultValue={
            majorOptions?.find(
              (item) => item.value === subjectInfo?.major?._id
            ) || ""
          }
        />
        <p className="mt-2">Lecturer: </p>
        <SelectReactCommon
          field="lecturer"
          options={userOptions}
          errors={errors}
          control={control}
          defaultValue={
            userOptions?.find(
              (item) => item.value === subjectInfo?.lecturer?._id
            ) || ""
          }
        />
        <p className="mt-2">Semester: </p>
        <SelectReactCommon
          field="semester"
          options={semesterOptions}
          errors={errors}
          control={control}
          defaultValue={
            semesterOptions?.find(
              (item) => item.value === subjectInfo?.semester?._id
            ) || ""
          }
        />
        <p className="mt-2">OpenTime: </p>
        <TextFieldCommon
          field="openTime"
          type={inputTypes.DATE}
          errors={errors}
          register={register}
          defaultValue={
            subjectInfo?.openTime
              ? moment(subjectInfo?.openTime).format(formatDate)
              : ""
          }
        />
        <p className="mt-2">CloseTime: </p>
        <TextFieldCommon
          field="closeTime"
          type={inputTypes.DATE}
          errors={errors}
          register={register}
          defaultValue={
            subjectInfo?.openTime
              ? moment(subjectInfo?.closeTime).format(formatDate)
              : ""
          }
        />
        <p className="mt-2">Size: </p>
        <TextFieldCommon
          field="size"
          type={inputTypes.NUMBER}
          errors={errors}
          register={register}
          defaultValue={subjectInfo?.size || ""}
        />
        <p className="mt-2">numberCredits: </p>
        <TextFieldCommon
          field="numberCredits"
          type={inputTypes.NUMBER}
          errors={errors}
          register={register}
          defaultValue={subjectInfo?.numberCredits || ""}
        />
        <p className="mt-2">learnDate: </p>
        <TextFieldCommon
          field="learnDate"
          errors={errors}
          register={register}
          defaultValue={subjectInfo?.process?.learnDate || ""}
        />
        <p className="mt-2">time: </p>
        <TextFieldCommon
          field="time"
          errors={errors}
          register={register}
          defaultValue={subjectInfo?.process?.time || ""}
        />
        <p className="mt-2">startDate: </p>
        <TextFieldCommon
          field="startDate"
          type={inputTypes.DATE}
          errors={errors}
          register={register}
          defaultValue={
            subjectInfo?.process?.startDate
              ? moment(subjectInfo?.process?.startDate).format(formatDate)
              : ""
          }
        />
        <p className="mt-2">endDate: </p>
        <TextFieldCommon
          field="endDate"
          type={inputTypes.DATE}
          errors={errors}
          register={register}
          defaultValue={
            subjectInfo?.process?.endDate
              ? moment(subjectInfo?.process?.endDate).format(formatDate)
              : ""
          }
        />
      </Card.Body>
    </Card>
  );
};

export default SubjectInfoForm;

import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { IpropProcessSubject } from "../../../../../interfaces/class-subject.interface";
import TextFieldCommon from "../../../../commons/textfield-input";
import { formatDate, inputTypes } from "../../../../../constants/constant";
import { getDefaultValue } from "../../../../../utils/setting.util";
import moment from "moment";

const ProcessSubjectForm = (props: IpropProcessSubject) => {
  const {
    title,
    errors,
    register,
    fields = {},
    type = "",
    subjectInfo = {},
  } = props;

  return (
    <Card className="mb-3">
      <Card.Header className="bg-primary text-white fs-6">{title}</Card.Header>
      <Card.Body>
        <Row>
          <Col xl={6}>
            <p>Week: </p>
            <TextFieldCommon
              field={fields?.week}
              errors={errors}
              register={register}
              defaultValue={getDefaultValue(type, subjectInfo, "week")}
            />
            <p className="mt-2">Time: </p>
            <TextFieldCommon
              field={fields.time}
              type={inputTypes.NUMBER}
              errors={errors}
              register={register}
              defaultValue={getDefaultValue(type, subjectInfo, "time")}
            />
            <p className="mt-2">Percent: </p>
            <TextFieldCommon
              field={fields.percent}
              type={inputTypes.NUMBER}
              errors={errors}
              register={register}
              defaultValue={getDefaultValue(type, subjectInfo, "percent")}
            />
            <p className="mt-2">Exam date:</p>
            <TextFieldCommon
              field={fields.examDate}
              type={inputTypes.DATE}
              errors={errors}
              register={register}
              defaultValue={
                getDefaultValue(type, subjectInfo, "examDate")
                  ? moment(
                      getDefaultValue(type, subjectInfo, "examDate")
                    ).format(formatDate)
                  : ""
              }
            />
          </Col>
          <Col xl={6}>
            <p>Output: </p>
            <TextFieldCommon
              field={fields.output}
              type={inputTypes.TEXT_AREA}
              rows={10}
              errors={errors}
              register={register}
              defaultValue={getDefaultValue(type, subjectInfo, "output")}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProcessSubjectForm;

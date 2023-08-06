import React from "react";
import Education from "../interfaces/Education";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons/faAngleUp";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import convertDate from "../utils/helpers/convertDate";

interface Props {
  data: Education;
  index: number;
  totalLength: number;
  onEditButton: (index: number) => void;
  onDeleteButton: (index: number) => void;
  onUpButton: (index: number) => void;
  onDownButton: (index: number) => void;
}

const EducationItem: React.FC<Props> = ({
  data,
  index,
  totalLength,
  onEditButton,
  onDeleteButton,
  onUpButton,
  onDownButton,
}) => {
  return (
    <>
      <Card className="bg-light mt-0" key={index}>
        <Card.Title>
          <Row>
            <Col xs={6}>{data.institutionName}</Col>
            <Col xs={6} className="d-flex justify-content-end">
              <Button
                className="btn btn-sm btn-secondary"
                onClick={() => onUpButton(index)}
                disabled={index === 0 ? true : false}
              >
                <FontAwesomeIcon icon={faAngleUp} />
              </Button>
              &nbsp;
              <Button
                className="btn btn-sm btn-secondary"
                onClick={() => onDownButton(index)}
                disabled={index === totalLength - 1 ? true : false}
              >
                <FontAwesomeIcon icon={faAngleDown} />
              </Button>
              &nbsp;
              <Button
                className="btn btn-sm"
                onClick={() => onEditButton(index)}
              >
                <FontAwesomeIcon icon={faPen} />
              </Button>
              &nbsp;
              <Button
                className="btn btn-sm btn-danger"
                onClick={() => onDeleteButton(index)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </Button>
            </Col>
          </Row>
        </Card.Title>{" "}
        <Card.Text>
          {data.degreeType} {data.major}{" "}
          {(data.gpa || data.gpa !== 0) && `(IPK: ${data.gpa})`}
        </Card.Text>
        <Card.Text>
          {convertDate(new Date(data.startDate))} s/d{" "}
          {data.stillStudyingHere
            ? "sekarang"
            : convertDate(new Date(data.endDate))}
        </Card.Text>
        <Card.Text className="text-secondary fst-italic">
          {data.description}
        </Card.Text>
      </Card>
      <br />
    </>
  );
};

export default EducationItem;

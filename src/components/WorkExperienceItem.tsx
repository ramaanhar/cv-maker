import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import WorkExperience from "../interfaces/WorkExperience";
import {
  faAngleUp,
  faPen,
  faXmark,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import convertDate from "../utils/helpers/convertDate";

interface Props {
  data: WorkExperience;
  index: number;
  totalLength: number;
  onEditButton: (index: number) => void;
  onDeleteButton: (index: number) => void;
  onUpButton: (index: number) => void;
  onDownButton: (index: number) => void;
}

const WorkExperienceItem: React.FC<Props> = ({
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
            <Col xs={6}>{data.position}</Col>
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
          {data.companyName} - {convertDate(new Date(data.workStartDate))} s/d{" "}
          {data.stillWorkingHere
            ? "sekarang"
            : convertDate(new Date(data.workEndDate))}
        </Card.Text>
        <Card.Text className="text-secondary fst-italic">
          {data.workDescription}
        </Card.Text>
      </Card>
      <br />
    </>
  );
};

export default WorkExperienceItem;

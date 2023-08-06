import React from "react";
import moment from "moment";
import { Alert, Button, Col, Row } from "react-bootstrap";
import FormData from "../interfaces/FormData";
import convertDate from "../utils/helpers/convertDate";

interface Props {
  data: FormData;
  onReset: () => void;
}

const CurriculumVitae: React.FC<Props> = ({ data, onReset }) => {
  return (
    <>
      <Alert variant="success">CV Anda sudah jadi!</Alert>
      <div className="my-5">
        <h2 className="text-center">{data.name}</h2>
        <br />
        <div>
          <hr />
          <p className="fst-italic">{data.description}</p>
          <hr />
        </div>
        <div className="my-5">
          <Row>
            <Col sm={6}>Tempat tanggal lahir</Col>
            <Col sm={6}>
              : {data.birthplace},{" "}
              {moment(new Date(data.birthdate))
                .format("DD MMMM YYYY")
                .toString()}
            </Col>
          </Row>
          <Row>
            <Col sm={6}>Alamat</Col>
            <Col sm={6}>: {data.address}</Col>
          </Row>
          <Row>
            <Col sm={6}>Nomor Telepon</Col>
            <Col sm={6}>: {data.phoneNumber}</Col>
          </Row>
          <Row>
            <Col sm={6}>Email</Col>
            <Col sm={6}>: {data.email}</Col>
          </Row>
          <Row>
            <Col sm={6}>Akun LinkedIn</Col>
            <Col sm={6}>
              :{" "}
              <a href={`https://www.linkedin.com/in/${data.linkedinId}`}>
                linkedin.com/in/{data.linkedinId}
              </a>
            </Col>
          </Row>
        </div>
        <div>
          <hr />
          <h5>Pengalaman Kerja</h5>
          <hr />
        </div>
        <div className="my-5">
          <ul>
            {data.workExperiences.length > 0 &&
              data.workExperiences.map((work, idx) => (
                <li key={idx}>
                  <p>
                    <span className="fw-bold h5">{work.companyName} </span>
                    <span className="p">
                      ({convertDate(new Date(work.workStartDate))} s/d{" "}
                      {work.stillWorkingHere === true
                        ? "sekarang"
                        : convertDate(new Date(work.workEndDate))}
                      )
                    </span>
                  </p>
                  <p>{work.position}</p>
                  <p className="fst-italic">{work.workDescription}</p>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <hr />
          <h5>Pendidikan</h5>
          <hr />
        </div>
        <div className="my-5">
          <ul>
            {data.educations.length > 0 &&
              data.educations.map((edu, idx) => (
                <li key={idx}>
                  <p>
                    <span className="fw-bold h5">{edu.institutionName} </span>
                    <span className="p">
                      ({convertDate(new Date(edu.startDate))} s/d{" "}
                      {edu.stillStudyingHere === true
                        ? "sekarang"
                        : convertDate(new Date(edu.endDate))}
                      )
                    </span>
                  </p>
                  <p>
                    {edu.degreeType} {edu.major}{" "}
                    {edu.gpa && `(IPK: ${edu.gpa} )`}
                  </p>
                  <p className="fst-italic">{edu.description}</p>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <hr />
          <h5>Pengalaman Pelatihan</h5>
          <hr />
        </div>
        <div className="my-5">
          <ul>
            {data.courseExperiences.length > 0 &&
              data.courseExperiences.map((course, idx) => (
                <li key={idx}>
                  <p>
                    <span className="fw-bold h5">{course.courseName} </span>
                    <span className="p">
                      ({convertDate(new Date(course.courseStartDate))} s/d{" "}
                      {course.stillCourseHere === true
                        ? "sekarang"
                        : convertDate(new Date(course.courseEndDate))}
                      )
                    </span>
                  </p>
                  <p>{course.coursePublisher}</p>
                  <p className="fst-italic">{course.courseDescription}</p>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <hr />
          <h5>Pengalaman Projek</h5>
          <hr />
        </div>
        <div className="my-5">
          <ul>
            {data.projectExperiences.length > 0 &&
              data.projectExperiences.map((project, idx) => (
                <li key={idx}>
                  <p>
                    <span className="fw-bold h5">{project.projectName} </span>
                    <span className="p">
                      ({convertDate(new Date(project.projectStartDate))} s/d{" "}
                      {project.stillWorkingInThisProject === true
                        ? "sekarang"
                        : convertDate(new Date(project.projectEndDate))}
                      )
                    </span>
                  </p>
                  <p>{project.projectWorker}</p>
                  <p className="fst-italic">{project.projectDescription}</p>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <hr />
          <h5>Skill</h5>
          <hr />
        </div>
        <div className="my-5">
          <ul>
            {data.skills.length > 0 &&
              data.skills.map((skl, idx) => (
                <li key={idx}>
                  <p>
                    <span className="fw-bold">{skl.skillName} </span>
                    <span className="p">{skl.rating} / 10</span>
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <Button type="button" onClick={onReset}>
        Reset & Buat Baru
      </Button>
    </>
  );
};

export default CurriculumVitae;

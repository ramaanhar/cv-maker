import React, { useState, ChangeEvent } from "react";
import CourseExperience from "../interfaces/CourseExperience";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import TextInput from "./TextInput";
import DateInput from "./DateInput";
import TextAreaInput from "./TextAreaInput";

interface Props {
  onSave: (data: CourseExperience) => void;
  onCancel: () => void;
}

const CreateCourseExperienceForm: React.FC<Props> = ({ onSave, onCancel }) => {
  const [tempCourse, setTempCourse] = useState<CourseExperience>({
    courseName: "",
    coursePublisher: "",
    courseStartDate: "",
    courseEndDate: "",
    courseDescription: "",
    stillCourseHere: false,
  });
  const [alert, setAlert] = useState<boolean>(false);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTempCourse((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  };
  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setTempCourse((currentValue) => ({
      ...currentValue,
      [name]: checked,
    }));
  };
  const handleSave = () => {
    const {
      courseName,
      coursePublisher,
      courseStartDate,
      courseEndDate,
      courseDescription,
      stillCourseHere,
    } = tempCourse;
    if (
      courseName === "" ||
      coursePublisher === "" ||
      courseStartDate === "" ||
      (courseEndDate === "" && stillCourseHere === false) ||
      courseDescription === ""
    ) {
      setAlert(true);
    } else {
      setAlert(false);
      onSave(tempCourse);
    }
  };

  return (
    <div className="my-3">
      <h3>Input Pelatihan</h3>
      <Row>
        <Col sm={6}>
          <TextInput
            title="Nama pelatihan"
            id="courseName"
            onChange={handleChange}
          />
        </Col>
        <Col sm={6}>
          <TextInput
            title="Penyelenggara pelatihan"
            id="coursePublisher"
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <DateInput
            id="courseStartDate"
            title="Tanggal masuk"
            required
            onChange={handleChange}
          />
        </Col>
        <Col sm={6}>
          <DateInput
            id="courseEndDate"
            title="Tanggal keluar"
            required={tempCourse.stillCourseHere === true ? false : true}
            disabled={tempCourse.stillCourseHere}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Form.Check // prettier-ignore
        type="switch"
        id="stillCourseHere"
        name="stillCourseHere"
        label="Saya masih menjalani pelatihan di sini"
        onChange={handleSwitchChange}
      />
      <br />
      <TextAreaInput
        id="courseDescription"
        title="Deskripsi kegiatan selama pelatihan"
        onChange={handleChange}
      />
      {alert && (
        <Alert variant="danger" className="text-center">
          Masih ada yang belum diisi.
        </Alert>
      )}
      <Row>
        <Col sm={6}>
          <div className="d-grid gap-2">
            <Button type="button" onClick={handleSave}>
              Simpan Pelatihan
            </Button>
          </div>
        </Col>
        <Col sm={6}>
          <div className="d-grid gap-2">
            <Button type="button" className="btn-secondary" onClick={onCancel}>
              Batalkan
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CreateCourseExperienceForm;

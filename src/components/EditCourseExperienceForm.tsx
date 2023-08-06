import React, { useState, ChangeEvent } from "react";
import CourseExperience from "../interfaces/CourseExperience";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import TextInput from "./TextInput";
import DateInput from "./DateInput";
import TextAreaInput from "./TextAreaInput";

interface Props {
  course: CourseExperience;
  onSave: (updatedData: CourseExperience) => void;
  onCancel: () => void;
}

const EditCourseExperienceForm: React.FC<Props> = ({
  course,
  onSave,
  onCancel,
}) => {
  const [editedCourse, setEditedCourse] = useState<CourseExperience>(course);
  const [alert, setAlert] = useState<boolean>(false)
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedCourse((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };
  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEditedCourse((currentValue) => ({
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
    } = editedCourse;
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
      onSave(editedCourse);
    }
  };

  return (
    <div className="my-3">
      <h3>Edit {editedCourse.courseName}</h3>
      <Row>
        <Col sm={6}>
          <TextInput
            title="Nama pelatihan"
            id="courseName"
            value={editedCourse.courseName}
            onChange={handleChange}
          />
        </Col>
        <Col sm={6}>
          <TextInput
            title="Penyelenggara pelatihan"
            id="coursePublisher"
            value={editedCourse.coursePublisher}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <DateInput
            id="courseStartDate"
            title="Tanggal masuk"
            value={editedCourse.courseStartDate}
            required
            onChange={handleChange}
          />
        </Col>
        <Col sm={6}>
          <DateInput
            id="courseEndDate"
            title="Tanggal keluar"
            value={editedCourse.courseEndDate}
            required={editedCourse.stillCourseHere === true ? false : true}
            disabled={editedCourse.stillCourseHere}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Form.Check // prettier-ignore
        type="switch"
        id="stillCourseHere"
        name="stillCourseHere"
        label="Saya masih menjalani pelatihan di sini"
        checked={editedCourse.stillCourseHere}
        onChange={handleSwitchChange}
      />
      <br />
      <TextAreaInput
        id="courseDescription"
        title="Deskripsi kegiatan selama pelatihan"
        value={editedCourse.courseDescription}
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

export default EditCourseExperienceForm;

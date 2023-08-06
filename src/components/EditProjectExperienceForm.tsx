import React, { useState, ChangeEvent } from "react";
import ProjectExperience from "../interfaces/ProjectExperience";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import TextInput from "./TextInput";
import DateInput from "./DateInput";
import TextAreaInput from "./TextAreaInput";

interface Props {
  project: ProjectExperience;
  onSave: (updatedData: ProjectExperience) => void;
  onCancel: () => void;
}

const EditProjectExperienceForm: React.FC<Props> = ({
  project,
  onSave,
  onCancel,
}) => {
  const [editedProject, setEditedProject] =
    useState<ProjectExperience>(project);
  const [alert, setAlert] = useState<boolean>(false);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProject((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };
  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEditedProject((currentValue) => ({
      ...currentValue,
      [name]: checked,
    }));
  };
  const handleSave = () => {
    const {
      projectName,
      projectWorker,
      projectStartDate,
      projectEndDate,
      projectDescription,
      stillWorkingInThisProject,
    } = editedProject;

    if (
      projectName === "" ||
      projectWorker === "" ||
      projectStartDate === "" ||
      (projectEndDate === "" && stillWorkingInThisProject === false) ||
      projectDescription === ""
    ) {
      setAlert(true);
    } else {
      setAlert(false);
      onSave(editedProject);
    }
  };

  return (
    <div className="my-3">
      <h3>Input Pelatihan</h3>
      <Row>
        <Col sm={6}>
          <TextInput
            title="Nama projek"
            id="projectName"
            value={editedProject.projectName}
            onChange={handleChange}
          />
        </Col>
        <Col sm={6}>
          <TextInput
            title="Perusahaan pemberi projek"
            id="projectWorker"
            value={editedProject.projectWorker}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <DateInput
            id="projectStartDate"
            title="Tanggal mulai"
            value={editedProject.projectStartDate}
            required
            onChange={handleChange}
          />
        </Col>
        <Col sm={6}>
          <DateInput
            id="projectEndDate"
            title="Tanggal selesai"
            value={editedProject.projectStartDate}
            required={
              editedProject.stillWorkingInThisProject === true ? false : true
            }
            disabled={editedProject.stillWorkingInThisProject}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Form.Check // prettier-ignore
        type="switch"
        id="stillWorkingInThisProject"
        name="stillWorkingInThisProject"
        checked={editedProject.stillWorkingInThisProject}
        label="Saya masih mengerjakan projek ini"
        onChange={handleSwitchChange}
      />
      <br />
      <TextAreaInput
        id="courseDescription"
        title="Deskripsi projek"
        value={editedProject.projectDescription}
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

export default EditProjectExperienceForm;

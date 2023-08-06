import React, { useState, ChangeEvent } from "react";
import ProjectExperience from "../interfaces/ProjectExperience";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import TextInput from "./TextInput";
import DateInput from "./DateInput";
import TextAreaInput from "./TextAreaInput";

interface Props {
  onSave: (data: ProjectExperience) => void;
  onCancel: () => void;
}

const CreateProjectExperienceForm: React.FC<Props> = ({ onSave, onCancel }) => {
  const [tempProject, setTempProject] = useState<ProjectExperience>({
    projectName: "",
    projectWorker: "",
    projectStartDate: "",
    projectEndDate: "",
    projectDescription: "",
    stillWorkingInThisProject: false,
  });
  const [alert, setAlert] = useState<boolean>(false);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTempProject((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  };
  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setTempProject((currentValue) => ({
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
    } = tempProject;
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
      onSave(tempProject);
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
            onChange={handleChange}
          />
        </Col>
        <Col sm={6}>
          <TextInput
            title="Perusahaan pemberi projek"
            id="projectWorker"
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <DateInput
            id="projectStartDate"
            title="Tanggal mulai"
            required
            onChange={handleChange}
          />
        </Col>
        <Col sm={6}>
          <DateInput
            id="projectEndDate"
            title="Tanggal selesai"
            required={
              tempProject.stillWorkingInThisProject === true ? false : true
            }
            disabled={tempProject.stillWorkingInThisProject}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Form.Check // prettier-ignore
        type="switch"
        id="stillWorkingInThisProject"
        name="stillWorkingInThisProject"
        label="Saya masih mengerjakan projek ini"
        onChange={handleSwitchChange}
      />
      <br />
      <TextAreaInput
        id="projectDescription"
        title="Deskripsi projek"
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

export default CreateProjectExperienceForm;

import React, { useState, ChangeEvent } from "react";
import WorkExperience from "../interfaces/WorkExperience";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import TextInput from "./TextInput";
import DateInput from "./DateInput";
import TextAreaInput from "./TextAreaInput";

interface Props {
  experience: WorkExperience;
  onSave: (updatedData: WorkExperience) => void;
  onCancel: () => void;
}

const EditWorkExperienceForm: React.FC<Props> = ({
  experience,
  onSave,
  onCancel,
}) => {
  const [editedExperience, setEditedExperience] =
    useState<WorkExperience>(experience);
  const [alert, setAlert] = useState<boolean>(false);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedExperience((prevExperience) => ({
      ...prevExperience,
      [name]: value,
    }));
  };
  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEditedExperience((currentValue) => ({
      ...currentValue,
      [name]: checked,
    }));
  };
  const handleSave = () => {
    if (
      editedExperience.companyName === "" ||
      editedExperience.position === "" ||
      editedExperience.workStartDate === "" ||
      (editedExperience.workEndDate === "" &&
        editedExperience.stillWorkingHere === false) ||
      editedExperience.workDescription === ""
    ) {
      setAlert(true);
    } else {
      setAlert(false);
      onSave(editedExperience);
    }
  };

  return (
    <>
      <h3>
        Edit: {editedExperience.position} {editedExperience.companyName}
      </h3>

      <TextInput
        id="companyName"
        title="Nama Perusahaan"
        value={editedExperience.companyName}
        onChange={handleChange}
      />
      <TextInput
        id="position"
        title="Jabatan"
        value={editedExperience.position}
        onChange={handleChange}
      />
      <Row>
        <Col sm={6}>
          <DateInput
            id="workStartDate"
            title="Tanggal masuk"
            required
            value={editedExperience.workStartDate}
            onChange={handleChange}
          />
        </Col>
        <Col sm={6}>
          <DateInput
            id="workEndDate"
            title="Tanggal keluar"
            value={editedExperience.workEndDate}
            required={
              editedExperience.stillWorkingHere === false ? false : true
            }
            disabled={editedExperience.stillWorkingHere}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Form.Check // prettier-ignore
        type="switch"
        id="stillWorkingHere"
        name="stillWorkingHere"
        label="Saya masih bekerja di sini"
        checked={editedExperience.stillWorkingHere}
        onChange={handleSwitchChange}
      />
      <br />
      <TextAreaInput
        id="workDescription"
        title="Deskripsi pengalaman"
        value={editedExperience.workDescription}
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
              Simpan Pengalaman Kerja
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
    </>
  );
};

export default EditWorkExperienceForm;

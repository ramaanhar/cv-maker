import React, { useState, ChangeEvent } from "react";
import TextInput from "./TextInput";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import DateInput from "./DateInput";
import TextAreaInput from "./TextAreaInput";
import WorkExperience from "../interfaces/WorkExperience";

interface Props {
  onSave: (data: WorkExperience) => void;
  onCancel: () => void;
}

const CreateWorkExperienceForm: React.FC<Props> = ({ onSave, onCancel }) => {
  const [tempWorkExperience, setTempWorkExperience] = useState<WorkExperience>({
    companyName: "",
    position: "",
    workStartDate: "",
    workEndDate: "",
    workDescription: "",
    stillWorkingHere: false,
  });
  const [alert, setAlert] = useState<boolean>(false);
  const handleWorkChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTempWorkExperience((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  };
  const handleSwitchWorkChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setTempWorkExperience((currentValue) => ({
      ...currentValue,
      [name]: checked,
    }));
  };
  const handleSave = () => {
    if (
      tempWorkExperience.companyName === "" ||
      tempWorkExperience.position === "" ||
      tempWorkExperience.workStartDate === "" ||
      (tempWorkExperience.workEndDate === "" &&
        tempWorkExperience.stillWorkingHere === false) ||
      tempWorkExperience.workDescription === ""
    ) {
      setAlert(true);
    } else {
      setAlert(false);
      onSave(tempWorkExperience);
    }
  };
  return (
    <div className="my-3">
      <h3>Input pengalaman kerja</h3>
      <TextInput
        id="companyName"
        title="Nama Perusahaan"
        onChange={handleWorkChange}
      />
      <TextInput id="position" title="Jabatan" onChange={handleWorkChange} />
      <Row>
        <Col sm={6}>
          <DateInput
            id="workStartDate"
            title="Tanggal masuk"
            required
            onChange={handleWorkChange}
          />
        </Col>
        <Col sm={6}>
          <DateInput
            id="workEndDate"
            title="Tanggal keluar"
            disabled={
              tempWorkExperience.stillWorkingHere === true ? true : false
            }
            required={tempWorkExperience.stillWorkingHere}
            onChange={handleWorkChange}
          />
        </Col>
      </Row>
      <Form.Check // prettier-ignore
        type="switch"
        id="stillWorkingHere"
        name="stillWorkingHere"
        label="Saya masih bekerja di sini"
        onChange={handleSwitchWorkChange}
      />
      <br />
      <TextAreaInput
        id="workDescription"
        title="Deskripsi pengalaman"
        onChange={handleWorkChange}
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
    </div>
  );
};

export default CreateWorkExperienceForm;

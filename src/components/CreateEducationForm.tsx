import React, { useState, ChangeEvent } from "react";
import Education from "../interfaces/Education";
import TextInput from "./TextInput";
import { Button, Col, Form, Row } from "react-bootstrap";
import DateInput from "./DateInput";
import SelectInput from "./SelectInput";
import TextAreaInput from "./TextAreaInput";
import degreeTypeOptions from "../utils/constants/degreeTypeOptions";
import NumberInput from "./NumberInput";
import { Alert } from "react-bootstrap";

interface Props {
  onSave: (data: Education) => void;
  onCancel: () => void;
}

const CreateEducationForm: React.FC<Props> = ({ onSave, onCancel }) => {
  const [tempEducation, setTempEducation] = useState<Education>({
    institutionName: "",
    degreeType: "",
    major: "",
    gpa: 0,
    startDate: "",
    endDate: "",
    description: "",
    stillStudyingHere: false,
  });
  const [alert, setAlert] = useState<boolean>(false);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTempEducation((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  };
  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setTempEducation((currentValue) => ({
      ...currentValue,
      [name]: checked,
    }));
  };
  const handleSave = () => {
    const {
      institutionName,
      major,
      degreeType,
      gpa,
      startDate,
      endDate,
      stillStudyingHere,
      description,
    } = tempEducation;
    if (
      institutionName === "" ||
      major === "" ||
      degreeType === "" ||
      (gpa === 0 && ["S1", "S2", "S3"].includes(degreeType)) ||
      startDate === "" ||
      (endDate === "" && stillStudyingHere === false) ||
      description === ""
    ) {
      setAlert(true);
    } else {
      setAlert(false);
      onSave(tempEducation);
    }
  };

  return (
    <div className="my-3">
      <h3>Input Pendidikan</h3>
      <Row>
        <Col sm={6}>
          <TextInput
            title="Nama institusi"
            id="institutionName"
            onChange={handleChange}
          />
        </Col>
        <Col sm={6}>
          <TextInput title="Jurusan" id="major" onChange={handleChange} />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <SelectInput
            title="Jenjang pendidikan"
            id="degreeType"
            options={degreeTypeOptions}
            onChange={handleChange}
          />
        </Col>
        <Col sm={6}>
          <NumberInput
            title="IPK"
            id="gpa"
            onChange={handleChange}
            inputMode="decimal"
            disabled={["SMA", "SMK"].includes(tempEducation.degreeType)}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <DateInput
            id="startDate"
            title="Tanggal masuk"
            required
            onChange={handleChange}
          />
        </Col>
        <Col sm={6}>
          <DateInput
            id="endDate"
            title="Tanggal keluar"
            required={tempEducation.stillStudyingHere === false ? true : false}
            disabled={tempEducation.stillStudyingHere}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Form.Check // prettier-ignore
        type="switch"
        id="stillStudyingHere"
        name="stillStudyingHere"
        label="Saya masih menjalani pendidikan di sini"
        onChange={handleSwitchChange}
      />
      <br />
      <TextAreaInput
        id="description"
        title="Deskripsi kegiatan selama pendidikan"
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
              Simpan Pendidikan
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

export default CreateEducationForm;

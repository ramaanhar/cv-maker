import React, { useState, ChangeEvent } from "react";
import Education from "../interfaces/Education";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import DateInput from "./DateInput";
import TextAreaInput from "./TextAreaInput";
import degreeTypeOptions from "../utils/constants/degreeTypeOptions";
import NumberInput from "./NumberInput";

interface Props {
  education: Education;
  onSave: (updatedData: Education) => void;
  onCancel: () => void;
}

const EditEducationForm: React.FC<Props> = ({
  education,
  onSave,
  onCancel,
}) => {
  const [editedEducation, setEditedEducation] = useState<Education>(education);
  const [alert, setAlert] = useState<boolean>(false);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedEducation((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };
  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEditedEducation((currentValue) => ({
      ...currentValue,
      [name]: checked,
    }));
  };
  const handleGPAChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (/^[0-4]*\.?[0-4]*$/.test(value))
      setEditedEducation((currentValue) => ({
        ...currentValue,
        [name]: value,
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
    } = editedEducation;
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
      onSave(editedEducation);
    }
  };

  return (
    <div className="my-3">
      <h3>Edit {editedEducation.institutionName}</h3>
      <Row>
        <Col sm={6}>
          <TextInput
            title="Nama institusi"
            id="institutionName"
            value={editedEducation.institutionName}
            onChange={handleChange}
          />
        </Col>
        <Col sm={6}>
          <TextInput
            title="Jurusan"
            id="major"
            onChange={handleChange}
            value={editedEducation.major}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <SelectInput
            title="Jenjang pendidikan"
            id="degreeType"
            options={degreeTypeOptions}
            selectedValue={editedEducation.institutionName}
            onChange={handleChange}
          />
        </Col>
        <Col sm={6}>
          <NumberInput
            title="IPK"
            id="gpa"
            onChange={handleGPAChange}
            value={editedEducation.gpa}
            inputMode="decimal"
            disabled={["SMA", "SMK"].includes(editedEducation.degreeType)}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <DateInput
            id="startDate"
            title="Tanggal masuk"
            value={editedEducation.startDate}
            required
            onChange={handleChange}
          />
        </Col>
        <Col sm={6}>
          <DateInput
            id="endDate"
            title="Tanggal keluar"
            value={editedEducation.endDate}
            required={
              editedEducation.stillStudyingHere === false ? false : true
            }
            disabled={editedEducation.stillStudyingHere}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Form.Check // prettier-ignore
        type="switch"
        id="stillStudyingHere"
        name="stillStudyingHere"
        label="Saya masih menjalani pendidikan di sini"
        checked={editedEducation.stillStudyingHere === true ? true : false}
        onChange={handleSwitchChange}
      />
      <br />

      <TextAreaInput
        id="description"
        title="Deskripsi kegiatan selama pendidikan"
        value={editedEducation.degreeType}
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

export default EditEducationForm;

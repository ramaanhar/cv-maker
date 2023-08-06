import React, { useState, ChangeEvent } from "react";
import Skill from "../interfaces/Skill";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import SelectInput from "./SelectInput";
import ratingOptions from "../utils/constants/ratingOptions";

interface Props {
  onSave: (data: Skill) => void;
  // onDisable: () => void;
}

const CreateSkillForm: React.FC<Props> = ({ onSave }) => {
  const [tempSkill, setTempSkill] = useState<Skill>({
    skillName: "",
    rating: "-",
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTempSkill((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(tempSkill);
  };

  return (
    <>
      <div className="d-flex align-content-stretch">
        <div className="p-2 w-75">
          <Form.Group>
            <FloatingLabel label="Nama skill">
              <Form.Control
                type="text"
                name="skillName"
                id="skillName"
                placeholder="namaSkill"
                onChange={handleChange}
              />
            </FloatingLabel>
          </Form.Group>
        </div>
        <div className="p-2">
          <SelectInput
            title="Nilai"
            id="rating"
            options={ratingOptions}
            onChange={handleChange}
          />
        </div>
        <div className="p-2">
          <Button
            type="button"
            onClick={handleSave}
            className="btn btn-lg"
            disabled={tempSkill.skillName === "" || tempSkill.rating === "-"}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateSkillForm;

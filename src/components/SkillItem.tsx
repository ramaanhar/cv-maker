import React from "react";
import { Button } from "react-bootstrap";
import Skill from "../interfaces/Skill";

interface Props {
  idx: number;
  data: Skill;
  onDelete: (index: number) => void;
}

const SkillItem: React.FC<Props> = ({ idx, data, onDelete }) => {
  return (
    <>
      {/* <Button variant="outline-primary">My Skill</Button> */}
      <Button variant="outline-primary">
        {data.skillName}
        {" ("}
        {data.rating}
        {"/10) "}
        <span
          className="text-secondary close-button"
          onClick={() => onDelete(idx)}
        >
          x
        </span>
      </Button>{" "}
    </>
  );
};

export default SkillItem;

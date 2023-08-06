import React, { ChangeEventHandler } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

interface Props {
  title: string;
  id: string;
  options: { value?: any; displayName: string }[];
  onChange: ChangeEventHandler;
  selectedValue?: any;
}

const SelectInput: React.FC<Props> = ({
  title,
  id,
  options,
  onChange,
  selectedValue,
}) => {
  return (
    <FloatingLabel label={title}>
      <Form.Select id={id} name={id} onChange={onChange}>
        {options.map(({ value, displayName }, idx) => {
          if (selectedValue && selectedValue === value) {
            return (
              <option key={idx} value={value} selected>
                {displayName}
              </option>
            );
          } else {
            return <option value={value}>{displayName}</option>;
          }
        })}
      </Form.Select>
    </FloatingLabel>
  );
};

export default SelectInput;

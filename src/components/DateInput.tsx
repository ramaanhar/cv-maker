import React, { ChangeEventHandler } from "react";

import { Form, FloatingLabel } from "react-bootstrap";

interface Props {
  title: string;
  id: string;
  onChange: ChangeEventHandler;
  value?: string;
  disabled?: boolean;
  required?: boolean;
}

const DateInput: React.FC<Props> = ({
  title,
  id,
  onChange,
  value,
  disabled,
  required,
}) => {
  return (
    <>
      <Form.Group>
        <FloatingLabel label={title}>
          <Form.Control
            type="date"
            name={id}
            id={id}
            placeholder={title}
            value={value}
            disabled={disabled}
            onChange={onChange}
            required={required}
          />
        </FloatingLabel>
      </Form.Group>
      <br />
    </>
  );
};

export default DateInput;

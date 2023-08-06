import React, { ChangeEventHandler } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

interface Props {
  title: string;
  id: string;
  hint?: string;
  value?: string | number;
  onChange: ChangeEventHandler;
  disabled?: boolean;
  inputMode?:
    | "search"
    | "text"
    | "none"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | undefined;
}

const NumberInput: React.FC<Props> = ({
  title,
  id,
  hint,
  value,
  onChange,
  inputMode,
  disabled,
}) => {
  return (
    <>
      <Form.Group>
        <FloatingLabel label={title}>
          <Form.Control
            type="number"
            name={id}
            id={id}
            placeholder={title}
            value={value}
            onChange={onChange}
            required
            inputMode={inputMode}
            disabled={disabled}
          />
        </FloatingLabel>
        {hint && <Form.Text muted>{hint}</Form.Text>}
      </Form.Group>
      <br />
    </>
  );
};

export default NumberInput;

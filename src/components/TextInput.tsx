import React, { ChangeEventHandler } from "react";

import { Form, FloatingLabel } from "react-bootstrap";

interface Props {
  title: string;
  id: string;
  hint?: string;
  value?: string | number;
  pattern?: string;
  notRequired?: boolean;
  onChange: ChangeEventHandler;
}

const TextInput: React.FC<Props> = ({
  title,
  id,
  hint,
  value,
  onChange,
  pattern,
  notRequired,
}) => {
  return (
    <>
      <Form.Group>
        <FloatingLabel label={title}>
          <Form.Control
            type="text"
            name={id}
            id={id}
            placeholder={title}
            value={value}
            onChange={onChange}
            pattern={pattern}
            required={notRequired ? false : true}
          />
        </FloatingLabel>
        {hint && <Form.Text muted>{hint}</Form.Text>}
      </Form.Group>
      <br />
    </>
  );
};

export default TextInput;

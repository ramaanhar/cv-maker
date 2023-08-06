import React, { ChangeEventHandler } from "react";

import { Form, FloatingLabel } from "react-bootstrap";

interface Props {
  title: string;
  id: string;
  onChange: ChangeEventHandler;
  value?: string;
}

const TextAreaInput: React.FC<Props> = ({ title, id, onChange, value }) => {
  return (
    <>
      <Form.Group>
        <FloatingLabel label={title}>
          <Form.Control
            as="textarea"
            style={{ height: "100px" }}
            name={id}
            id={id}
            placeholder={title}
            value={value}
            onChange={onChange}
            required
          />
        </FloatingLabel>
      </Form.Group>
      <br />
    </>
  );
};

export default TextAreaInput;

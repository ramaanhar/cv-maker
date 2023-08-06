import React, { ChangeEventHandler } from "react";

import { Form, FloatingLabel } from "react-bootstrap";

interface Props {
  onChange: ChangeEventHandler;
}

const EmailInput: React.FC<Props> = ({ onChange }) => {
  return (
    <>
      <Form.Group>
        <FloatingLabel label="Email">
          <Form.Control
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={onChange}
            required
          />
        </FloatingLabel>
      </Form.Group>
      <br />
    </>
  );
};

export default EmailInput;

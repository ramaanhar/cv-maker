import React, { ChangeEventHandler } from "react";

import { Form, FloatingLabel } from "react-bootstrap";

interface Props {
  onChange: ChangeEventHandler;
}

const PhoneNumberInput: React.FC<Props> = ({ onChange }) => {
  return (
    <>
      <Form.Group>
        <FloatingLabel label="Nomor HP">
          <Form.Control
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Nomor HP"
            onChange={onChange}
            pattern="[\d+]+"
            required
          />
          <Form.Text muted>
            Contoh: +628123456789 (hanya angka dan tanda +), 08123456789 (hanya
            angka)
          </Form.Text>
        </FloatingLabel>
      </Form.Group>
      <br />
    </>
  );
};

export default PhoneNumberInput;

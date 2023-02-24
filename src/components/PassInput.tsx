import React, { FC, useState } from "react";
import { Form, Input } from "antd-mobile";
import { reg } from "./../utils/validate";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
const PassInput: FC<any> = ({
  name,
  label,
  help,
  rules,
  dependencies,
  placeholder,
  onChange,
  disabled,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <Form.Item
      dependencies={dependencies}
      name={name}
      label={label}
      help={help}
      rules={rules}
      hasFeedback
      extra={
        <div>
          {!visible ? (
            <EyeInvisibleOutline onClick={() => setVisible(true)} />
          ) : (
            <EyeOutline onClick={() => setVisible(false)} />
          )}
        </div>
      }
    >
      <Input
        disabled={disabled}
        clearable
        type={visible ? "text" : "password"}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Form.Item>
  );
};

PassInput.defaultProps = {};

export default PassInput;

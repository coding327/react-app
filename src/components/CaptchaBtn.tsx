import React, { FC, useEffect, useState } from "react";
import { Form, Input, Button } from "antd-mobile";
import { reg } from "@/utils/validate";
import { useCountDown } from "ahooks";
import { Ajax } from "@/api/api";
import { ShowToast } from "@/utils/message";
const CaptchaBtn: FC<any> = ({
  label = "验证号码",
  name = "captcha",
  phone,
}) => {
  const { code } = reg;
  const [targetDate, setTargetDate] = useState<number>();
  const total = 60;
  const [flag, setFlag] = useState<boolean>(true);

  // useInterval
  const [countdown] = useCountDown({
    targetDate: targetDate,
    onEnd() {
      setFlag(true);
    },
    interval: 1000,
  });

  const todoSentCaptcha = async () => {
    let res1: any = await Ajax.sentCaptcha({
      phone,
    });
    if (res1.data) {
      ShowToast("验证码发送成功");
      setFlag(false);
      setTargetDate(Date.now() + 1000 * total);
    }
  };

  useEffect(() => {
    console.log("phone === " + phone);
  }, [phone]);
  return (
    <Form.Item
      label={label}
      name={name}
      help="长度为4的数字"
      rules={[
        { required: true, message: "验证码不能为空" },
        { pattern: code, message: "请输入格式正确的验证码" },
      ]}
      hasFeedback
      extra={
        <div>
          {flag ? (
            <Button
              color="success"
              disabled={!reg.phone.test(phone)}
              size="large"
              onClick={todoSentCaptcha}
            >
              发送验证码
            </Button>
          ) : (
            <Button disabled={true} size="large">
              剩余{Math.round(countdown / 1000)}S
            </Button>
          )}
        </div>
      }
    >
      <Input placeholder="请输入" clearable />
    </Form.Item>
  );
};

export default CaptchaBtn;

import React, { FC, useEffect, useRef, useState } from "react";
import Back from "@/components/Back";
import MyHead from "@/components/MyHead";
import { Form, Input, Button, Space } from "antd-mobile";
import { reg } from "@/utils/validate";
import { ShowToast } from "@/utils/message";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import PassInput from "@/components/PassInput";
import { Ajax } from "@/api/api";
import { useCountDown } from "ahooks";
import { history, Link } from "umi";
import qs from "qs";

const FindPass: FC = () => {
  const { phone, pwd, code } = reg;
  const [visible, setVisible] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [flag, setFlag] = useState<boolean>(true);

  const [form] = Form.useForm();
  const formRef: any = useRef();
  useEffect(() => {
    console.log(form);
    console.log(formRef.current);
  }, []);

  const resetForm = () => {
    form.resetFields();
  };

  const onFinish = async (value: any) => {
    console.log(value);
    let res: any = await Ajax.findpwd({
      phone: value.phone,
      captcha: value.captcha,
      password: value.password
    });

    if (res.code === 200) {
      // 修改成功
      delete value["captcha"];
      history.push("/login?" + qs.stringify(value));
      ShowToast("密码修改成功");
    } else {
      ShowToast("密码修改失败");
    }
  };

  const onFinishFailed = () => {
    ShowToast("表单数据格式校验失败");
  };

  const [targetDate, setTargetDate] = useState<number>();
  const total = 60;
  const [countdown] = useCountDown({
    targetDate: targetDate,
    onEnd() {
      setFlag(true);
    },
    interval: 1000,
  });

  const todoSentCaptcha = async () => {
    let res: any = await Ajax.sendcaptcha({
      phone: form.getFieldValue("phone"),
    });
    if (res.code === 200) {
      ShowToast("验证码发送成功");
      setFlag(false);
      setTargetDate(Date.now() + 1000 * total);
    }
  };

  return (
    <div>
      <MyHead title="找回密码">
        <Back></Back>
      </MyHead>

      <Form
        layout="horizontal"
        form={form}
        ref={formRef}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ padding: 15 }}
        footer={
          <div>
            <Space block justify="around">
              <Button
                style={{ width: "4rem" }}
                type="submit"
                color="primary"
                size="large"
              >
                立即修改
              </Button>
              <Button
                style={{ width: "4rem" }}
                onClick={resetForm}
                color="danger"
                size="large"
              >
                重置
              </Button>
            </Space>
          </div>
        }
      >
        <Form.Item
          name="phone"
          label="手机号码"
          rules={[
            { required: true, message: "手机号码不能为空" },
            { pattern: phone, message: "请输入格式正确的手机号码" },
          ]}
          hasFeedback
        >
          <Input
            onChange={(value: any) => {
              setDisabled(phone.test(value));
            }}
            placeholder="请输入手机号码"
          />
        </Form.Item>
        <Form.Item
          label="验证号码"
          name="captcha"
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
                  disabled={!disabled}
                  size="small"
                  onClick={todoSentCaptcha}
                >
                  发送验证码
                </Button>
              ) : (
                <Button disabled={true} size="small">
                  剩余{Math.round(countdown / 1000)}S
                </Button>
              )}
            </div>
          }
        >
          <Input placeholder="请输入验证号码" clearable />
        </Form.Item>

        <PassInput
          name="password"
          label="新密码"
          help="6-16位的数字和字母组合"
          placeholder="请输入新密码"
          rules={[
            { required: true, message: "登录密码不能为空" },
            { pattern: pwd, message: "请输入格式正确的密码" },
          ]}
        />
        <Form.Item>
          <div className="links">
            <Link to="/reg" className="color2">
              立即注册
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FindPass;

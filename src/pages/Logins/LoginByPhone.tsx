import React, { FC, useEffect, useRef, useState } from "react";
import { Form, Input, Button, Space } from "antd-mobile";
import { ShowToast } from "@/utils/message";
import { Link, useSearchParams } from "umi";
import { reg } from "@/utils/validate";
import CaptchaBtn from "@/components/CaptchaBtn";
import { useLocalStorageState } from "ahooks";

const LoginByPhone: FC = () => {
  const [form] = Form.useForm();
  const formRef: any = useRef();
  const onFinish = (value: any) => {};
  const [phone, setPhone] = useState<any>("");
  const [query] = useSearchParams();
  const [appPhone, setAppPhone] = useLocalStorageState<
    string | undefined | any
  >(
    "appPhone" // key
  );

  // 设置自动填入手机号
  useEffect(() => {
    // 地址栏有就用地址栏的，没有就用本地的
    form.setFieldValue(
      "phone",
      query.get("phone") ? query.get("phone") : appPhone
    );
  }, []);
  return (
    <Form
      layout="horizontal"
      form={form}
      ref={formRef}
      onFinish={onFinish}
      onFinishFailed={() => ShowToast("校验失败")}
      footer={
        <div>
          <Space block justify="around">
            <Button
              style={{ width: "4rem" }}
              type="submit"
              color="primary"
              size="large"
            >
              提交
            </Button>

            <Button
              style={{ width: "4rem" }}
              type="reset"
              color="danger"
              size="large"
            >
              重置
            </Button>
          </Space>
        </div>
      }
    >
      <Form.Header>欢迎使用验证码登录</Form.Header>

      <Form.Item
        name="phone"
        label="手机号码"
        rules={[
          { required: true, message: "手机号码不能为空" },
          { pattern: reg.phone, message: "请输入格式正确的手机号码" },
        ]}
        hasFeedback
      >
        <Input onChange={setPhone} placeholder="请输入" clearable />
      </Form.Item>

      <CaptchaBtn
        // phone={form.getFieldValue('phone')}
        phone={phone}
      />

      <Form.Item>
        <div className="links">
          <Link to="/reg" className="color1">
            注册
          </Link>
          <Link to="/findpass" className="color2">
            找回密码
          </Link>
        </div>
      </Form.Item>
    </Form>
  );
};

export default LoginByPhone;

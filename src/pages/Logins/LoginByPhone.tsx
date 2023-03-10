import React, { FC, useEffect, useRef, useState } from "react";
import { Form, Input, Button, Space } from "antd-mobile";
import { ShowToast } from "@/utils/message";
import { history, Link, useSearchParams } from "umi";
import { reg } from "@/utils/validate";
import CaptchaBtn from "@/components/CaptchaBtn";
import { useLocalStorageState } from "ahooks";
import { Ajax } from '@/api/api'

const LoginByPhone: FC = () => {
  const [form] = Form.useForm();
  const formRef: any = useRef();
  // 使用umi提供的获取参数的hook，useSearchParams
  const [query] = useSearchParams();

  const [phone, setPhone] = useState<any>("");
  // 使用ahooks中的本地缓存
  const [appName, setAppName] = useLocalStorageState<string | undefined | any>(
    "appName"
  );
  const [appToken, setAppToken] = useLocalStorageState<
    string | undefined | any
  >("appToken");
  const [appPhone, setAppPhone] = useLocalStorageState<
    string | undefined | any
  >("appPhone");

  const onFinish = async (value: any) => {
    let res: any = await Ajax.finduser({
      phone: value.phone
    })
    if (res.result) {
      let res1: any = await Ajax.verifyCaptcha(value)
      if (res1.data) {
        // 验证token
        let res2: any = await Ajax.gettoken({
          username: res.result.name,
          phone: res.result.phone,
          password: res.result.password
        })
        if (res2.code === 200) {
          setAppName(res.result.username)
          setAppToken(res2.token)
          setAppPhone(res.result.phone)
          history.push('/app/mine')
        }
      }
    } else {
      ShowToast('手机号未注册，请先注册')
      history.push('/reg')
    }
  };

  // 设置自动填入手机号
  useEffect(() => {
    setPhone(query.get('phone') ? query.get('phone') : appPhone)
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
          <Link to="/reg" className="color2">
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

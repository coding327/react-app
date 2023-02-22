import React, { FC, memo, useEffect, useRef, useState } from "react";
import MyHead from "@/components/MyHead";
import Back from "@/components/Back";
import {
  Form,
  Input,
  Button,
  Dialog,
  TextArea,
  DatePicker,
  Selector,
  Slider,
  Stepper,
  Switch,
  Space,
} from "antd-mobile";
import { reg } from "@/utils/validate";
import { ShowToast } from "@/utils/message";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import PassInput from "@/components/PassInput";
import { Ajax } from "@/api/api";
import { useCountDown } from "ahooks";
import { history, Link } from "umi";
import qs from "qs"; // Node 自带模块

// memo 减少不必要的渲染刷新
const Reg: FC = memo(() => {
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
    // 先校验验证码
    // 验证码校验成功才能注册
    let res: any = await Ajax.verifyCaptcha({
      phone: value.phone,
      captcha: value.captcha,
    });

    if (res.data) {
      // 注册
      delete value["captcha"];
      let res2: any = await Ajax.register(value);
      if (res2.code == 200) {
        history.push("/login?" + qs.stringify(value));
      } else {
        ShowToast("注册失败,请重新再试");
      }
    } else {
      ShowToast("验证码校验失败");
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
    let res: any = await Ajax.finduser({
      phone: form.getFieldValue("phone"),
    });
    if (res.result) {
      ShowToast("手机号已经被注册,请重试");
    } else {
      let res1: any = await Ajax.sentCaptcha({
        phone: form.getFieldValue("phone"),
      });
      if (res1.data) {
        ShowToast("验证码发送成功");
        setFlag(false);
        setTargetDate(Date.now() + 1000 * total);
      }
    }
  };

  // 失败
  useEffect(() => {
    console.log(form.getFieldValue("phone"));
  }, [form]);
  return (
    <div className="reg">
      <MyHead title="注册账号">
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
                注册
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
        <Form.Header>欢迎注册周末游App账号</Form.Header>
        <Form.Item
          name="username"
          label="用户名称"
          rules={[{ required: true, message: "用户名称不能为空" }]}
          hasFeedback
        >
          <Input placeholder="请输入用户名称" />
        </Form.Item>
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
          label="登录密码"
          help="6-16位的数字和字母组合"
          placeholder="请输入登录密码"
          rules={[
            { required: true, message: "登录密码不能为空" },
            { pattern: pwd, message: "请输入格式正确的密码" },
          ]}
        />

        <PassInput
          name="dbpass"
          label="确认密码"
          help="6-16位的数字和字母组合"
          placeholder="请输入确认密码"
          rules={[
            { required: true, message: "" },
            ({ getFieldValue }: any) => ({
              validator(_: any, value: any) {
                if (value && pwd.test(value)) {
                  if (getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次密码不匹配!"));
                } else {
                  return Promise.reject(new Error("请输入格式正确的密码!"));
                }
              },
            }),
          ]}
          dependencies={["password"]}
        ></PassInput>
        <Form.Item>
          <div className="links">
            <Link to="/login" className="color1">
              登录
            </Link>
            <Link to="/findpass" className="color2">
              找回密码
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
});

export default Reg;

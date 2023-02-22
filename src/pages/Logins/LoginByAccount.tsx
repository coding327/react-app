import React, { useEffect, useRef } from "react";
import { Form, Input, Button, Space } from "antd-mobile";
import { ShowToast } from "@/utils/message";
import PassInput from "@/components/PassInput";
import { reg } from "@/utils/validate";
import { history, Link, useSearchParams } from "umi";
import { Ajax } from "@/api/api";
import { useLocalStorageState, useSessionStorageState } from "ahooks";

const LoginByAccount = () => {
  const [form] = Form.useForm();
  const formRef: any = useRef();
  const { pwd } = reg;
  const [appName, setAppName] = useLocalStorageState<string | undefined | any>(
    "appName" // key
  );
  const [appToken, setAppToken] = useSessionStorageState<
    string | undefined | any
  >(
    "appToken" // key
  );
  const [appPhone, setAppPhone] = useLocalStorageState<
    string | undefined | any
  >(
    "appPhone" // key
  );

  const [query] = useSearchParams(); // 获取 query 参数

  const onFinish = async (value: any) => {
    let res: any = await Ajax.login(value);
    if (res.code == 200) {
      history.push("/app/mine");
      setAppName(value.username);
      setAppToken(res.token);
      setAppPhone(res.result.phone);
    }
  };
  const resetForm = () => {
    form.resetFields();
  };

  useEffect(() => {
    console.log(query.get("username"));

    form.setFieldValue(
      "username",
      query.get("username") ? query.get("username") : appName
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
              size="large"
              style={{ width: "4rem" }}
              type="submit"
              color="primary"
            >
              登录
            </Button>
            <Button
              size="large"
              style={{ width: "4rem" }}
              onClick={resetForm}
              color="danger"
            >
              重置
            </Button>
          </Space>
        </div>
      }
    >
      <Form.Header>欢迎密码登录</Form.Header>
      <Form.Item
        name="username"
        label="用户名称"
        rules={[{ required: true, message: "用户名称不能为空" }]}
        hasFeedback
      >
        <Input placeholder="请输入用户名称" />
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

export default LoginByAccount;

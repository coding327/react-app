import React from "react";
import { Form, Input, Button } from "antd-mobile";
import { useValidate } from "@/hooks/date/useValidate";
import { Ajax } from "@/api/api";
import { history } from "umi";

import "./login.less";

const Reg = () => {
  const onFinish = async (value: any) => {
    // console.log(value);
    let res: any = await Ajax.todoLogin(value);
    if (res?.code === 200) {
      console.log("登录成功");
      sessionStorage.setItem("account", value.account);
      sessionStorage.setItem("token", res.token);
      history.push("/app");
    }
  };

  const checkPassword = (_: any, value: any) => {
    if (value.realValue) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("手机号不能为空!"));
  };

  const { pwd, phone } = useValidate();

  return (
    <div className="reg-box lgbox">
      <div className="login-box">
        <h2 className="title">学员成绩管理系统</h2>
        <Form
          layout="vertical"
          footer={
            <>
              <Button
                block
                type="submit"
                color="primary"
                style={{ marginBottom: 10 }}
              >
                注册
              </Button>
              <Button block type="reset" color="primary">
                重置
              </Button>
            </>
          }
          onFinish={onFinish}
        >
          <Form.Item
            label="账号"
            name="account"
            rules={[{ required: true, message: "请输入账号!" }]}
          >
            <Input placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              { required: true, message: "请输入手机号!" },
              {
                pattern: phone,
                message: "请输入正确格式的手机号!",
              },
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            label="登录密码"
            name="password"
            rules={[
              { required: true, message: "请输入密码!" },
              {
                pattern: pwd,
                message: "请输入正确的登录密码(6-16的数字+字母)",
              },
            ]}
          >
            <Input placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="password"
            rules={[
              { required: true, message: "请输入密码!" },
              {
                validator: checkPassword,
              },
            ]}
          >
            <Input placeholder="请输入密码" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Reg;

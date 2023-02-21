import React from "react";
import { Form, Input, Button } from "antd-mobile";
import { useValidate } from "@/hooks/date/useValidate";
import { Ajax } from "@/api/api";
import { history } from "umi";

import "./login.less";

const Login = () => {
  const onFinish = async (value: any) => {
    // console.log(value);
    let res: any = await Ajax.todoLogin(value)
    if (res?.code === 200) {
      console.log('登录成功')
      sessionStorage.setItem('account', value.account)
      sessionStorage.setItem('token', res.token)
      history.push('/app')
    }
  };

  const { pwd } = useValidate();

  return (
    <div className="reg-box lgbox">
      <div className="login-box">
        <h2 className="title">学员成绩管理系统</h2>
        <Form
          layout="vertical"
          footer={
            <>
              <Button block type="submit" color="primary" style={{marginBottom: 10}}>
                提交
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
            label="密码"
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
        </Form>
      </div>
    </div>
  );
};

export default Login;

import MyHead from "@/components/MyHead";
import React from "react";
import { LeftOutline } from "antd-mobile-icons";
import { history } from "umi";
import { Tabs } from "antd-mobile";
import LoginByAccount from "./LoginByAccount";
import LoginByPhone from "./LoginByPhone";
const Login = () => {
  return (
    <div className="login">
      <MyHead title="登录">
        <div>
          <LeftOutline
            onClick={() => history.go(-1)}
            style={{ color: "#000", fontSize: "0.6rem" }}
          />
        </div>
      </MyHead>

      <div style={{ padding: 15 }}>
        <Tabs>
          <Tabs.Tab title="密码登录" key="username">
            <LoginByAccount />
          </Tabs.Tab>
          <Tabs.Tab title="手机登录" key="phone">
            <LoginByPhone />
          </Tabs.Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;

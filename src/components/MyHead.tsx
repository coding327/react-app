import React, { FC } from "react";
import { NavBar, Space, Toast, Popover, Grid } from "antd-mobile";
import {
  SearchOutline,
  MoreOutline,
  CloseOutline,
  LeftOutline,
  AppstoreOutline,
  UserOutline,
  PictureOutline,
  ScanningOutline,
  BillOutline,
} from "antd-mobile-icons";
import { history, useLocation } from "umi";

const MyHead: FC<{
  title?: String;
  children?: any;
  back?: Boolean;
}> = ({ title, children, back }) => {
  const { pathname } = useLocation();
  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ "--gap": "16px" }}>
        {pathname != "/search" && (
          <SearchOutline onClick={() => history.push("/search")} />
        )}

        <Popover
          content={
            <Grid columns={1} gap={8}>
              {pathname != "/login" && (
                <Grid.Item onClick={() => history.push("/login")}>
                  <div style={{ marginTop: 5, padding: 6 }}>
                    登录 <AppstoreOutline />
                  </div>
                </Grid.Item>
              )}
              {pathname != "/app/mine" && (
                <Grid.Item onClick={() => history.push("/app/mine")}>
                  <div style={{ marginTop: 5, padding: 6 }}>
                    我的 <UserOutline />
                  </div>
                </Grid.Item>
              )}
              <Grid.Item>
                <div style={{ marginTop: 5, padding: 6 }}>
                  拍照 <PictureOutline />
                </div>
              </Grid.Item>
              <Grid.Item>
                <div style={{ marginTop: 5, padding: 6 }}>
                  扫码 <ScanningOutline />
                </div>
              </Grid.Item>
              <Grid.Item>
                <div style={{ marginTop: 5, padding: 6 }}>
                  支付 <BillOutline />
                </div>
              </Grid.Item>
            </Grid>
          }
          placement="bottom-start"
          mode="dark"
          trigger="click"
        >
          <MoreOutline />
        </Popover>
      </Space>
    </div>
  );

  const goback = () => {
    history.go(-1);
  };

  const left = (
    // 判断是否插槽，如果有插槽就显示插槽内容，没有再判断是否显示默认返回按钮和返回文本
    <div>
      {children
        ? children
        : !back && (
            <span onClick={goback}>
              <LeftOutline />
              返回
            </span>
          )}
    </div>
  );

  return (
    <NavBar
      style={{
        "--border-bottom": "1px solid #ddd",
        width: '100%',
        position: 'fixed',
        zIndex: 100,
        background: '#fff',
        left: 0,
        top: 0
      }}
      right={right}
      left={left}
      backArrow={false}
    >
      {title}
    </NavBar>
  );
};

MyHead.defaultProps = {
  title: "",
  back: false, // false有返回 true没有返回
};

export default MyHead;

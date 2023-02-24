import React, { FC } from "react";
import { Badge, TabBar } from "antd-mobile";
import { FootList } from "./MyFoot";
import { history, useLocation } from "umi";

const AntFoot: FC = () => {
  const location = useLocation();
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        bottom: 0,
        left: 0,
        borderTop: "1px solid #ddd",
        background: '#fff'
      }}
    >
      <TabBar
        onChange={(key: any) => history.push(key)}
        defaultActiveKey={location.pathname}
      >
        {FootList.map((item) => (
          <TabBar.Item
            key={item.path}
            icon={item.component}
            title={item.text}
            badge={item.hot ? 1 : null}
          />
        ))}
      </TabBar>
    </div>
  );
};

export default AntFoot;

import React, { FC } from "react";
import "@/styles/foot.scss";
import { NavLink, useLocation, useParams, useSearchParams } from "umi";
import { Badge } from "antd-mobile";
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";

export const FootList = [
  {
    path: "/app/home",
    component: <AppOutline />,
    icon: "icon-home2",
    text: "首页",
  },
  {
    path: "/app/classify",
    component: <UnorderedListOutline />,
    icon: "icon-gengduo",
    text: "分类",
  },
  {
    path: "/app/find",
    component: <MessageOutline />,
    icon: "icon-zixun1",
    text: "发现",
    hot: true,
  },
  {
    path: "/app/mine",
    component: <UserOutline />,
    icon: "icon-mine",
    text: "我的",
  },
];

const MyFoot: FC = () => {
  const location = useLocation();
  // useParams params
  // useSearchParams query

  return (
    <footer>
      {FootList.map((item, index) => {
        return (
          <div key={index}>
            <NavLink to={item.path}>
              <i className={"iconfont" + item.icon}></i>
              <span>{item.text}</span>
              {item.hot && (
                <Badge
                  color={location.pathname == item.path ? "#f50" : "#999"}
                  content="1"
                  className="hot"
                />
              )}
            </NavLink>
          </div>
        );
      })}
    </footer>
  );
};

export default MyFoot;

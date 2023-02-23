import React, { FC, useEffect } from "react";
import MyHead from "@/components/MyHead";
import { connect } from "react-redux";
import { getuserinfoasync, setuserinfo } from "@/redux/actions";
import BG from "@/assets/images/mine.gif";
import { Avatar, Button } from "antd-mobile";
import { history } from "umi";
import UploadFile from "@/components/UploadFile";
import { Ajax } from "@/api/api";
import { baseURL } from "@/api/request";
import { defaultAvatar } from "@/utils/common";
import "./app.scss";

const Mine: FC<any> = ({ userInfo, dispatch }) => {
  useEffect(() => {
    dispatch(getuserinfoasync());
  }, []);

  const getAvatarPath = async (path: string) => {
    // 拿到用户头像图片路径，后端用户信息改
    let res: any = await Ajax.changeuserinfo({ avatar: path });
    if (res.code === 200) {
      // 后端改成功，前端改
      dispatch(
        setuserinfo({
          ...userInfo,
          avatar: path,
        })
      );
    }
  };

  return (
    <div className="mine">
      {/* 头部 */}
      <MyHead title="我的" back={true}></MyHead>

      {/* 内容区 */}
      <div className="mine-top">
        <img className="top-img" src={BG} alt="" />
        {/* 判断有无登录 */}
        {userInfo ? (
          <div className="info">
            {/* 上传图片组件【该组件还有一个插槽】 */}
            <UploadFile emitPath={getAvatarPath}>
              {/* 用户信息里是否有头像，没有就用默认的头像 */}
              {userInfo.avatar ? (
                <Avatar
                  className="avatar"
                  src={userInfo.avatar.replace(/public/, baseURL)}
                ></Avatar>
              ) : (
                <Avatar className="avatar" src={defaultAvatar}></Avatar>
              )}
            </UploadFile>
            <h2 style={{ color: "#fff" }} className="name">
              {userInfo.username}
            </h2>
            <h2 style={{ color: "#fff" }} className="phone">
              {userInfo.phone}
            </h2>
          </div>
        ) : (
          <div className="info">
            <Button color="success" onClick={() => history.push("/login")}>
              授权登录
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default connect((state: any) => {
  return {
    userInfo: state.userInfo,
  };
})(Mine);

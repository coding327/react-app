import React, { FC, useEffect, useState } from "react";
import MyHead from "@/components/MyHead";
import { connect } from "react-redux";
import {
  getMyCollects,
  getMyLikes,
  getuserinfoasync,
  setuserinfo,
} from "@/redux/actions";
import BG from "@/assets/images/mine.gif";
import { Avatar, Button, Dialog, List, Mask, ProgressBar } from "antd-mobile";
import { history } from "umi";
import UploadFile from "@/components/UploadFile";
import { Ajax } from "@/api/api";
import { baseURL } from "@/api/request";
import { defaultAvatar } from "@/utils/common";
import "./app.scss";
import {
  UnorderedListOutline,
  PayCircleOutline,
  SetOutline,
} from "antd-mobile-icons";
import { ShowSuccess, ShowToast } from "@/utils/message";
import { useCheckLogin } from "@/hooks/common";

const Mine: FC<any> = ({ userInfo, dispatch, mylikes, mycollects }) => {
  let timer: any = null;
  const [cache, setCache] = useState<number>(Math.round(Math.random() * 100));
  const [visible, setVisible] = useState<boolean>(false);
  let [percent, setPercent] = useState<number>(0);
  const [mytravels, setMyTravels] = useState<Array<any>>([]);
  const [checkLogin] = useCheckLogin();

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

  const logoutAction = () => {
    Dialog.confirm({
      content: "亲，你真的要退出登录吗???",
      // 点击确认退出登录，清除token和userInfo
      onConfirm: () => {
        sessionStorage.removeItem("appToken");
        dispatch(setuserinfo(null));
      },
    });
  };

  const startGetPercent = () => {
    timer = setInterval(() => {
      if (percent < 100) {
        setPercent(percent++);
      } else {
        setVisible(false);
        ShowSuccess("缓存清除成功");
        setCache(0);
        setPercent(0);
        clearInterval(timer);
        timer = null;
      }
    }, 50);
  };

  const getMyTravels = async () => {
    let res: any = await Ajax.getmytravels();
    if (res.code === 200) {
      setMyTravels(res.result);
    }
  };

  useEffect(() => {
    // 已经登录
    checkLogin(() => {
      dispatch(getuserinfoasync());
      getMyTravels();

      dispatch(
        getMyLikes({
          flag: true,
        })
      );

      dispatch(
        getMyCollects({
          flag: true,
        })
      );
    });

    clearInterval(timer);
    timer = null;
  }, []);

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

      {/* 操作列表 */}
      <div className="mine-list" style={{ padding: 1 }}>
        <List header="操作列表">
          {userInfo && (
            <div>
              <List.Item
                extra={mytravels.length}
                prefix={<UnorderedListOutline />}
                onClick={() => history.push("/app/find")}
              >
                我的游记
              </List.Item>
              <List.Item
                extra={100}
                prefix={<UnorderedListOutline />}
                onClick={() => {
                  history.push("/mylikes?type=0");
                }}
              >
                我的足迹
              </List.Item>
              <List.Item
                extra={mylikes.length}
                prefix={<UnorderedListOutline />}
                onClick={() => {
                  history.push("/mylikes?type=1");
                }}
              >
                我的点赞
              </List.Item>
              <List.Item
                extra={mycollects.length}
                prefix={<UnorderedListOutline />}
                onClick={() => {
                  history.push("/mylikes?type=2");
                }}
              >
                我的收藏
              </List.Item>
              <List.Item prefix={<UnorderedListOutline />} onClick={() => {}}>
                我的钱包
              </List.Item>
              <List.Item
                prefix={<UnorderedListOutline />}
                onClick={() => {
                  history.push("/changepass?password=" + userInfo.password);
                }}
              >
                修改密码
              </List.Item>
            </div>
          )}
          <List.Item prefix={<UnorderedListOutline />} onClick={() => {}}>
            公告
          </List.Item>
          <List.Item prefix={<UnorderedListOutline />} onClick={() => {}}>
            设置
          </List.Item>
          <List.Item prefix={<UnorderedListOutline />} onClick={() => {}}>
            联系我们
          </List.Item>
          <List.Item
            prefix={<UnorderedListOutline />}
            extra={cache + "M"}
            onClick={() => {
              if (cache === 0) {
                ShowToast("缓存已经全部清除");
              } else {
                setVisible(true);
                startGetPercent();
              }
            }}
          >
            清除缓存
          </List.Item>
        </List>
      </div>

      {/* 退出登录 */}
      {userInfo && (
        <div className="logout" style={{ margin: 16 }}>
          <Button block color="warning" onClick={logoutAction}>
            退出登录
          </Button>
        </div>
      )}

      <Mask
        destroyOnClose={true}
        visible={visible}
        style={{
          zIndex: 10000,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          width: "100vw",
          padding: 15,
        }}
      >
        <div style={{ width: "100%", color: "#fff" }}>
          <ProgressBar
            percent={percent}
            text
            style={{
              "--fill-color": "var(--adm-color-success)",
              color: "#fff",
            }}
            rounded={false}
          ></ProgressBar>
        </div>
      </Mask>
    </div>
  );
};

export default connect((state: any) => {
  return {
    userInfo: state.userInfo,
    mylikes: state.mylikes,
    mycollects: state.mycollects,
  };
})(Mine);

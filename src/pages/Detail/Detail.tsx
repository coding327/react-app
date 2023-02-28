import { Ajax } from "@/api/api";
import MyHead from "@/components/MyHead";
import React, { FC, useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "umi";
import { useThrottleEffect } from "ahooks";
import {
  Result,
  Card,
  Tag,
  Ellipsis,
  Image,
  Space,
  Divider,
  Avatar,
  Toast,
} from "antd-mobile";
import {
  HeartOutline,
  FillinOutline,
  RightOutline,
  LikeOutline,
  LocationOutline,
  FireFill,
} from "antd-mobile-icons";
import _ from "lodash";
import { baseURL } from "@/api/request";
import { useCheckLogin, useCommon } from "@/hooks/common";
import { connect } from "react-redux";
import { defaultAvatar } from "@/utils/common";
import { ShowToast } from "@/utils/message";

const Detail: FC<any> = ({ dispatch, userInfo }) => {
  const location = useLocation();
  const [query] = useSearchParams();
  const params = useParams();
  const [obj, setObj] = useState<any>(null);
  const [setdateFormat] = useCommon();
  const [checkLogin] = useCheckLogin();
  const changehot = async (hot: any) => {
    let res: any = await Ajax.changetravels({
      _id: params.id,
      hot: hot,
    });
  };

  const changetravels = async (payload: any) => {
    let res: any = await Ajax.changetravels({
      _id: params.id,
      ...payload,
    });
    if (res.code == 200) {
      getDetailData(true); // 刷新页面的热度
    }
  };

  const getDetailData = async (flag?: any) => {
    let res: any = await Ajax.gettravelbyid({
      _id: params.id,
    });
    if (res.code == 200) {
      setObj(res.result);
      !flag && changehot(res.result.hot + 1); // 每次进了加1
    }
  };

  useThrottleEffect(
    () => {
      getDetailData();
    },
    [],
    {
      wait: 5000,
    }
  );

  const [hasLike, setHasLike] = useState<boolean>(false);
  // 点赞
  const todoLike = () => {
    checkLogin(async () => {
      if (hasLike) {
        Toast.show("取消点赞了");
        // 取消点赞
        let res: any = await Ajax.dellikeone({
          tid: params.id,
          phone: userInfo.phone,
        });
        changetravels({
          hot: obj.hot - 2,
          likes: (obj.likes ? obj.likes : 0) - 1,
        });
      } else {
        Toast.show("点赞成功了");
        // 添加点赞
        let res: any = await Ajax.addlikeone({
          tid: params.id,
          phone: userInfo.phone,
          userInfo,
          travel: obj,
        });
        changetravels({
          hot: obj.hot + 2,
          likes: (obj.likes ? obj.likes : 0) + 1,
        });
      }

      // 取反
      setHasLike(!hasLike);
    });
  };

  // 判断我是否已经点赞
  const getMyHasLike = async () => {
    let res: any = await Ajax.getlikelist({
      tid: params.id,
      // phone:userInfo.phone,
      flag: true, // 带手机号查询
    });
    setHasLike(!!res.result.length);
  };

  // 判断我是否已经收藏
  const [hasCollect, setHasCollect] = useState<boolean>(false);
  // 判断我是否已经收藏
  const getMyHasCollect = async () => {
    let res: any = await Ajax.getcollectlist({
      tid: params.id,
      flag: true, // 带手机号查询
    });
    setHasCollect(!!res.result.length);
  };

  const todoCollect = () => {
    checkLogin(async () => {
      if (hasCollect) {
        // 已经收藏
        let res: any = await Ajax.delcollectone({
          tid: params.id,
          phone: userInfo.phone,
        });
        changetravels({
          hot: obj.hot - 3, // 收藏一次热度+3
          collects: (obj.collects ? obj.collects : 0) - 1,
        });
      } else {
        // 添加点赞和收藏
        let res: any = await Ajax.addcollectone({
          tid: params.id,
          phone: userInfo.phone,
          userInfo,
          travel: obj,
        });
        changetravels({
          hot: obj.hot + 3, // 收藏一次热度+3
          collects: (obj.collects ? obj.collects : 0) + 1,
        });
      }

      setHasCollect(!hasCollect);
    });
  };

  useEffect(() => {
    // 登录就请求，没有登录就不请求
    checkLogin(() => {
      // 已经登录有apptoken
      getMyHasLike();
      getMyHasCollect();
    });
  }, []);

  return (
    <div className="detail" style={{ padding: 10 }}>
      <MyHead title={query.get("title")}></MyHead>
      {obj && (
        <div
          style={{
            padding: 10,
            width: "100%",
            borderRadius: "10px",
            border: "1px solid #ddd",
            marginBottom: 15,
          }}
        >
          <div style={{ width: "100%" }}>
            <div style={{ fontWeight: "500", fontSize: 16 }}>
              <Ellipsis direction="end" content={obj.title} />
            </div>
            <div className="tags" style={{ width: "100%", marginTop: 6 }}>
              {obj.tags.map((val: any) => {
                return (
                  <Tag
                    key={val.label}
                    style={{ marginRight: "6px" }}
                    color={val.color}
                  >
                    {" "}
                    {val.label}{" "}
                  </Tag>
                );
              })}
            </div>
            <div
              style={{
                marginTop: 1,
                width: "100%",
                fontSize: "12px",
                color: "#999",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginTop: 5,
                  fontWeight: "500",
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LocationOutline />
                <Ellipsis direction="end" rows={1} content={obj.address} />
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 10,
              width: "100%",
              fontSize: "12px",
              color: "#999",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ lineHeight: 1 }}>
              {setdateFormat(obj.time, "YYYY-MM-DD HH:mm:ss")}
            </span>
            <span style={{ lineHeight: 1 }}>
              <FireFill /> 热度: {obj.hot}
            </span>
          </div>
          <div className="imgs" style={{ width: "100%", marginTop: 12 }}>
            {/* 最多显示三张 如果只有一张 就显示一张全屏  */}
            <Space wrap>
              {obj.imgs.length == 1 ? (
                <Image
                  src={obj.imgs[0].url.replace(/public/, baseURL)}
                  width={310}
                  height={310}
                  fit="cover"
                  style={{ borderRadius: 8 }}
                ></Image>
              ) : (
                obj.imgs.map((val: any, index: any) => {
                  return (
                    <Image
                      src={val.url.replace(/public/, baseURL)}
                      key={index}
                      width={105}
                      height={105}
                      fit="cover"
                      style={{ borderRadius: 8 }}
                    />
                  );
                })
              )}
            </Space>
          </div>
          <div
            className="content"
            style={{ width: "100%", marginTop: 6, paddingRight: 5 }}
          >
            <Ellipsis direction="end" rows={100} content={obj.content} />
          </div>

          <div
            style={{
              marginLeft: 10,
              color: "#f50",
              marginTop: 10,
              fontWeight: "500",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
            }}
          >
            {userInfo ? (
              userInfo.avatar ? (
                <Avatar
                  style={{ "--size": "1rem" }}
                  src={userInfo.avatar.replace(/public/, baseURL)}
                  className="avatar"
                />
              ) : (
                <Avatar src={defaultAvatar} className="avatar" />
              )
            ) : (
              <Avatar src={defaultAvatar} className="avatar" />
            )}
            <span style={{ color: "#123456", marginLeft: 5 }}>
              {obj.author.username}
            </span>
          </div>

          <div
            className="actions"
            style={{
              width: "100%",
              marginTop: 10,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <span
              onClick={todoLike}
              style={{ color: hasLike ? "red" : "#333" }}
            >
              <LikeOutline />
              <span>{obj.likes ? obj.likes : 0}</span>
            </span>
            <Divider direction="vertical" />
            <span>
              <FillinOutline /> {obj.pings ? obj.pings : 0}
            </span>
            <Divider direction="vertical" />
            <span
              onClick={todoCollect}
              style={{ color: hasCollect ? "red" : "#333" }}
            >
              <HeartOutline /> {obj.collects ? obj.collects : 0}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default connect((state: any) => {
  return {
    ...state,
  };
})(Detail);

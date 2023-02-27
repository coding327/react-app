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
} from "antd-mobile";
import {
  HeartOutline,
  FillinOutline,
  LikeOutline,
  LocationOutline,
  FireFill,
  UserCircleOutline,
} from "antd-mobile-icons";
import _ from "lodash";
import { baseURL } from "@/api/request";
import { useCommon } from "@/hooks/common";
const Detail: FC = () => {
  const location = useLocation();
  const [query] = useSearchParams();
  const params = useParams();
  const [obj, setObj] = useState<any>(null);
  const [setdateFormat] = useCommon();
  const changehot = async (hot: any) => {
    let res: any = await Ajax.changehot({
      _id: params.id,
      hot: hot,
    });
  };
  const getDetailData = async () => {
    let res: any = await Ajax.gettravelbyid({
      _id: params.id,
    });
    if (res.code == 200) {
      setObj(res.result);
      changehot(res.result.hot + 1); // 每次进了加1
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
  return (
    <div className="detail" style={{ padding: 10 }}>
      <MyHead title={query.get("title") || ''}></MyHead>
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

              <div
                style={{
                  marginTop: 5,
                  fontWeight: "500",
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <UserCircleOutline />
                <span style={{ color: "#123456", marginLeft: 5 }}>
                  {obj.author.username}
                </span>
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
            className="actions"
            style={{
              width: "100%",
              marginTop: 10,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <span>
              <LikeOutline /> {obj.likes ? obj.likes : 0}
            </span>
            <Divider direction="vertical" />
            <span>
              <FillinOutline /> {obj.pings ? obj.pings : 0}
            </span>
            <Divider direction="vertical" />
            <span>
              <HeartOutline /> {obj.collects ? obj.collects : 0}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;

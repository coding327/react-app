import { useCheckLogin, useCommon } from "@/hooks/common";
import React, { FC, useEffect, useState } from "react";
import { history, Link } from "umi";
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
  SmileOutline,
  AntOutline,
  HeartOutline,
  FillinOutline,
  RightOutline,
  LikeOutline,
  LocationOutline,
  FireFill,
  UserCircleOutline,
} from "antd-mobile-icons";
import _ from "lodash";
import { baseURL } from "@/api/request";
const ListItem: FC<any> = ({ item, type }) => {
  const [setdateFormat] = useCommon();
  return (
    <div
      onClick={() =>
        history.push("/detail/" + item._id + "?title=" + item.title)
      }
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
          <Ellipsis direction="end" content={item.title} />
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
          <LocationOutline />
          <Ellipsis direction="end" rows={1} content={item.address} />
        </div>
        <div
          style={{
            marginTop: 5,
            width: "100%",
            fontSize: "12px",
            color: "#999",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ lineHeight: 1 }}>{setdateFormat(item.date)}</span>
          <span style={{ lineHeight: 1 }}>
            <FireFill /> 热度: {item.hot}
          </span>
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
            {item.author.username}
          </span>
        </div>
      </div>

      <div className="tags" style={{ width: "100%", marginTop: 6 }}>
        {item.tags.map((val: any) => {
          return (
            <Tag
              key={val.label}
              style={{ marginRight: "6px" }}
              color={val.label == type ? "#f50" : val.color}
            >
              {" "}
              {val.label}{" "}
            </Tag>
          );
        })}
      </div>
      <div className="imgs" style={{ width: "100%", marginTop: 12 }}>
        {/* 最多显示三张 如果只有一张 就显示一张全屏  */}
        <Space wrap>
          {item.imgs.length == 1 ? (
            <Image
              src={item.imgs[0].url.replace(/public/, baseURL)}
              width={280}
              height={280}
              fit="cover"
              style={{ borderRadius: 8 }}
            ></Image>
          ) : (
            item.imgs.slice(0, 3).map((val: any, index: any) => {
              return (
                <Image
                  src={val.url.replace(/public/, baseURL)}
                  key={index}
                  width={80}
                  height={80}
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
        <Ellipsis direction="end" rows={2} content={item.content} />
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
          <LikeOutline /> {item.likes ? item.likes : 0}
        </span>
        <Divider direction="vertical" />
        <span>
          <FillinOutline /> {item.pings ? item.pings : 0}
        </span>
        <Divider direction="vertical" />
        <span>
          <HeartOutline /> {item.collects ? item.collects : 0}
        </span>
      </div>
    </div>
  );
};

export default ListItem;

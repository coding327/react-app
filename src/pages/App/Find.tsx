import { Ajax } from "@/api/api";
import MyHead from "@/components/MyHead";
import { useCheckLogin, useCommon } from "@/hooks/common";
import React, { FC, useEffect, useState } from "react";
import { history, Link } from "umi";
import { Result, Card, Tag, Ellipsis, Image, Space } from "antd-mobile";
import {
  SmileOutline,
  AntOutline,
  RightOutline,
  LocationOutline,
} from "antd-mobile-icons";
import _ from "lodash";
import { baseURL } from "@/api/request";

const Find: FC = () => {
  const [checkLogin] = useCheckLogin();
  const [setdateFormat] = useCommon();
  const [mytravels, setMyTravels] = useState<any>([]);
  const getMyTravels = async () => {
    let res: any = await Ajax.getmytravels();
    if (res.code == 200) {
      setMyTravels(res.result);
    }
  };
  useEffect(() => {
    checkLogin(() => {
      getMyTravels();
    });
  }, []);
  return (
    <div style={{ padding: 15 }}>
      <MyHead title="发现">
        <div>
          <a onClick={() => history.push("/submit")}>发布游记</a>
        </div>
      </MyHead>

      {mytravels.length > 0 ? (
        <div>
          {_.map(mytravels, (item: any, index: any) => {
            return (
              <div
                onClick={() =>
                  history.push("/detail/" + item._id + "?title=" + item.title)
                }
                key={index}
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
                    style={{ marginTop: 5, fontWeight: "500", fontSize: 14 }}
                  >
                    <LocationOutline /> {item.address}
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
                    <span style={{ lineHeight: 1 }}>
                      {setdateFormat(item.date)}
                    </span>
                    <span style={{ lineHeight: 1 }}>热度: {item.hot}</span>
                  </div>
                </div>

                <div className="tags" style={{ width: "100%", marginTop: 6 }}>
                  {item.tags.map((val: any) => {
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
                <div className="imgs" style={{ width: "100%", marginTop: 12 }}>
                  {/* 最多显示三张 如果只有一张 就显示一张全屏  */}
                  <Space wrap>
                    {item.imgs.length == 1 ? (
                      <Image
                        src={item.imgs[0].url.replace(/public/, baseURL)}
                        width={330}
                        height={330}
                        fit="cover"
                        style={{ borderRadius: 8 }}
                      ></Image>
                    ) : (
                      item.imgs.slice(0, 3).map((val: any, index: any) => {
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
                  <Ellipsis direction="end" rows={2} content={item.content} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <Result
            icon={<SmileOutline />}
            status="success"
            title="暂无数据"
            description="记得添加我们自己的旅游日记哦,请点击左上角"
          />
        </div>
      )}
    </div>
  );
};

export default Find;

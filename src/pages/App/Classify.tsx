import MyHead from "@/components/MyHead";
import React, { useEffect, useState } from "react";
import { SideBar, Empty } from "antd-mobile";
import { tagList } from "@/utils";
import { Ajax } from "@/api/api";
import ListItem from "@/components/ListItem";
import _ from "lodash";

const Classify = () => {
  const [list, setList] = useState([{ label: "全部", value: -1 }, ...tagList]);
  const [originList, setOriginList] = useState<any>([]); // 保证筛选的数据不会被过滤
  const [travels, setTravels] = useState<any>([]);
  const [type, setType] = useState<string>("");

  const getalltravels = async (payload?: any) => {
    let res: any = await Ajax.getalltravels(payload);
    if (res.code == 200) {
      setTravels(res.result);
      setOriginList(res.result);
    }
  };
  useEffect(() => {
    getalltravels();
  }, []);

  const changeType = (value: any) => {
    // 前端过滤
    console.log(value);

    if (value == "全部") {
      setTravels([...originList]);
      setType("");
    } else {
      setType(value);
      var newlist = _.filter(originList, (item: any) =>
        _.some(item.tags, (v: any) => v.label == value)
      );
      setTravels([...newlist]);
    }
  };

  return (
    <div
      className="classify"
      style={{ width: "100%", overflow: "hidden", display: "flex" }}
    >
      <MyHead title="分类">
        <div>
          <span>武汉</span>
        </div>
      </MyHead>

      <div className="leftbox" style={{ height: "100%" }}>
        <SideBar style={{ "--width": "70px" }} onChange={changeType}>
          {list.map((item, index) => {
            return <SideBar.Item key={item.label} title={item.label} />;
          })}
        </SideBar>
      </div>
      <div
        className="rightbox"
        style={{ height: "100%", flex: 1, padding: 10, overflow: "auto" }}
      >
        {travels.length > 0 ? (
          travels.map((item: any, index: any) => {
            return <ListItem type={type} key={index} item={item}></ListItem>;
          })
        ) : (
          <Empty
            style={{ padding: "64px 0", marginTop: 240 }}
            imageStyle={{ width: 128 }}
            description="暂无当前分类数据"
          />
        )}
      </div>
    </div>
  );
};

export default Classify;

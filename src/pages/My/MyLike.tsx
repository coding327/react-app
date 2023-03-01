import React, { FC, useEffect, useState, useRef } from "react";
import MyHead from "@/components/MyHead";
import { useSearchParams } from "umi";
import { myTypeList } from "@/utils";
import { connect } from "react-redux";
import { getMyCollects, getMyLikes } from "@/redux/actions";
import { Dropdown, Radio, Space } from "antd-mobile";
import ListItem from "./../../components/ListItem";
import NewItem from "./../../components/NewItem";
import { DropdownRef } from "antd-mobile/es/components/dropdown";
import { CheckCircleOutline } from "antd-mobile-icons";

const MyLike: FC<any> = ({ dispatch, mylikes, mycollects }) => {
  const tlist = ["时间排序", "时间升序", "时间降序"];
  const hlist = ["热度排序", "热度升序", "热度降序"];
  const [query] = useSearchParams();
  const type: any = query?.get("type") || 0;
  const [timeSort, setTimeSort] = useState<number>(0);
  const [hotSort, setHotSort] = useState<number>(0);
  const dropdown = useRef<DropdownRef>(null);

  useEffect(() => {
    if (type == 0) {
    } else if (type == 1) {
      dispatch(
        getMyLikes({
          flag: true,
        })
      );
    } else if (type == 2) {
      dispatch(
        getMyCollects({
          flag: true,
        })
      );
    }
  }, []);

  const onChange = (value: any) => {
    console.log(value);
  };

  const sortList = [0, 1, -1]; // 默认排序  升序 降序

  const changeTimeSort = (value: number) => {
    setTimeSort(value);
    dropdown.current?.close();
    var sort = {};
    if (value != 0) {
      sort = { "travel.time": sortList[value] };
    }

    if (type == 0) {
    } else if (type == 1) {
      dispatch(
        getMyLikes(
          {
            flag: true,
          },
          sort
        )
      );
    } else if (type == 2) {
      dispatch(
        getMyCollects(
          {
            flag: true,
          },
          sort
        )
      );
    }
  };

  const changeHotSort = (value: number) => {
    setHotSort(value);
    dropdown.current?.close();

    var sort = {};
    if (value != 0) {
      sort = { "travel.hot": sortList[value] };
    }

    if (type == 0) {
    } else if (type == 1) {
      dispatch(
        getMyLikes(
          {
            flag: true,
          },
          sort
        )
      );
    } else if (type == 2) {
      dispatch(
        getMyCollects(
          {
            flag: true,
          },
          sort
        )
      );
    }
  };
  return (
    <div>
      <MyHead title={myTypeList[type]}></MyHead>
      <div style={{ position: "sticky", width: "100%", left: 0, top: 46 }}>
        <Dropdown onChange={onChange} ref={dropdown}>
          <Dropdown.Item key="sorter" title={tlist[timeSort]}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 12,
                color: timeSort == 0 ? "#f50" : "#333  ",
              }}
              onClick={() => changeTimeSort(0)}
            >
              <span>时间排序</span>{" "}
              <span style={{ display: timeSort == 0 ? "block" : "none" }}>
                <CheckCircleOutline />
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 12,
                color: timeSort == 1 ? "#f50" : "#333  ",
              }}
              onClick={() => changeTimeSort(1)}
            >
              <span>时间升序</span>{" "}
              <span style={{ display: timeSort == 1 ? "block" : "none" }}>
                <CheckCircleOutline />
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 12,
                color: timeSort == 2 ? "#f50" : "#333  ",
              }}
              onClick={() => changeTimeSort(2)}
            >
              <span>时间降序</span>{" "}
              <span style={{ display: timeSort == 2 ? "block" : "none" }}>
                <CheckCircleOutline />
              </span>
            </div>
          </Dropdown.Item>
          <Dropdown.Item key="bizop" title={hlist[hotSort]}>
            {hlist.map((item: any, index: any) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 12,
                    color: hotSort == index ? "#f50" : "#333  ",
                  }}
                  onClick={() => changeHotSort(index)}
                >
                  <span>{item}</span>{" "}
                  <span
                    style={{ display: hotSort == index ? "block" : "none" }}
                  >
                    <CheckCircleOutline />
                  </span>
                </div>
              );
            })}
          </Dropdown.Item>
        </Dropdown>
      </div>

      {type == 1 && (
        <div style={{ padding: 10 }}>
          {mylikes.map((item: any, index: any) => {
            return (
              <NewItem
                tab={"1"}
                flag={true}
                userInfo={item.userInfo}
                item={item.travel}
                key={index}
              ></NewItem>
            );
          })}
        </div>
      )}

      {type == 2 && (
        <div style={{ padding: 10 }}>
          {mycollects.map((item: any, index: any) => {
            return (
              <NewItem
                tab={"1"}
                flag={true}
                userInfo={item.userInfo}
                item={item.travel}
                key={index}
              ></NewItem>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default connect((state: any) => {
  return {
    ...state,
  };
})(MyLike);

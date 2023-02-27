import { Ajax } from "@/api/api";
import MyHead from "@/components/MyHead";
import React, { FC, useEffect, useState } from "react";
import {
  Button,
  SearchBar,
  Space,
  Toast,
  Result,
  ErrorBlock,
  List,
} from "antd-mobile";
import ListItem from "@/components/ListItem";
import _ from "lodash";
import {
  SmileOutline,
  SetOutline,
  RightOutline,
  LocationOutline,
} from "antd-mobile-icons";
import { useLocalStorageState } from "ahooks";

const Search: FC = () => {
  const [list, setList] = useState<any>([]);
  const [allList, setAllList] = useState<any>([]);
  const [keyword, changeKeyword] = useState("");
  const [flag, setFlag] = useState<boolean>(false);
  const getalltravels = async (payload?: any) => {
    let res: any = await Ajax.getalltravels(payload);
    if (res.code == 200) {
      // setList(res.result)
      setAllList(res.result);
    }
  };

  // 搜索的列表关键字
  const [searchList, setSearchList] = useLocalStorageState<Array<any>>(
    "searchList",
    {
      defaultValue: [],
    }
  );

  useEffect(() => {
    getalltravels();
  }, []);

  const onSearch = (value: any) => {
    searchList.push(value);
    setSearchList([...searchList]);
    setFlag(true);
    var newList = _.filter(
      allList,
      (item: any) =>
        item.title?.indexOf(value) > -1 ||
        _.some(item.tags, (v: any) => v.label == value)
    );
    setList([...newList]);
  };

  const onCancel = () => {
    setFlag(false);
  };
  return (
    <div style={{ width: "100%" }}>
      <MyHead title="搜索"></MyHead>
      <div style={{ width: "100%", padding: "5px 10px" }}>
        <SearchBar
          onCancel={onCancel}
          onSearch={onSearch}
          style={{ width: "100%" }}
          placeholder="请输入搜索关键字"
          showCancelButton
          onChange={changeKeyword}
          value={keyword}
        />
      </div>
      <div style={{ padding: 10 }}>
        {flag ? (
          list.length > 0 ? (
            list.map((item: any, index: any) => {
              return (
                <ListItem key={index} item={item} type={keyword}></ListItem>
              );
            })
          ) : (
            <ErrorBlock status="empty" />
          )
        ) : (
          <div>
            <Result
              icon={<SmileOutline />}
              status="success"
              title="请先搜索哦"
              description="关键字为 旅游标题和 分类 "
            />
            <List header="搜索记录">
              {searchList.slice(-5).map((item, index) => (
                <List.Item
                  key={index}
                  prefix={<SetOutline />}
                  onClick={() => {
                    onSearch(item);
                    changeKeyword(item);
                  }}
                >
                  {item}
                </List.Item>
              ))}
            </List>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

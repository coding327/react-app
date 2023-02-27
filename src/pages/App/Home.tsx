import React, { FC, useCallback, useEffect, useState } from "react";
import MyHead from "@/components/MyHead";
import { Image, Swiper, Tabs } from "antd-mobile";
import { Ajax } from "@/api/api";
import { baseURL } from "@/api/request";
import LoadMore from "@/components/LoadMore";
import ListItem from "@/components/ListItem";
import styles from './index.less'

const Home: FC = () => {
  const pageSize = 10;
  const [type, setType] = useState<string>("1"); // 1 hot 2 new
  const [page, setPage] = useState<number>(1); // 当前页码
  const [total, setTotal] = useState<number>(pageSize); // 总条数
  // 每页多少条
  let [list, setList] = useState<any>([]);
  const [banners, setBanners] = useState<any>([]);

  const gettravelbanners = useCallback(async () => {
    let res: any = await Ajax.gettravelbanners();
    setBanners(res.result);
  }, []);

  const refreshData = useCallback(async () => {
    let res: any = await Ajax.gethomelist({
      type: type,
      page,
      pageSize,
    });
    if (res.code === 200) {
      setTotal(res.total);
      setList(res.result);
    }
  }, []);

  const gethomelist = useCallback(async (payload: any) => {
    let res: any = await Ajax.gethomelist(payload);
    if (res.code === 200) {
      setTotal(res.total);
      setList(res.result);
      gettravelbanners();
    }
  }, []);

  useEffect(() => {
    gethomelist({
      type,
      page,
      pageSize,
    });
  }, []);

  // 请求下一页的数据
  const loadDataByPage = async (dataAdd: any, dataEnd: any) => {
    // 一共188条数据 每页 10条 最多19页
    // page=20
    setPage(page + 1);
    console.log(page);
    console.log(total);
    console.log(Math.ceil(total / pageSize));
    if (page > Math.ceil(total / pageSize)) {
      console.log("数据见底了");
      dataEnd(); // 通知全部加载
    } else {
      let res: any = await Ajax.gethomelist({
        page,
        type,
        pageSize,
      });
      var arr = list.concat(res.result);
      setList([...arr]);
      setTotal(res.total);
      dataAdd(); // 通知第二页加载完毕
    }
  };

  const changeType = (type: string) => {
    console.log(type);
    setPage(1); // tab切换，请求第一页数据
    setType(type);
    gethomelist({ type, page: 1, pageSize });
  };

  return (
    <div>
      <MyHead title="首页" back={true}></MyHead>

      {/* 轮播图 */}
      <div className="banners">
        <Swiper
          autoplay={true}
          slideSize={86}
          trackOffset={7}
          loop
          stuckAtBoundary={false}
          indicator={(total, current) => (
            <div className={styles.customIndicator}>
              {`${current + 1} / ${total}`}
            </div>
          )}
        >
          {banners.map((item: any, index: any) => (
            <Swiper.Item key={index}>
              <Image
                style={{ height: 180 }}
                src={item.imgs[0].url.replace(/public/, baseURL)}
              ></Image>
            </Swiper.Item>
          ))}
        </Swiper>
      </div>

      {/* homebox */}
      <div className="homebox">
        <div className="navs">
          <Tabs
            style={{
              "--active-line-color": "var(--adm-color-success)",
              "--active-title-color": "var(--adm-color-success)",
            }}
            activeKey={type}
            onChange={changeType}
          >
            <Tabs.Tab title="最热推荐" key="1">
              <LoadMore
                loadDataByPage={loadDataByPage}
                refreshData={refreshData}
              >
                {list.map((item: any, index: any) => (
                  <ListItem
                    tab={type}
                    flag={true}
                    item={item}
                    key={index}
                  ></ListItem>
                ))}
              </LoadMore>
            </Tabs.Tab>
            <Tabs.Tab title="最新推荐" key="2">
              <LoadMore
                loadDataByPage={loadDataByPage}
                refreshData={refreshData}
              >
                {list.map((item: any, index: any) => (
                  <ListItem
                    key={index}
                    tab={type}
                    flag={true}
                    item={item}
                  ></ListItem>
                ))}
              </LoadMore>
            </Tabs.Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Home;

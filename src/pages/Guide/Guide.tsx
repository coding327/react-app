import React, { FC, useState, useLayoutEffect } from "react";
import { Swiper, Button } from "antd-mobile";
import { Ajax } from "@/api/api";
import Dao from "@/components/Dao";
import { history } from "umi";
import { useLocalStorageState } from "ahooks";
import { useGetYearWeek } from "@/hooks/common";

const Guide: FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [banners, setBanners] = useState<Array<any>>([]);
  const getBannerData = async () => {
    let res: any = await Ajax.getBanner();
    if (res.code == 200) {
      setBanners(res.banners);
    }
  };

  // 一周更换一次广告
  const [getWeek] = useGetYearWeek();
  const [week, setWeek] = useLocalStorageState("localWeek");

  useLayoutEffect(() => {
    const nowWeek = getWeek();
    console.log(nowWeek);
    console.log(week);
    if (week) {
      if (week == nowWeek) {
        // 还是当前这周，不用看广告了
        history.push('/app')
      } else {
        // 又是一周了，看一下广告
        setWeek(nowWeek);
        getBannerData();
      }
    } else {
      // 第一次访问【看广告】
      setWeek(nowWeek);
      getBannerData();
    }
  }, []);

  return (
    <div
      className="guide"
      style={{ width: "100%", height: "100%", display: "flex" }}
    >
      <div
        className="gbox"
        style={{
          width: "80%",
          height: "80%",
          marginTop: "10%",
          marginLeft: "10%",
        }}
      >
        {/* history.push('/app') */}
        <Dao
          color="#000"
          onEnd={() => {
            history.push("/app");
          }}
          style={{ right: 5, top: 5 }}
        ></Dao>
        <Swiper
          style={{
            "--border-radius": "8px",
            height: "100%",
          }}
          autoplay={true}
          loop={true}
          onIndexChange={(index: number) => {
            console.log(index);
            setCurrent(index);
          }}
        >
          {banners.map((item, index) => (
            <Swiper.Item key={index}>
              <img
                style={{ width: "100%", height: "100%" }}
                src={item.imageUrl}
              />
            </Swiper.Item>
          ))}
        </Swiper>
        {current == banners.length - 1 && (
          <Button
            onClick={() => history.push("/app")}
            color="success"
            style={{ margin: "40px auto", display: "block" }}
          >
            开始App之旅
          </Button>
        )}
      </div>
    </div>
  );
};

export default Guide;

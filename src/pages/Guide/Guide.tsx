import React, { FC, useState, useEffect, useRef } from "react";

import { ProgressCircle, Swiper, Toast } from "antd-mobile";
import styles from "./demo1.less";
import axios from "axios";
import { SwiperRef } from "antd-mobile/es/components/swiper";



const Guide: FC = () => {
  let [num, changeNum] = useState<number>(0);
  let [items, changeItems] = useState<any>([]);

  const ref = useRef<SwiperRef>(null);

  const progressBar = () => {
    let timer: any = setInterval(() => {
      if (num < 100) {
        changeNum((num += 2));
      } else {
        clearInterval(timer);
        timer = null;
      }
    }, 100);
  };

  const getListData = async () => {
    let res = await axios.get("http://121.196.235.163:3000/banner");

    changeItems(items = res.data.banners);
  };

  useEffect(() => {
    progressBar();
    getListData();
  }, []);

  return (
    <div>
      <ProgressCircle percent={num} style={{ "--size": "60px" }}>
        <span className={styles.middle}>{`${num}%`}</span>
      </ProgressCircle>
      <>
        <Swiper autoplay>
          {items.map((item, index) => (
            <Swiper.Item key={index}>
              <div
                className={styles.content}
                onClick={() => {
                  Toast.show(`你点击了卡片 ${index + 1}`);
                }}
              >
                <img src={item?.imageUrl} alt="" />
              </div>
            </Swiper.Item>
          ))}
        </Swiper>
      </>
    </div>
  );
};

export default Guide;

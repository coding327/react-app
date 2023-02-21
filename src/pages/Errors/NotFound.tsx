import React, { FC, useState, useEffect } from "react";
import { Button } from "antd-mobile";
import { history } from "umi";

import { useTimeDownCounter } from '@/hooks/common'

import "./notFound.less";

const NotFound: FC = () => {

  const [counter] = useTimeDownCounter()

  // let [count, setCount] = useState(5);

  // let timer: any = null;
  // const dao = () => {
  //   timer = setInterval(() => {
  //     if (count > 0) {
  //       setCount(count--);
  //     } else {
  //       clearInterval(timer);
  //       timer = null;
  //       history.push('/app')
  //     }
  //   }, 1000);
  // };

  // 组件载入 onMounted
  // 组件数据更新 onUpdated
  // 组件销毁 onUnMounted

  // useEffect watch 数据监听
  useEffect(() => {
    // dao();

    // 组件销毁 onUnMounted
    // return () => {
    //   clearInterval(timer);
    //   timer = null;
    // };
  }, []);

  return (
    <>
      <Button
        color="primary"
        fill="solid"
        style={{ width: 100, borderRadius: 10 }}
      >
        {/* {count} S */}
        {counter} S
      </Button>
      <div className="wscn-http404-container">
        <div className="wscn-http404">
          <div className="pic-404">
            <img
              className="pic-404__parent"
              src={require("@/assets/404_images/404.png")}
              alt="404"
            />
            <img
              className="pic-404__child left"
              src={require("@/assets/404_images/404_cloud.png")}
              alt="404"
            />
            <img
              className="pic-404__child mid"
              src={require("@/assets/404_images/404_cloud.png")}
              alt="404"
            />
            <img
              className="pic-404__child right"
              src={require("@/assets/404_images/404_cloud.png")}
              alt="404"
            />
          </div>
          <div className="bullshit">
            <div className="bullshit__oops">404错误!</div>
            <div className="bullshit__headline">找不到网页</div>
            <div className="bullshit__info">
              对不起，您正在寻找的页面不存在。尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。
            </div>
            <span
              className="bullshit__return-home"
              onClick={() => history.push("/app")}
            >
              返回首页
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;

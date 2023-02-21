import React, { useState, useEffect } from "react";
import { Button } from "antd-mobile";

import './badServe.less'

const BadServe = () => {
  let [count, setCount] = useState(5);

  let timer: any = null
  const dao = () => {
    timer = setInterval(() => {
      if (count > 0) {
        setCount((count -= 1));
      } else {
        clearInterval(timer);
        timer = null;
      }
    }, 1000);
  };

  useEffect(() => {
    dao();
  }, []);

  return (
    <div>
      <Button
        color="primary"
        fill="solid"
        style={{ width: 100, borderRadius: 10 }}
        className="countDown"
      >
        {count} S
      </Button>
      <img src={require("@/assets/images/503.png")} alt="" className="bgImg" />
    </div>
  );
};

export default BadServe;

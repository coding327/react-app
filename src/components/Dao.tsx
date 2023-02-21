import React, { FC, useState } from "react";
import { ProgressCircle } from "antd-mobile";
import { useInterval } from "ahooks";
import { history } from "umi";

const Dao: FC<{ style?: any; color?: any; time?: any; onEnd?: any }> = ({
  style,
  color,
  time,
  onEnd,
}) => {
  const total = 100;
  const gotowhere = () => {
    if (onEnd) {
      onEnd();
    } else {
      history.push("/app");
    }
  };

  const [counter, setCounter] = useState<number>(0);

  useInterval(() => {
    if (counter < total) {
      setCounter(counter + 1);
    } else {
      gotowhere();
    }
  }, (time * 1000) / total);

  return (
    <div
      className="dao"
      style={{ position: "absolute", zIndex: 1000, ...style }}
      onClick={gotowhere}
    >
      <ProgressCircle
        percent={counter}
        style={{
          "--fill-color": "var(--adm-color-success)",
          "--size": "1.5rem",
          color: color,
        }}
      >
        {counter}%
      </ProgressCircle>
    </div>
  );
};

Dao.defaultProps = {
  style: {
    top: "0.53rem",
    right: "0.53rem",
  },
  color: "#fff",
  time: 5,
};

export default Dao;

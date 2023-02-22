import React, { FC } from "react";
import { LeftOutline } from "antd-mobile-icons";
import { history } from "umi";
const Back: FC = () => {
  return (
    <div>
      <LeftOutline
        onClick={() => history.go(-1)}
        style={{ color: "#000", fontSize: "0.6rem" }}
      />
    </div>
  );
};

export default Back;

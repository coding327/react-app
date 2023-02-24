import React from "react";
import { Outlet } from "umi";
import AntFoot from "@/components/AntFoot";

const App = () => {
  return (
    <div className="appbox">
      <Outlet></Outlet>
      <AntFoot></AntFoot>
    </div>
  );
};

export default App;

import { Link, Outlet } from "umi";
import styles from "./index.less";

// main.ts react 项目的主入口文件
// 1. 全局的CSS
import "../styles/index.scss";

// 2. antd-mobile

// 3. hooks

// 4. redux
import store from "@/redux/store";
import { Provider } from "react-redux";

export default function Layout() {
  return (
    <div className={styles.all}>
      {/* 隔空传递 */}
      <Provider store={store}>
        <Outlet />
      </Provider>
    </div>
  );
}

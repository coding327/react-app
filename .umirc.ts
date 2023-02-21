import { routes } from "./src/pages/router";
import { defineConfig } from "umi";

export default defineConfig({
  // 如果没有 routes 配置，Umi 会进入约定式路由模式
  routes: routes,
  npmClient: "cnpm",
  history: {
    // 路由模式  browser / hash
    type: "hash",
  },
  title: "App项目",
  links: [{ rel: "icon", href: "/img/favicon.ico" }], // logo
  // favicon: './favicon.ico',
  base: "", // 项目的基路径
  publicPath: "", // 公共路径
});

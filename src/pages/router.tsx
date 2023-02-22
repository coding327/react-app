import { LoginRoutes } from "./Logins/route";
import { AppRoutes } from "./App/route";

// 全局的路由配置
export const routes = [
  { path: "/", redirect: "/guide" },
  { path: "/guide", component: "@/pages/Guide/Guide" },
  { path: "/demo", component: "@/pages/Demo/Demo" },
  ...LoginRoutes,
  ...AppRoutes,
  { path: "/search", component: "@/pages/Search/Search" },
  { path: "/503", component: "@/pages/Errors/BadServe" },
  { path: "/404", component: "@/pages/Errors/NotFound" },
  { path: "/*", redirect: "/404" },
];

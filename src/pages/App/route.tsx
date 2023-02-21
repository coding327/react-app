export const AppRoutes = [
  {
    path: "/app",
    components: "@/pages/App/App",
    routes: [
      { path: "/app/", redirect: "/app/home" },
      { path: "/app/home", component: "@/pages/App/Home" },
      { path: "/app/mine", component: "@/pages/App/Mine" },
      { path: "/app/classify", component: "@/pages/App/Classify" },
      { path: "/app/find", component: "@/pages/App/Find" },
    ],
  },
];

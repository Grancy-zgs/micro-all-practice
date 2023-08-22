import { createLifecyle, getMicroApp } from "vite-plugin-legacy-qiankun";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import pkg from "../../package.json"; // your micro app name (pkg.name)

const microApp = getMicroApp(pkg.name);

const router = createRouter({
  history: createWebHistory(microApp.__POWERED_BY_QIANKUN__ ? pkg.name : "/"),
  routes: [
    {
      path: "/",
      redirect: "/vite-test-plugin/home",
    },
    {
      path: "/vite-test-plugin/home",
      name: "Home",
      component: () =>
        import(/* webpackChunkName: "home" */ "../components/HelloWorld.vue"),
      meta: {
        title: "首页",
      },
    },
  ],
});

export default router;

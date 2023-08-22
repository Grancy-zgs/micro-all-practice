import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import { createRouter, createWebHashHistory } from "vue-router";
import { createPinia } from "pinia";
import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "Home",
      component: () =>
        import(/* webpackChunkName: "home" */ "./components/HelloWorld.vue"),
      meta: {
        title: "首页",
      },
    },
  ],
});
let app = null;
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  createApp(App).use(router).use(ElementPlus).use(createPinia()).mount("#app");
} else {
  renderWithQiankun({
    mount(props) {
      console.log("--mount");

      app = createApp(App);
      app
        .use(router)
        .use(ElementPlus)
        .use(createPinia())
        .mount(
          (props.container
            ? props.container.querySelector("#app")
            : document.getElementById("app")) as Element
        );
    },
    bootstrap() {
      console.log("--bootstrap");
    },
    update() {
      console.log("--update");
    },
    unmount() {
      console.log("--unmount");
      app?.unmount();
    },
  });
}

// createApp(App).mount("#app");

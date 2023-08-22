import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import pkg from "../package.json"; // your micro app name (pkg.name)
import { createLifecyle, getMicroApp } from "vite-plugin-legacy-qiankun";
import router from "./router/index";

const microApp = getMicroApp(pkg.name);

const render = () => {
  createApp(App).use(router).mount(`#App`);
};

// createApp(App).mount("#app");
if (microApp.__POWERED_BY_QIANKUN__) {
  createLifecyle(pkg.name, {
    mount(props) {
      console.log("mount", pkg.name);
      render();
    },
    bootstrap() {
      console.log("bootstrap", pkg.name);
    },
    unmount() {
      console.log("unmount", pkg.name);
    },
  });
} else {
  render();
}

import { createApp } from "vue";
import App from "./App.vue";
import { NavBar } from "vant";
import "./styles/index.scss";
import router from "./routers/index";
import "lib-flexible ";
import "./styles/icon/iconfont.css";
import "./styles/theme/theme.css";

createApp(App).use(NavBar).use(router).mount("#app");

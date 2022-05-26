import { createApp } from "vue";
import App from "./App.vue";
import { NavBar, Lazyload } from "vant";
import "./styles/index.scss";
import router from "./routers/index";
import "lib-flexible ";
import "./styles/icon/iconfont.css";
import "./styles/theme/theme.css";
import { createPinia } from "pinia";

const app = createApp(App);

const pinia = createPinia();

app.use(NavBar).use(Lazyload, { lazyComponent: true }).use(router).use(pinia);

app.mount("#app");

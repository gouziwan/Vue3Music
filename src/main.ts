import { createApp } from "vue";
import App from "./App.vue";
import "./styles/index.scss";
import router from "./routers/index";
import "lib-flexible ";
import "./styles/icon/iconfont.css";
import "./styles/theme/theme.css";
import { createPinia } from "pinia";

import useComponent from "./use/index";
import { banDoubleClick } from "./utils";

const app = createApp(App);

const pinia = createPinia();

app.use(useComponent).use(router).use(pinia);

app.mount("#app");

banDoubleClick();

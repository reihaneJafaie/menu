import "./assets/index.css";
import "./assets/base.css";
import axios from "axios";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import '@fortawesome/fontawesome-free/css/all.css';
import "mosha-vue-toastify/dist/style.css";
import swal from "sweetalert";
import { createI18n } from "vue-i18n";
import fa from "./locales/fa.json";
import en from "./locales/en.json";
const app = createApp(App);
axios.defaults.baseURL = "https://api.vira4.com/api/v1";


const i18n = createI18n({
  legacy: false, // برای استفاده از Composition API
  globalInjection: true,
  locale: "fa", // زبان پیش‌فرض
  messages: {
    fa,
    en,
  },
});
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 500) {
      localStorage.removeItem("token");
      router.push("/login");
    }
    return Promise.reject(error);
  }
);
app.config.globalProperties.swal = swal;
app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount("#app");

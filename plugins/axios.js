import axios from "axios";
import { useAuthStore } from "@/stores/auth.js";
import { useCookie, useRouter } from "#imports";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/"; // Default base URL

axios.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (!config.headers) config.headers = {};
    if (!config.headers.Authorization) {
      config.headers.Authorization = "Bearer " + authStore.user?.Token;
    }
    config.headers["CLIENT-ID"] = import.meta.env.VITE_API_CLIENTID;
    config.headers["Client-Secret"] = import.meta.env.VITE_API_ClientSecret;
    config.headers["USER-TIMEZONE"] =
      Intl.DateTimeFormat().resolvedOptions().timeZone;
    config.headers["lang"] = useCookie("preferred-language").value || "ar";

    if (import.meta.env.VITE_API_IsOnPremise?.toLowerCase() === "false") {
      const url = window.location.href.replace(/^(.*:\/\/)?/, "").split(".");
      if (url.length) config.headers["Tenant"] = url[0];
    }
    return config;
  },
  (error) => Promise.reject(error)
);
let originalRequest = {};
originalRequest._retry = false;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore();
    const user = authStore.user;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (originalRequest._retry) return Promise.reject(error);
      originalRequest._retry = true;
      return axios
        .post(
          "Auth/GetAccessTokenUsingRefreshToken",
          {
            OldAccessToken: user?.Token,
            RefreshToken: user?.RefreshToken,
          },
          {
            headers: {
              Authorization: "Bearer " + user?.Token,
              "accept-language": useCookie("preferred-language").value || "ar",
              "CLIENT-ID": import.meta.env.VITE_API_CLIENTID,
              "Client-Secret": import.meta.env.VITE_API_ClientSecret,
            },
          }
        )
        .then((res) => {
          originalRequest._retry = false;
          if (res.status === 200 && res.data?.Data) {
            authStore.updateUser(res.data.Data);
            originalRequest.headers.Authorization =
              "Bearer " + res.data.Data.Token;
            return instance(originalRequest); // Avoid global axios
          }
        })
        .catch((err) => {
          originalRequest._retry = false;
          const router = useRouter();
          authStore.updateUser(null);
          router.push(
            `/${
              useCookie("preferred-language").value
                ? useCookie("preferred-language").value
                : "ar"
            }/Home`
          );
          return Promise.reject(err);
        });
    }
    return Promise.reject(error);
  }
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide("axios", axios);
});

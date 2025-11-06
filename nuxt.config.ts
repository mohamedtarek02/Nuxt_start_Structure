// nuxt.config.ts
import { resolve } from "path";

export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_helpers.scss" as *;',
        },
      },
    },
  },
  app: {
    head: {
      title: "Website Title",
      link: [{ rel: "icon", type: "image/svg", href: "/favicon.svg" }],
    },
  },

  modules: ["@nuxtjs/i18n", "nuxt-aos", "nuxt-swiper"],

  router: {
    middleware: ["redirectToLocale"],
  },

  nitro: {
    server: {
      port: 8080,
      host: "0.0.0.0", // Optional: Use to make your server accessible over the network
    },
  },

  i18n: {
    langDir: "locales",
    defaultLocale: "en", //Default if user not picked language yet
    strategy: "prefix",
    locales: [
      {
        code: "en",
        file: "en.json",
      },
      {
        code: "ar",
        file: "ar.json",
      },
    ],
    detectBrowserLanguage: false,
  },

  build: {
    transpile: ["vuetify"],
  },

  components: true,

  plugins: [
    "@/plugins/axios.js",
    "@/plugins/pinia.js",
    "@/plugins/notification.js",
    "@/plugins/fontawesome.js",
  ],

  // Define alias inside the `vite` property
  vite: {
    resolve: {
      alias: {
        "@": resolve(__dirname), // This resolves `@` to the root of your project
      },
    },
    // plugins: [
    //   require("@intlify/unplugin-vue-i18n").vite({
    //     include: [resolve(__dirname, "locales/**")],
    //   }),
    // ],
  },

  css: [
    "vuetify/dist/vuetify.min.css",
    "@/assets/css/main.css",
    "@/assets/scss/style.scss",
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: "2024-12-19",
});

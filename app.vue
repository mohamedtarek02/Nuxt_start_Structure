<script setup>
import { watch } from "vue";
import "aos/dist/aos.css";

// set language initially
import { useI18n, useCookie, useHead } from "#imports";
const { setLocale, defaultLocale } = useI18n({ useScope: "global" });

// get language from cookies if exist
const savedLanguage = useCookie("preferred-language");

// Assign default language to cookies if no language picked
if (!savedLanguage.value) savedLanguage.value = defaultLocale;

setLocale(savedLanguage.value);

// Change language direction for Dom header
useHead({
  htmlAttrs: {
    dir: savedLanguage.value == "en" ? "ltr" : "rtl",
    lang: savedLanguage.value == "en" ? "en" : "ar",
  },
});

// Set website tab title
const route = useRoute();

watch(
  route,
  () => {
    const pageTitle = route.meta.title;
    useHead({
      titleTemplate: (projectTitle) =>
        pageTitle ? `${projectTitle} - ${pageTitle}` : title,
    });
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <notifications
      classes="v-notification"
      pauseOnHover
      dangerouslySetInnerHtml
      duration="1"
      position="bottom right"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

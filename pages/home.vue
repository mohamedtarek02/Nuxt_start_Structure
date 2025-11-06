<script setup>
definePageMeta({
  title: "Home",
  layout: "home",
});

import { useI18n } from "#imports";
const { t } = useI18n({ useScope: "global" });
import axios from "axios";

const cards = [
  {
    title: t("LatestContentTitle"),
    description: t("LatestContentDesc"),
    linkCaption: t("LatestContentLink"),
    linkPath: "new-feeds",
    icon: "newspaper",
  },

  {
    title: t("ConnectWithOthersTitle"),
    description: t("ConnectWithOthersDesc"),
    linkCaption: t("CommingSoon"),
    linkPath: "#",
    icon: "comments",
  },
  {
    title: t("JoinDiscussionsTitle"),
    description: t("JoinDiscussionsDesc"),
    linkCaption: t("CommingSoon"),
    linkPath: "#",
    icon: "comments",
  },
];

const {
  data: deviceInfo,
  status: devicesStatus,
  refresh,
} = useAsyncData(
  "device-info-data",
  async () => {
    try {
      const { data } = await axios.get(`users`);
      return data.Data;
    } catch (err) {
      console.error(err);
    }
  },
  {
    server: false,
  }
);
</script>

<template>
  <main class="container py-8">
    <!-- Header -->
    <div class="text-center mb-16">
      <h1 class="text-5xl font-bold text-primary-500">
        {{ $t("WelcomeHeader") }}
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        {{ $t("WelcomeDescription") }}
      </p>
      <NuxtLink :to="localePath({ name: 'new-feeds' })">
        <BaseButton class="flex mx-auto gap-2 items-center">
          <span>{{ $t("ExploreFeeds") }}</span>
          <FontAwesomeIcon icon="fars fa-square-up-right" class="w-5 h-5" />
        </BaseButton>
      </NuxtLink>
    </div>

    <!-- Feature Cards  -->
    <div
      class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 justify-center"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <HomeCard
        v-for="(card, index) in cards"
        :key="index"
        :icon="card.icon"
        :title="card.title"
        :description="card.description"
        :linkCaption="card.linkCaption"
        :linkPath="card.linkPath"
      />
    </div>
  </main>
</template>

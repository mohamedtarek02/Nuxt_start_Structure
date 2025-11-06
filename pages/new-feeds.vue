<script setup>
import axios from "axios";

definePageMeta({
  title: "New Feeds",
  layout: "home",
});

const { data: posts, status: postsStatus } = useAsyncData(
  "device-info-data",
  async () => {
    try {
      const { data } = await axios.get(`users`);
      return data;
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
  <main class="container py-4">
    <h2>{{ $t("LatestContentTitle") }}</h2>
    <!-- Search Posts -->
    <FeedsSearch class="mb-4" @search="searchHandler" />
    <!-- Posts List -->
    {{ fetchedPosts }}
    <FeedsPost
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.name"
      :description="post.website"
      createdAt="2025-02-14T10:23:00Z"
    />

    <BaseLoader v-if="postsStatus === 'pending'" />
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Post Details",
  layout: "default",
});

const route = useRoute();
import { formatDate } from "@/utils/formatDate";
</script>

<template>
  <div class="container">
    <h2 class="text-2xl text-[#181D27] mt-[25px] text-center">
      {{ $t("PostDetails") }}
    </h2>
    <h6
      v-if="route.query.createdAt"
      class="text-center text-gray-400 text-sm font-normal"
    >
      {{ formatDate(route.query.createdAt) }}
    </h6>

    <div class="bg-[#F5F5F5] p-8 w-50 mt-8 rounded-lg mx-auto">
      <p class="text-[30px] text-black text-center border-b pb-3">
        {{ route.query.title }}
      </p>
      <span class="text-[20px] text-black text-center block mt-3 b-3">
        {{ route.query.description }}
      </span>
    </div>
    <div class="mt-4">
      <NuxtLink :to="localePath({ name: 'new-feeds' })">
        <BaseButton class="flex mx-auto gap-2 items-center">
          <FontAwesomeIcon icon="far fa-arrow-left" class="w-5 h-5" />
          <span>{{ $t("BackToFeeds") }}</span>
        </BaseButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from "@/utils/formatDate";

defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <NuxtLink
    :to="
      localePath({
        name: 'post-details',
        query: { title, description, createdAt },
      })
    "
  >
    <v-card
      class="rounded-xl shadow-md border border-gray-100 group cursor-pointer w-full mb-7 transition hover:bg-[#F5F5F5] hover:shadow-lg"
    >
      <div class="flex flex-col items-start space-y-4 p-4">
        <h2 class="text-[30px] font-semibold">{{ title }}</h2>
        <!-- Description -->
        <p class="text-gray-500">
          {{ description }}
        </p>
        <!-- createdAt -->
        <div class="flex items-center gap-2">
          <FontAwesomeIcon icon="far fa-calendar" class="w-4 h-4" />
          <span class="text-gray-400">
            {{ formatDate(createdAt) }}
          </span>
        </div>
      </div>
    </v-card>
  </NuxtLink>
</template>

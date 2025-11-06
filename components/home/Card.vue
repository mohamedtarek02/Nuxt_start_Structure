<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  linkPath: {
    type: String,
    required: true,
  },
  linkCaption: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <v-card
    class="rounded-xl shadow-md border border-gray-100 group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
  >
    <div class="flex flex-col items-start space-y-4 p-4">
      <!-- Icon Circle -->
      <div
        class="bg-blue-100 rounded-full p-3 transition-colors duration-300 group-hover:bg-blue-200"
      >
        <FontAwesomeIcon :icon="`far fa-${icon}`" class="w-5 h-5" />
      </div>
      <!-- Title -->
      <h2 class="text-lg font-semibold">{{ title }}</h2>
      <!-- Description -->
      <p class="text-gray-500">
        {{ description }}
      </p>
      <!-- Link -->
      <NuxtLink
        :to="localePath({ name: linkPath })"
        class="text-blue-500 font-medium flex items-center hover:underline transition-colors gap-2"
      >
        {{ linkCaption }}
        <FontAwesomeIcon icon="far fa-arrow-right" class="w-5 h-5" />
      </NuxtLink>
    </div>
  </v-card>
</template>

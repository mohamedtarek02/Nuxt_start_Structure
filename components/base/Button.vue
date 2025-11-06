<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
  },
  type: {
    type: String,
    default: "button",
  },
  caption: String,
  fullWidth: {
    type: Boolean,
    default: false,
  },
  isLoading: Boolean,
  disabled: Boolean,
});

const buttonStyle = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-primary-500 hover:bg-[#130963] text-white rounded-[8px] px-[18px] py-[10px]";
    case "white":
      return "bg-white text-black rounded-[8px] px-[18px] py-[10px]";
  }
});
</script>

<template>
  <button
    :class="[
      buttonStyle,
      { 'w-full': fullWidth },
      'inline-flex justify-center gap-3 rounded transition duration-500 ease-in-out disabled:opacity-50',
    ]"
    :type="type"
    :disabled="disabled || isLoading"
  >
    <v-progress-circular v-if="isLoading" indeterminate :size="24" :width="2" />
    <slot>{{ caption }}</slot>
  </button>
</template>

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
});

const buttonStyle = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-primary-500 hover:bg-[#130963] text-white rounded-[8px] px-[18px] py-[10px]";
  }
});
</script>

<template>
  <button :class="[buttonStyle, { 'w-full': fullWidth }]" :type="type">
    <slot>{{ caption }}</slot>
  </button>
</template>

<script setup>
import { toRef, inject, ref } from "vue";

import { useField } from "vee-validate";
// https://vee-validate.logaretm.com/v4/examples/ui-libraries/
let props = defineProps({
  name: {
    type: String,
    requird: true,
  },
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
  },
  readonly: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
  hideDetails: {
    type: Boolean,
  },
  counter: {
    type: String,
  },
  inputDir: {
    type: String,
  },
  required: {
    type: Boolean,
  },
  rules: {
    type: Object,
  },
  placeHolder: {
    type: String,
    default: "",
  },
  whiteLabel: {
    type: Boolean,
  },
  hint: String,
  castToNumber: Boolean,
  icon: {
    type: String,
    requird: false,
  },
});

const emit = defineEmits("update:modelValue");

let showError = ref(true);
const { value, handleBlur, errors, setErrors } = useField(
  toRef(props, "name"),
  props.rules,
  {
    validateOnValueUpdate: true,
  }
);

function clearErrors() {
  setErrors([]);
}

function handleInput() {
  clearErrors();
  if (
    props.type == "number" &&
    props.counter &&
    value.value.length > props.counter
  ) {
    value.value = value.value.slice(0, props.counter);
  }

  if (props.type == "number" && props.castToNumber) {
    value.value = value.value ? Number(value.value) ?? "" : "";
  }
  emit("update:modelValue", value.value);
}

const showPassword = ref(false);

function blurCustomHandler() {
  showError.value = true;

  handleBlur();
}
</script>

<template>
  <div data-flag="parent">
    <div class="flex gap-5 items-center mb-1.5">
      <label
        :for="label"
        :class="[
          'text-[14px] leading-[20px] text-[#414651] font-medium',
          { 'required-field': required, 'text-white': whiteLabel },
        ]"
        >{{ label }}</label
      >
      <span v-if="hint" class="text-dark">
        <FontAwesomeIcon :icon="['fal', 'fa-circle-info']" />
        <v-tooltip
          activator="parent"
          location="top"
          offset="0"
          content-class="white-tooltip"
          >{{ hint }}</v-tooltip
        >
      </span>
    </div>
    <v-text-field
      :disabled="disabled"
      class=""
      v-model="value"
      @blur="blurCustomHandler"
      @focus="showError = false"
      :id="label"
      :error-messages="showError ? errors : []"
      :type="showPassword ? 'text' : type"
      variant="outlined"
      :readonly="readonly"
      :hideDetails="hideDetails"
      :counter="counter"
      autocomplete="null"
      :maxlength="counter"
      @input="
        if (type == 'number' && Number(this.value) > Number(this.counter))
          this.value = this.counter;
      "
      @update:modelValue="handleInput()"
      :dir="inputDir"
      :placeholder="placeHolder"
    >
      <template #prepend-inner v-if="icon">
        <FontAwesomeIcon :icon="`far fa-${icon}`" class="w-4 h-4" />
      </template>
      <template
        v-slot:append-inner
        v-if="type?.toLocaleLowerCase() === 'password'"
      >
        <button
          type="button"
          class="w-6 h-6"
          @click="showPassword = !showPassword"
        >
          <FontAwesomeIcon
            class="cursor-pointer"
            :icon="`far ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`"
          />
        </button>
      </template>
    </v-text-field>
  </div>
</template>

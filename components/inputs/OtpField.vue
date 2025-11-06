<script setup>
import { ref, defineProps, toRef } from "vue";
import { useField } from "vee-validate";
let props = defineProps({
  name: {
    type: String,
    requird: true,
  },
});
let { value, errors } = useField(toRef(props, "name"), undefined, {
  validateOnValueUpdate: false,
});
// OTP inputs
const todos = ref([]);

const inputsRef = ref(null);

function setCurrentValue() {
  value.value = todos.value.join("");
}

function handleInput(event, index) {
  const numRegex = /^\d+$/;
  todos.value[index] = "";
  if (!event?.data?.length || !numRegex.test(event.data)) {
    todos.value[index] = "";
    return;
  }
  todos.value[index] = event?.data[0];
  setCurrentValue();
  if (index < 3) event.target?.nextSibling?.focus();
}

function getBack(event, index) {
  todos.value[index] = "";
  setCurrentValue();
  if (index > 0) {
    event.target?.previousSibling?.focus();
  }
}
</script>

<template>
  <div>
    <!-- begin::OTP inputs -->
    <div class="flex flex-row-reverse gap-4" dir="rtl">
      <input
        v-for="index in 4"
        :key="index"
        ref="inputsRef"
        type="text"
        v-model="todos[index - 1]"
        @input="handleInput($event, index - 1)"
        @keydown.prevent.delete="getBack($event, index - 1)"
        class="bg-white"
      />
    </div>
    <p class="pt-4 form__error" v-if="errors.length">
      {{ errors[0] }}
    </p>
    <!-- end::OTP inputs -->
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/helpers" as *;

input {
  border: 1px solid #c4c9cd;
  border-radius: 8px;
  width: 57px;
  height: 52px;
  gap: 13px;
  text-align: center;
  color: transparent;
  text-shadow: 0 0 0 black;
  font-size: 1.875rem;
  background-color: white;
  user-select: none;
  caret-color: transparent;
  &:focus {
    outline: none;
    border-color: #3e2cc7 !important;
  }
  &::selection {
    color: #3e2cc7;
    background: #f5f5f5;
    user-select: none;
  }
  @include respond-below(lg) {
    width: 3rem;
    height: 3rem;
  }
}
</style>

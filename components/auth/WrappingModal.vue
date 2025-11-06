<script>
// import Icon from '@/components/Icon.vue';
export default {
  name: "AppModal",
  // components: { Icon },
  props: {
    modelValue: {
      type: Boolean,
    },
    required: true,
    title: {
      type: String,
      // required: true,
    },
    size: {
      type: String,
      default: "sm",
    },
    location: {
      type: String,
      default: "center",
    },
  },
  computed: {
    currentValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
    classObject() {
      return `app-dialog__content--${this.size}`;
    },
    appLocation() {
      return `app-dialog--${this.location}`;
    },
  },
};
</script>

<template>
  <v-dialog :class="[appLocation, 'app-dialog']" v-model="currentValue">
    <div class="relative" :class="[classObject, 'app-dialog__content']">
      <div class="absolute top-0 right-0 p-8">
        <button
          class="modal-dialog__close"
          @click="(currentValue = false), $emit('close')"
        >
          <FontAwesomeIcon
            icon="fas fa-xmark"
            class="w-5 h-5 text-gray-600 hover:text-gray-800"
          />
        </button>
      </div>
      <div class="app-dialog__body text-center">
        <slot></slot>
      </div>
    </div>
  </v-dialog>
</template>

<style lang="scss" scoped>
.v-dialog > .v-overlay__content {
  overflow: auto !important;
  height: 100% !important;
  max-height: 100% !important;
  margin: 0px !important;
  width: 100% !important;
  max-width: unset !important;
  padding-top: 2rem;
  padding-bottom: 2rem;

  &::-webkit-scrollbar-track {
    background-color: #d9d9d9;
    border-radius: 50px;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #1d275a;
    outline: 1px solid #1d275a;
    border-radius: 50px;
  }
}
.app-dialog {
  &__content {
    border-radius: 10px;
    border: 2px solid rgba(152, 166, 175, 0.2);
    box-shadow: 0 0 99px 0 rgb(0 0 0 / 10%);
    background-color: #fff;
    margin: auto;

    background-image: url("@/assets/images/background/forget-password.png");
    background-position: center 2px;

    &--xl {
      max-width: var(--xl-dialog);
      width: 100%;
    }

    &--lg {
      max-width: var(--large-dialog);
      width: 100%;
    }
    &--md-lg {
      max-width: var(--between-medium-large-dialog);
      width: 100%;
    }

    &--md {
      max-width: var(--medium-dialog);
      width: 100%;
    }

    &--sm {
      max-width: var(--small-dialog);
      width: 100%;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // border-bottom: 1px solid #d2d9df;
    /*            padding-bottom: 1rem;*/
    /*            margin-bottom: 1rem;*/
    padding: 1rem 1.5rem;

    h3 {
      font-size: 1.125rem;
    }
  }

  &__body {
    //max-height: calc(100vh - 130px);
    padding: 1.5rem;
  }
}

.app-dialog__body::-webkit-scrollbar-track {
  background-color: #d9d9d9;
  border-radius: 50px;
}

.app-dialog__body::-webkit-scrollbar {
  width: 5px;
}

.app-dialog__body::-webkit-scrollbar-thumb {
  background-color: #1d275a;
  outline: 1px solid #1d275a;
  border-radius: 50px;
}

.modal-dialog__close {
  padding: 0.5rem 0.5rem;
  display: inline-flex;
  margin-top: -0.5rem;
  margin-bottom: -0.5rem;
}

.app-dialog--top .v-overlay__content {
  top: 0;
}
</style>

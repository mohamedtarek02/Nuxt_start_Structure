<script setup>
import { ref, defineEmits, computed, inject } from "vue";
import * as yup from "yup";
import { Form } from "vee-validate";
import { useRouter, useCookie } from "#imports";

import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();

import notifyUser from "@/utils/notifyUser";
import setUserAuth from "@/utils/setUserAuth";

import { useI18n } from "#imports";
const { t, locale } = useI18n({ useScope: "global" });

const router = useRouter();

const props = defineProps({
  showLoginModal: {
    type: Boolean,
    rquired: true,
  },
});

const emit = defineEmits(["update:showLoginModal"]);

const isShowingLoginModal = computed({
  get: () => props.showLoginModal,
  set: (value) => emit("update:showLoginModal", value),
});

const schema = yup.object({
  email: yup.string().required().label(t("Email")),
  password: yup.string().required().label(t("Password")),
});

const isLoading = ref(false);
const savedLanguage = useCookie("preferred-language");

function login(userCredential) {
  if (isLoading.value) return;
  isLoading.value = true;

  setTimeout(() => {
    notifyUser("Logged in successfully");
    setUserAuth({
      email: userCredential.email,
      username: "Demo User",
    });
    isShowingLoginModal.value = false;
    isLoading.value = false;
  }, 2000);
}

const showResetPasswordModal = ref(false);
function forgetPasswordHandler() {
  isShowingLoginModal.value = false;
  showResetPasswordModal.value = true;
}
</script>

<template>
  <AuthWrappingModal
    v-model="isShowingLoginModal"
    :title="$t('Login')"
    location="center"
  >
    <div class="login-modal">
      <!-- Email verification -->
      <div class="parent">
        <Form
          @submit="login"
          :validation-schema="schema"
          class="flex flex-col w-full"
        >
          <header class="w-full">
            <div class="icon-con">
              <FontAwesomeIcon icon="far fa-user" class="w-4 h-4" />
            </div>
            <h3
              class="text-[#181D27] font-semibold text-[24px] leading-[32px] mb-1"
            >
              {{ $t("LoginToYourAccount") }}
            </h3>
          </header>

          <section>
            <InputsTextField
              :label="$t('Email')"
              name="email"
              required
              placeHolder="youremail@mail.com"
              class="mb-5"
              icon="envelope"
            />
            <InputsTextField
              :label="$t('Password')"
              name="password"
              type="password"
              icon="hand"
              required
            />
          </section>

          <footer>
            <div class="flex justify-end mb-6">
              <button
                type="button"
                @click="forgetPasswordHandler"
                class="block !text-primary-700 font-semibold text-[14px] leading-[20px]"
              >
                {{ $t("ForgetPassword") }}
              </button>
            </div>
            <BaseButton
              fullWidth
              type="submit"
              class="text-center pt-3 rounded-[8px]"
              variant="primary"
              :isLoading="isLoading"
            >
              {{ $t("Login") }}
            </BaseButton>
          </footer>
        </Form>
      </div>
    </div>
  </AuthWrappingModal>

  <AuthResetPassword
    v-model:showResetPasswordModal="showResetPasswordModal"
    @close="showResetPasswordModal = false"
  />
</template>

<style lang="scss" scoped>
.login-modal {
  .parent {
    display: flex;
    flex-direction: column;
    align-items: center;

    header {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;

      .icon-con {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: #b9c9e8;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #17479d;
        margin-bottom: 16px;
        svg {
          width: 20px;
          height: 16px;
        }
      }
    }

    section {
      width: 100%;
      margin-bottom: 20px;
      text-align: left;
      p.error {
        color: #b00020;
        font-size: 13px;
        margin-top: 1px;
      }
    }

    footer {
      width: 100%;
    }
  }
}
</style>

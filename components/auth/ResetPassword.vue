<script setup>
import { ref, defineProps, defineEmits, computed, inject } from "vue";
import * as yup from "yup";
import { Form } from "vee-validate";
import axios from "axios";
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });

import notifyUser from "@/utils/notifyUser";

const props = defineProps({
  showResetPasswordModal: {
    type: Boolean,
    rquired: true,
  },
});

const emit = defineEmits(["update:showResetPasswordModal"]);

const isShowConfirmation = computed({
  get: () => props.showResetPasswordModal,
  set: (value) => emit("update:showResetPasswordModal", value),
});

const formStep = ref("emailVerification");

// Email verification
const emailVerificationButtonLoading = ref(false);
const emailVerificationError = ref("");
const insertedEmail = ref("");
const emailVerificationSchema = yup.object({
  Email: yup.string().email().required().label("Email"),
});
function emailVerificationHandler({ Email }) {
  emailVerificationButtonLoading.value = true;

  setTimeout(() => {
    formStep.value = "otpVerification";
    insertedEmail.value = Email;
    emailVerificationError.value = null;
    emailVerificationButtonLoading.value = false;
  }, 2000);
}

// OTP verification
const otpVerificationButtonLoading = ref(false);
const disableResendOtp = ref(false);

const otpVerificationError = ref("");
const insertedOtp = ref("");
function otpVerificationHandler({ Otp }) {
  otpVerificationButtonLoading.value = true;
  disableResendOtp.value = true;

  setTimeout(() => {
    formStep.value = "resetPassword";
    insertedOtp.value = Otp;
    otpVerificationButtonLoading.value = false;
    disableResendOtp.value = false;
  }, 2000);
}

function resendOtpHandler() {
  console.log("OTP resent");
  notifyUser(t("OtpSentSuccessfully"), "success");
}

// Reset password
const restPasswordSchema = yup.object({
  NewPassword: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,}$/,
      t("PasswordCriteria")
    )
    .label(t("Password")),
  ReEnterNewPassword: yup
    .string()
    .required()
    .label(t("PasswordConfirmation"))
    .oneOf([yup.ref("NewPassword")], t("PasswordsMustMatch")),
});

const passwordButtonLoading = ref(false);
const passwordError = ref("");
function resetPasswordHandler({ NewPassword }) {
  passwordButtonLoading.value = true;

  setTimeout(() => {
    notifyUser(t("PasswordChangedSuccessfully"), "success");
    isShowConfirmation.value = false;
    resetSteps();
    passwordButtonLoading.value = false;
  }, 2000);
}

function resetSteps() {
  formStep.value = "emailVerification";
  insertedEmail.value = "";
  insertedOtp.value = "";
}
</script>

<template>
  <section>
    <AuthWrappingModal
      v-model="isShowConfirmation"
      location="center"
      size="sm"
      @close="$emit('close'), (isShowConfirmation = false), resetSteps()"
    >
      <div class="reset-password-modal">
        <!-- Email verification -->
        <div class="parent" v-if="formStep === 'emailVerification'">
          <Form
            @submit="emailVerificationHandler"
            :validation-schema="emailVerificationSchema"
            class="w-full"
          >
            <header>
              <div class="icon-con">
                <FontAwesomeIcon icon="far fa-envelope" class="w-6 h-6" />
              </div>
              <h2>{{ $t("ForgetYourPassword") }}</h2>
              <p>{{ $t("EnterEmailAssociated") }}</p>
            </header>

            <section>
              <InputsTextField
                :label="$t('Email')"
                name="Email"
                placeHolder="youremail@mail.com"
                icon="envelope"
                required
              />
              <p class="error" v-if="emailVerificationError">
                {{ emailVerificationError }}
              </p>
            </section>

            <footer>
              <BaseButton
                fullWidth
                type="submit"
                variant="primary"
                :isLoading="emailVerificationButtonLoading"
              >
                {{ $t("SentOtp") }}
              </BaseButton>
            </footer>
          </Form>
        </div>

        <!-- OTP verification -->
        <div class="parent" v-if="formStep === 'otpVerification'">
          <Form @submit="otpVerificationHandler" v-slot="{ values }">
            <header>
              <div class="icon-con">
                <FontAwesomeIcon icon="far fa-envelope" class="w-4 h-4" />
              </div>
              <h2>{{ $t("OTPVerification") }}</h2>
              <p>{{ $t("OtpDetails") }}</p>
            </header>

            <section class="flex flex-col items-center">
              <InputsOtpField name="Otp" />
              <p class="mt-4 text-[14px] text-[#535862]">
                {{ $t("DidNotGetCode") }}
                <BaseButton
                  variant="flat"
                  class="underline cursor-pointer"
                  @click="resendOtpHandler"
                  :disabled="disableResendOtp"
                  >{{ $t("ResendCode") }}
                </BaseButton>
              </p>
              <p v-if="otpVerificationError" class="error">
                {{ otpVerificationError }}
              </p>
            </section>

            <footer>
              <BaseButton
                fullWidth
                type="submit"
                variant="primary"
                :isLoading="otpVerificationButtonLoading"
                :disabled="values?.Otp?.length !== 4 || !values?.Otp"
              >
                {{ $t("Verify") }}
              </BaseButton>
            </footer>
          </Form>
        </div>

        <!-- Reset password -->
        <div class="parent" v-if="formStep === 'resetPassword'">
          <Form
            @submit="resetPasswordHandler"
            :validation-schema="restPasswordSchema"
            v-slot="{ errors }"
            class="w-100"
          >
            <header>
              <div class="icon-con">
                <FontAwesomeIcon icon="far fa-envelope" />
              </div>
              <h2>
                {{ $t("ResetPassword") }}
              </h2>
              <p>
                {{ $t("Enteryournewpasswordtwicebelowtoresetanewpassword") }}
              </p>
            </header>

            <section>
              <InputsTextField
                :label="$t('EnterNewPassword')"
                name="NewPassword"
                type="password"
                class="mb-5"
                icon="hand"
                required
              />
              <InputsTextField
                :label="$t('ReEnterNewPassword')"
                name="ReEnterNewPassword"
                type="password"
                class="mb-5"
                icon="hand"
                required
              />
              <p class="error" v-if="passwordError">
                {{ passwordError }}
              </p>
            </section>

            <footer>
              <BaseButton
                fullWidth
                type="submit"
                variant="primary"
                :isLoading="passwordButtonLoading"
              >
                {{ $t("ResetPassword") }}
              </BaseButton>
            </footer>
          </Form>
        </div>
      </div>
    </AuthWrappingModal>
  </section>
</template>

<style lang="scss" scoped>
.reset-password-modal {
  .parent {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

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

      h2 {
        font-size: 18px;
        font-weight: 600;
        line-height: 28px;
        margin-bottom: 4px;
        color: #181d27;
      }

      p {
        font-size: 14px;
        line-height: 20px;
        color: #535862;
      }
    }

    section {
      width: 100%;
      margin-bottom: 24px;
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

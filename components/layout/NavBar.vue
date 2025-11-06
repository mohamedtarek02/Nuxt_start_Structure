<script setup lang="ts">
import websiteLogo from "@/assets/images/logos/website-logo.svg";
import saudiFlag from "@/assets/images/logos/saudi-flag.svg";
import unitedkingdomFlag from "@/assets/images/logos/united-kingdom-flag.svg";

const { t, locale } = useI18n({ useScope: "global" });
const route = useRoute();

// store
import { useAuthStore } from "@/stores/auth.js";
const authStore = useAuthStore();

// Detecting active section and changing navbar depending on scrolling
const isScrolled = ref(false);
onMounted(() => {
  isScrolled.value = window.scrollY > 50;
});

interface Section {
  url: string;
  name: string;
}
const sections: Section[] = [
  { url: "home", name: t("Home") },
  { url: "new-feeds", name: t("NewFeeds") },
];

// Language handling
const pickedLanguage = useCookie("preferred-language");
function changeLanguage() {
  pickedLanguage.value = pickedLanguage.value === "ar" ? "en" : "ar";

  const toRoute = route.path.includes("/ar/")
    ? route.path.replace("/ar/", "/en/")
    : route.path.replace("/en/", "/ar/");

  location.pathname = toRoute;
}

// Login handling
const showLoginModal = ref(false);

function logout() {
  authStore.logout();
  notifyUser("logged out", "success");
}

const openUserProfile = ref(false);
</script>

<template>
  <nav>
    <div class="container nav-container">
      <div class="nav-links">
        <div class="img-con">
          <img
            :src="websiteLogo"
            alt="logo"
            @click="$router.push(`/${locale}/home`)"
          />
        </div>
        <div class="router-links">
          <ul>
            <!-- Links -->
            <li v-for="section in sections" :key="section.id">
              <NuxtLink :to="localePath({ name: section.url })">
                <span class="text-white">
                  {{ $t(section.name) }}
                </span>
              </NuxtLink>
            </li>
            <!-- language -->
            <li class="lang" @click="changeLanguage">
              <div class="image-con">
                <img
                  :src="$i18n.locale === 'en' ? saudiFlag : unitedkingdomFlag"
                  alt="lang-icon"
                />
              </div>
              <span>
                {{ $i18n.locale === "en" ? "AR" : "EN" }}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <!-- Login -->
        <BaseButton
          v-if="!authStore.isAuthenticated"
          variant="white"
          @click="showLoginModal = true"
          class="px-2 py-2 md:px-[14px] md:py-[10px] text-sm md:text-base"
          >{{ $t("Login") }}</BaseButton
        >

        <!-- User profile -->
        <div class="user-info relative" v-if="authStore.isAuthenticated">
          <div
            class="cursor-pointer border border-[#E9EAEB] rounded-full"
            @click="openUserProfile = !openUserProfile"
            v-click-outside="() => (openUserProfile = false)"
          >
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center py-1.5 text-black text-md font-medium bg-white"
            >
              {{ authStore.firstUserLetters }}
            </div>
          </div>
          <ul
            v-if="openUserProfile"
            class="w-[248px] shadow-[0px_12px_16px_-4px_#0A0D1214] border border-[#E9EAEB] absolute ltr:left-[-210px] rtl:right-[-210px] top-[calc(100%+10px)] z-[999] opacity-1 visible transition-all bg-[#fff] rounded-lg flex flex-col"
          >
            <li
              class="w-full flex items-center gap-3 border-b border-[#E9EAEB] px-4 py-3"
            >
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center text-white text-md font-semibold bg-black"
              >
                {{ authStore?.firstUserLetters }}
              </div>
              <div>
                <p class="text-md font-semibold text-[#414651]">
                  {{ authStore.user?.username }}
                </p>
                <p class="text-md font-semibold text-[#414651]">
                  {{ authStore.user?.email }}
                </p>
              </div>
            </li>

            <li v-if="authStore.isAuthenticated">
              <button
                class="flex items-center !justify-start w-full gap-2 py-1.5 px-2.5 my-px mx-1.5 !text-base font-semibold cursor-pointer"
                @click="logout"
              >
                <span class="w-4 h-4">
                  <svg
                    class="svg-inline--fa fa-arrow-right-from-bracket text-[16px] text-danger-600"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fal"
                    data-icon="arrow-right-from-bracket"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                  >
                    <path
                      d="M507.3 267.3c6.2-6.2 6.2-16.4 0-22.6l-128-128c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L457.4 240 176 240c-8.8 0-16 7.2-16 16s7.2 16 16 16l281.4 0L356.7 372.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l128-128zM176 64c8.8 0 16-7.2 16-16s-7.2-16-16-16L80 32C35.8 32 0 67.8 0 112L0 400c0 44.2 35.8 80 80 80l96 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-96 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48l96 0z"
                    ></path>
                  </svg>
                </span>
                <span class="text-md font-semibold text-danger-600 leading-6">
                  Signout
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- begin::Login -->
    <AuthLogin
      v-model:showLoginModal="showLoginModal"
      @close="showLoginModal = false"
    />
  </nav>
</template>

<style lang="scss" scoped>
nav {
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0px 4px 6px -1px #0a0d120f;
  background-color: #181d27;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 17px 0;
  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    position: relative;
    padding-top: 17px;
    padding-bottom: 17px;

    .nav-links {
      display: flex;
      justify-content: center;
      gap: 16px;
      .img-con {
        width: 40px;
        height: 37px;
        cursor: pointer;
        margin-top: 6px;

        @media (max-width: 768px) {
          width: 100px;
          height: 32px;
          margin-top: 5px;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .router-links {
        ul {
          display: flex;
          gap: 16px;

          @media (max-width: 768px) {
            gap: 4px;
          }
          li {
            color: #181d27;
            font-weight: 500;
            white-space: nowrap;
            line-height: 28px;
            padding: 8px 7px;
            .router-link-active {
              span {
                cursor: pointer;
                &::after {
                  content: "";
                  background-color: white;
                  margin: 0 auto;
                  width: calc(100% - 11px);
                  height: 4px;
                  border-style: solid;
                  border-width: 0px;
                  border-radius: 200px 200px 0px 0px;
                  margin-top: 3px;
                  display: block;
                }
              }
            }
            &.lang {
              display: flex;
              padding-top: 2px;
              gap: 4px;
              align-items: center;
              cursor: pointer;
              .image-con {
                width: 26px;
                height: 20px;
                border-radius: 4px;
                cursor: pointer;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
              span {
                font-size: 14px;
                line-height: 20px;
                font-weight: 500;
                color: white;
              }
            }
          }
        }
      }
    }
  }
}
</style>

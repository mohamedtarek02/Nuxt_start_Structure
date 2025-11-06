import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

interface UserCredential {
  email: string;
  username: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: useStorage("auth", {} as UserCredential | any),
  }),

  getters: {
    isAuthenticated: () => useCookie("token").value,
    firstUserLetters: (state) => {
      if (!state.user || !useCookie("userName").value) return "";
      return state.user?.username
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase();
    },
  },

  actions: {
    updateUser(currentUser: UserCredential) {
      this.user = currentUser;
    },

    logout() {
      this.user = {};
      useCookie<boolean>("isLoggedIn").value = false;
      useCookie("userName").value = null;
      useCookie("token").value = null;
      useCookie("refreshToken").value = null;
    },
  },
});

// store
import { useAuthStore } from "@/stores/auth.js";

interface UserCredential {
  email: string;
  password: string;
}

export default function setUserData(userCredential: UserCredential): void {
  useCookie<boolean>("isLoggedIn").value = true;
  useCookie("userName").value = "Alex More";
  useCookie("token").value = "MockupToken1234567890";
  useCookie("refreshToken").value = "MockupRefreshToken0987654321";

  const authStore = useAuthStore();
  authStore.updateUser(userCredential);
}

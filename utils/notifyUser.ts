export default function notifyUser(
  message: string,
  messageType = "success"
): void {
  const nuxtApp = useNuxtApp();
  const options = {
    type: messageType,
    text: message,
  };

  nuxtApp.vueApp.config.globalProperties.$notify(options);
}

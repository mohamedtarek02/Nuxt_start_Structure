export default function ({ route, app, redirect }) {
  const hasLangPrefix = app.i18n.locales.some((locale) =>
    route.path.startsWith(`/${locale.code}`)
  );

  if (!hasLangPrefix) {
    const userLang = app.i18n.getLocaleCookie() || app.i18n.defaultLocale;
    const localizedPath = `/${userLang}${route.fullPath}`;

    redirect(localizedPath);
  }
}

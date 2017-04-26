import en from './en';
import fr from './fr';

export default (locale) => {
  const locales = { en, fr };
  if (locales[locale]) {
    return locales[locale];
  }
  const fallbackLocale = locale.split('-')[0];
  if (fallbackLocale && locales[fallbackLocale]) {
    return locales[fallbackLocale];
  }

  return en;
};

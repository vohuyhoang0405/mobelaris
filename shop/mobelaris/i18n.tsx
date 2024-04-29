export const localsMap = [
  {
    countryCode: "gb",
    langCode: "en",
    locale: "en",
    show: true,
    display_name: "United Kingdom",
  },
  {
    countryCode: "eu",
    langCode: "en",
    locale: "eu",
    show: true,
    display_name: "Euro",
  },
  {
    countryCode: "se",
    langCode: "sv",
    locale: "se",
    display_name: "Sweden",
  },
  {
    countryCode: "se",
    langCode: "sv",
    locale: "sv-se",
    show: true,
    display_name: "Sweden",
  },
  {
    countryCode: "de",
    langCode: "de",
    locale: "de-de",
    show: true,
    display_name: "Germany",
  },
  {
    countryCode: "de",
    langCode: "de",
    locale: "de",
    display_name: "Germany",
  },
  {
    countryCode: "no",
    langCode: "no",
    locale: "no-no",
    display_name: "Norway",
    show: true,
  },
  {
    countryCode: "no",
    langCode: "no",
    locale: "no",
    display_name: "Norway",
  },
  {
    countryCode: "fr",
    langCode: "fr",
    locale: "fr-fr",
    show: true,
    display_name: "France",
  },
  {
    countryCode: "fr",
    langCode: "fr",
    locale: "fr",
    display_name: "France",
  },
  {
    countryCode: "nl",
    langCode: "nl",
    locale: "nl-nl",
    show: true,
    display_name: "Netherlands",
  },
  {
    countryCode: "nl",
    langCode: "nl",
    locale: "nl",
    display_name: "Netherlands",
  },
  {
    countryCode: "be",
    langCode: "nl",
    locale: "nl-be",
    show: true,
    display_name: "Belgium (Dutch)",
  },
  {
    countryCode: "be",
    langCode: "fr",
    locale: "fr-be",
    show: true,
    display_name: "Belgium (French)",
  },
  {
    countryCode: "at",
    langCode: "de",
    locale: "de-at",
    show: true,
    display_name: "Austria (German)",
  },
  {
    countryCode: "at",
    langCode: "en",
    locale: "en-at",
    display_name: "Austria (English)",
  },
  {
    countryCode: "ch",
    langCode: "de",
    locale: "de-ch",
    show: true,
    display_name: "Switzerland (German)",
  },
  {
    countryCode: "es",
    langCode: "es",
    locale: "es-es",
    show: true,
    display_name: "Spain",
  },
  {
    countryCode: "es",
    langCode: "es",
    locale: "es",
    display_name: "Spain",
  },
  {
    countryCode: "it",
    langCode: "it",
    locale: "it-it",
    show: true,
    display_name: "Italy",
  },
  {
    countryCode: "it",
    langCode: "it",
    locale: "it",
    display_name: "Italy",
  },
  {
    countryCode: "dk",
    langCode: "en",
    locale: "uk",
    display_name: "Denmark",
  },
  {
    countryCode: "dk",
    langCode: "en",
    locale: "en-dk",
    display_name: "Denmark (English)",
  },
] as const
let defaultLocale = "en"
export let locales = localsMap
  .filter((l) => {
    if (process.env.QUICKSHIP) {
      return l.locale === defaultLocale
    }
    return true
  })
  .map((locale) => locale.locale)

export const i18n = {
  locales,
  defaultLocale,
}

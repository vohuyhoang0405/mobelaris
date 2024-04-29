import { LocaleType } from "types/global"

const dictionaries = {
  en: () =>
    import("./locales/en.default.json").then((module) => module.default),
  "sv-se": () => import("./locales/sv.json").then((module) => module.default),
  "de-de": () => import("./locales/de.json").then((module) => module.default),
  "no-no": () => import("./locales/no.json").then((module) => module.default),
  "fr-fr": () => import("./locales/fr.json").then((module) => module.default),
  "nl-nl": () => import("./locales/nl.json").then((module) => module.default),
  "nl-be": () => import("./locales/nl.json").then((module) => module.default),
  "fr-be": () => import("./locales/fr.json").then((module) => module.default),
  "de-at": () => import("./locales/de.json").then((module) => module.default),
  "de-ch": () => import("./locales/de.json").then((module) => module.default),
  "es-es": () => import("./locales/es.json").then((module) => module.default),
  "it-it": () => import("./locales/it.json").then((module) => module.default),
}

export const getDictionary = async (locale: LocaleType) => {
  return (dictionaries[locale] || dictionaries.en)()
}

import { LangType } from "types/global"

interface Resource {
  key: string
  targetLanguage: string
  translation: string
}
export interface Translate {
  text: string
  translation: string
  targetLanguage: string
}
export type LangCodeType = LangType
export type TranslateAndSaveType = {
  langCode: LangCodeType
  resources: { key: string; value: string }[]
}
export type TranslateAndSaveReturn = {
  langCode: LangCodeType
  resources: { key: string; value: string }[]
}

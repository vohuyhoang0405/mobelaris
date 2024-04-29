import DeepL from "deepl"
import { Collection, Db, MongoClient } from "mongodb"
import {
  LangCodeType,
  Translate,
  TranslateAndSaveReturn,
  TranslateAndSaveType,
} from "./TranslateAndSaveType"
const allInspiredOf = [
  {
    name: "A and P Castiglioni",
  },
  {
    name: "Alvar Aalto",
  },
  {
    name: "Anna Castelli Ferrieri",
  },
  {
    name: "Arne Jacobsen",
  },
  {
    name: "August Thonet",
  },
  {
    name: "Bertjan Pot",
  },
  {
    name: " Børge Mogensen",
  },
  {
    name: "Carlo Mollino",
  },
  {
    name: "Charles Eames",
  },
  {
    name: "'Christian Dell'",
  },
  {
    name: "Draga Obradovic & Aurel K. Basedow",
  },
  {
    name: "Ebbe Gehl & Søren Nissen  ",
  },
  {
    name: "Eero Aarnio",
  },
  {
    name: "Eero Saarinen",
  },
  {
    name: "Eileen Gray",
  },
  {
    name: "Erik Buch",
  },
  {
    name: "Fabricius and Kastholm",
  },
  {
    name: "Finn Juhl",
  },
  {
    name: "Florence Knoll",
  },
  {
    name: "Gabriele & Oscar Buratti",
  },
  {
    name: "George Nelson",
  },
  {
    name: "Gino Sarfatti",
  },
  {
    name: "Grant Featherston",
  },
  {
    name: "Greta Grossman",
  },
  {
    name: "Hans J. Wegner",
  },
  {
    name: "Harry Bertoia",
  },
  {
    name: "Isamu Noguchi",
  },
  {
    name: "Jean Prouvé",
  },
  {
    name: "Jens Risom",
  },
  {
    name: "Jo Hammerborg",
  },
  {
    name: "Juha Ilmari Leiviskä",
  },
  {
    name: "Jørn Oberg Utzon",
  },
  {
    name: "Kai Kristiansen",
  },
  {
    name: "Le Corbusier",
  },
  {
    name: "Marcel Breuer",
  },
  {
    name: "Mariano Fortuny y Madrazo",
  },
  {
    name: "Mark Stam",
  },
  {
    name: "Michael Thonet",
  },
  {
    name: "Mies Van Der Rohe",
  },
  {
    name: "Mobelaris",
  },
  {
    name: "Nicolaj Nøddesbo & Tommy Hyldahl",
  },
  {
    name: "Paulo Rizzatto",
  },
  {
    name: "Pierre Paulin",
  },
  {
    name: "Philippe Starck",
  },
  {
    name: "Poul Christiansen",
  },
  {
    name: "Poul Henningsen",
  },
  {
    name: "Poul Kjærholm",
  },
  {
    name: "Poul Volther",
  },
  {
    name: "Robert Dudley Best",
  },
  {
    name: "Serge Mouille",
  },
  {
    name: "Sigurd Ressell",
  },
  {
    name: "Sori Yanagi",
  },
  {
    name: "Xavier Pauchard",
  },
  {
    name: "Verner Panton",
  },
  {
    name: "Vico Magistretti",
  },
  {
    name: "Warren Platner",
  },
  {
    name: "Wilhelm Wagenfeld",
  },
  {
    name: "Bernard Schottlander",
  },
  {
    name: "Bernard-Albin Gras",
  },
  {
    name: "Shin and Tomoko Azumi",
  },
  {
    name: "Mario Bellini",
  },
]

const domain = "langshop.myshopify.com"
const token = "8a2203211dbb8db4e7209cede045cbe7b0deffefd49e678a86872370ea866de0"

const deepLApiKey =
  process.env.DEEPL_API || "806a68ae-ce2f-1da1-0112-958d1fc571a8"
const mongoDbUrl = process.env.TRANSLATION_DATABASE || ""
const dbName = "my-database"

export async function translateAndSave({
  langCode,
  resources,
}: TranslateAndSaveType): Promise<TranslateAndSaveReturn> {
  try {
    // Connect to the MongoDB database
    const client = new MongoClient(mongoDbUrl)
    await client.connect()
    const db = client.db(dbName)

    let resultResult = []
    // Translate each resource and save the result in the database
    for (const resource of resources) {
      const { key, value } = resource
      if (value) {
        const translation = await translate(langCode, value, db)
        resultResult.push({ key, value: translation })
      } else {
        // console.log(`key "${key}" is empty`)
        resultResult.push({ key, value: "" })
      }
    }
    await client.close()
    return { langCode, resources: resultResult }
  } catch (error) {
    console.error("translateAndSave", langCode)
    return {
      langCode,
      resources,
    }
  }
}
export async function translateAndSaveLine({
  langCode,
  text,
}: {
  langCode: LangCodeType
  text: string
}) {
  return await translateAndSave({
    langCode,
    resources: [
      {
        key: "text",
        value: text,
      },
    ],
  }).then(({ resources }) => resources[0].value)
}
async function translate(targetLanguage: LangCodeType, text: string, db?: Db) {
  try {
    if (targetLanguage.toLowerCase() == "en") return text
    if (
      allInspiredOf
        .map((inspired) => inspired.name?.trim())
        .includes(text?.trim())
    ) {
      return text
    }
    let translation
    const translations: Collection<Translate> | undefined =
      db?.collection("translation")
    if (translations) {
      const existingTranslation = await translations.findOne({
        text,
        targetLanguage: targetLanguage,
      })
      if (existingTranslation) {
        return existingTranslation.translation
      }
    }

    if (text.replace(/<[^>]*>/g, "") != text) {
      translation = await translateHtml(targetLanguage, text)
    } else {
      let languageToTranslate = targetLanguage == "no" ? "nb" : targetLanguage
      // @ts-ignore
      const translationResult = await DeepL({
        text,
        target_lang: languageToTranslate,
        auth_key: deepLApiKey,
        free_api: false,
      })

      translation = translationResult.data.translations[0].text
    }
    if (translation && translations) {
      await translations.insertOne({ text, targetLanguage, translation })
    }
    return translation
  } catch (error) {
    console.error("translate error", targetLanguage, text)
    return text || "error"
  }
}

export async function translateHtml(targetLang: LangCodeType, html: string) {
  // Split the HTML string into an array of text and tag segments
  const segments = html.split(/(<[^>]*>)/)

  // Translate the text segments using the DeepL API
  const translatedSegments = await Promise.all(
    segments.map(async (segment) => {
      if (segment.startsWith("<")) {
        // If the segment is a tag, return it as is
        return segment
      } else {
        if (!segment) return segment
        let languageToTranslate = targetLang == "no" ? "nb" : targetLang
        // @ts-ignore
        const translatedText = await DeepL({
          text: segment,
          target_lang: languageToTranslate,
          auth_key: deepLApiKey,
          free_api: false,
        })
        return translatedText.data.translations[0].text
      }
    })
  )

  // Join the translated segments back into an HTML string
  const translatedHtml = translatedSegments.join("")

  return translatedHtml
}

export async function translateToNorwegian(
  query: { value: string }[],
  db: Db
): Promise<{ key: string; value: string }[]> {
  const translationCollection: Collection<Translate> =
    db.collection("translation")
  const translations: { [key: string]: string } = {}
  const untranslatedQueries: { key: string; value: string }[] = []

  for (const q of query) {
    const translation: Translate | null = await translationCollection.findOne({
      text: q.value,
      targetLanguage: "no",
    })

    if (translation) {
      translations[q.value] = translation.translation
    } else {
      untranslatedQueries.push({ key: q.value, value: q.value })
    }
  }

  if (untranslatedQueries.length > 0) {
    wait(2)
    const url = "https://api.langshop.app/translate"
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Basic " + btoa(`${domain}:${token}`),
    }
    const body = JSON.stringify({
      to: "nb",
      query: untranslatedQueries,
    })
    const response = await fetch(url, { method: "POST", headers, body })
    const data = await response.json()

    if (response.status !== 200) {
      throw new Error(`Error translating text: ${data.error}`)
    }
    const newTranslations: Translate[] = data.data.translations.map(
      (t: { key: string; value: string }) => ({
        text: t.key,
        targetLanguage: "no",
        translation: t.value,
      })
    )

    //    await translationCollection.insertMany(newTranslations);
    newTranslations.map((translation) =>
      translationCollection.insertOne(translation)
    )

    for (const t of newTranslations) {
      translations[t.text] = t.translation
    }
  }

  const result: { key: string; value: string }[] = []
  for (const q of query) {
    result.push({ key: q.value, value: translations[q.value] })
  }
  return result
}

function wait(second: number) {
  var waitTill = new Date(new Date().getTime() + second * 1000)
  while (waitTill > new Date()) {}
}

export function flattenObject(
  ob: { [key: string]: any },
  needTransKey: string[]
) {
  var entities = {} as {
    [key: string]: string
  }
  var resources = [] as {
    key: string
    value: string
  }[]

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue

    if (typeof ob[i] == "object" && ob[i] !== null) {
      var flatObject = flattenObject(ob[i], needTransKey)
      for (var x in flatObject.entities) {
        if (!flatObject.entities.hasOwnProperty(x)) continue
        entities[i + "." + x] = flatObject.entities[x]
      }
      resources = [
        ...resources,
        ...flatObject.resources.map((item) => {
          return {
            key: item.value,
            value: item.value,
          }
        }),
      ]
    } else {
      entities[i] = String(ob[i])
      if (needTransKey.includes(i)) {
        const value = String(ob[i])
        resources.push({
          key: value,
          value: value,
        })
      }
    }
  }
  return { entities, resources }
}
export async function transObject(
  ob: { [key: string]: any },
  needTransKey: string[],
  langCode: LangCodeType
) {
  const { entities, resources } = flattenObject(ob, needTransKey)
  const res = await translateAndSave({ resources, langCode })
  return res
}

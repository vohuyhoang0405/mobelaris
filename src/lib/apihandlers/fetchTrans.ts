import { TranslateAndSaveType } from "@lib/TranslateAndSaveType"

const TRANS_URL =
  process.env.NODE_ENV === "development" ? "/api/trans" : "/api/trans"
export const fetchTrans = async ({
  langCode,
  resources,
}: TranslateAndSaveType) => {
  const res = await fetch(TRANS_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      resources,
      langCode,
    }),
  }).then((res) => res.json())
  return res?.resources || []
}

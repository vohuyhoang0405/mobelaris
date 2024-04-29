import PageTemplate from "app/[locale]/templates/Page"
import { notFound } from "next/navigation"
import { LocaleType } from "types/global"
import data from "../data"

async function Page({
  params,
}: {
  params: { locale: LocaleType; id: string[] }
}) {
  const id = params.id.reverse()[0]
  const faq = data.items[Number(id)]
  if (faq) {
    return <PageTemplate title={faq.title} content={faq.content} />
  }

  return notFound()
}

export default Page

import { T } from "app/[locale]/context/sources"
import { BaseParams } from "app/[locale]/types"
import ContactForm from "app/components/ContactForm"
import Container from "app/components/Container"
import { Metadata } from "next"
import { LocaleType } from "types/global"
import { generatePageMetadata, getPageData } from "../../../helper/page"
async function Page({ params }: { params: BaseParams }) {
  const pageContent = await getPageData("contact-us", params.locale)
  return (
    <>
      <Container className="prose max-w-none py-12">
        <style>{`
          .contact-heading {
            text-align: center;
            border-bottom: solid 1px #dadada;
            padding: 10px;
            font-family: var(--font-heading);
            margin: 0 auto;
            clear: both;
            width: 60%;
          }
        `}</style>
        <div
          className="prose mx-auto flex max-w-4xl flex-col prose-a:text-sale prose-ul:flex prose-ul:list-none prose-ul:p-0 prose-li:flex-1 prose-li:p-0 prose-li:text-center prose-li:font-bold prose-img:mx-auto"
          dangerouslySetInnerHTML={{
            __html: pageContent.content || "",
          }}
        ></div>
        <div className="mx-auto max-w-4xl ">
          <div className="border-b py-2 text-xl">
            <T>Write us</T>
          </div>
          <div className="py-6 text-center">
            <T>
              Jot us a note and we’ll get back to you as quickly as possible.
            </T>
          </div>
          <ContactForm />
        </div>
      </Container>
    </>
  )
}
export async function generateMetadata({
  params,
}: {
  params: { locale: LocaleType; handle: string[] }
}): Promise<Metadata> {
  return await generatePageMetadata("contact-us", params.locale)
}
export default Page

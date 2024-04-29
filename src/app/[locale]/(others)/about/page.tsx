import { BaseParams } from "app/[locale]/types"
import Container from "app/components/Container"
import { Metadata } from "next"
import { LocaleType } from "types/global"
import { generatePageMetadata, getPageData } from "../../../helper/page"

async function Page(props: { params: BaseParams }) {
  const { title, content } = await getPageData("about", props.params.locale)
  return (
    <>
      <style global>{`
        .about-container-wrapper ul{
          padding: 0;
        }
        .our-passion-section ul {
          list-style: none;
        }
        .our-passion-section strong{
          font-family: var(--font-heading), "Poppins", sans-serif;
          display: block;
        }
        .built-for-you-section{
          text-align: center;
        }
        .built-for-you-section ul{
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
          gap:0 1.6rem;
        }
        .built-for-you-section ul li {
          flex:1;
          max-width: 300px;
          min-width: 300px;
        }
        .built-for-you-section strong{
          font-family: var(--font-heading), "Poppins", sans-serif;
          display: block;
        }
        .about-map-section{
          position: relative;
        }
        .about-map-section .about-map-section-inner{
          padding:  3rem 0;
          max-width: 310px;
          display: flex;
          align-items: center;
          height: 100%;
        }
        .about-map-section img{
          z-index: -1;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          object-fit: scale-down;
        }
      `}</style>
      <div className="space-y-6">
        <div className="section-title span-12 flex items-center justify-center bg-[#f4f4f4] py-3 text-center lg:py-12">
          <Container>
            <h1 className="m-0 text-2xl">{title}</h1>
          </Container>
        </div>
        <Container>
          <div
            className="prose mx-auto flex max-w-none flex-col prose-a:text-sale prose-img:mx-auto"
            dangerouslySetInnerHTML={{
              __html: content || "",
            }}
          ></div>
        </Container>
      </div>
    </>
  )
}
export async function generateMetadata({
  params,
}: {
  params: { locale: LocaleType; handle: string[] }
}): Promise<Metadata> {
  return await generatePageMetadata("about", params.locale)
}
export default Page

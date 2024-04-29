import { T } from "app/[locale]/context/sources"
import Container from "app/components/Container"

function PageTemplate({ title, content }: { title: string; content: string }) {
  return (
    <div className="space-y-6">
      <div className="section-title span-12 flex items-center justify-center bg-[#f4f4f4] py-3 text-center lg:py-12">
        <Container>
          <h1 className="m-0 text-2xl">
            <T>{title}</T>
          </h1>
        </Container>
      </div>
      <Container>
        <div
          className="prose mx-auto flex max-w-none flex-col prose-a:text-sale prose-img:mx-auto"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></div>
      </Container>
    </div>
  )
}

export default PageTemplate

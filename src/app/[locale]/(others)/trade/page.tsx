import Container from "app/components/Container"
import { Metadata } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { LocaleType } from "types/global"
import { generatePageMetadata, getPageData } from "../../../helper/page"

const ContactForm = dynamic(() => import("./ContactForm"))

async function Page({ params }: { params: { locale: LocaleType } }) {
  const { title, content } = await getPageData("trade", params.locale)
  return (
    <div className="page-trade">
      <style
        global
        dangerouslySetInnerHTML={{
          __html: `
        .page-trade .container{
          padding: 0;max-width: 1360px;
        }
        .page-trade ul,.page-trade li{
          padding: 0;
          list-style: none;
        }
        .inner-container ul{
          font-family: var(--font-heading), "Poppins", sans-serif;
        }
        .inner-container a{
          color:black;
          text-decoration: none;
        }
        .page-trade #contact-menu ul{
          float: left;
          margin: 20px 0;
          padding: 0;
          text-align: center;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          line-height: 1.3;
          
        }
        #contact-menu ul li a{
          border-right: 2px solid;
          color: #000;
          font-weight: 700;
          padding: 0 10px;
        }
        #contact-menu ul li:last-child a {
          border: 0;
        }
        .greenbg {
          background-color: #95caca
        }
        .clearfix:before, .clearfix:after, .container:before, .container:after, .container-fluid:before, .container-fluid:after, .row:before, .row:after{
          content: " ";
          display: table;
        }
        .arrowbox {
          display: none;
        }
        .manufcture-left h1 {
          font-size: 15px;
          font-weight: 700;
          text-align: center;
        }
        .manufcture-left a {
          background: #ff950a none repeat scroll 0 0;
          color: #fff;
          display: inline-block;
          font-weight: 700;
          padding: 5px 20px;
        }
        .container-fluid{
          margin-bottom: 50px;
        }
        .clearfix:after, .container:after, .container-fluid:after, .row:after {
          clear: both;
        }

        @media (min-width: 992px){
          .arrowbox {
            display: block;
          }
          .arrowbox {
            position: absolute;
            right: -18%;
            text-align: right;
          }
          .col-md-4 {
            width: 33.33333333%;
            float: left;
            position: relative;
          }
          .col-md-8 {
            width: 66.66666667%;
            float: left;
            position: relative;

          }
          .manufcture-left h1{
            margin:100px 0 25px
          }
          #manufecture-sc .inner-container.text-center{
            padding: 0 60px;
            padding-bottom: 100px;
          }
          .ser-content p, .manufcture-left p{
            font-size: 13px;
          }
          #manufecture-sc .european-manufacture{
            border:1px solid #ccc
          }
          .prose :where(figure):not(:where([class~="not-prose"] *)){
            margin:0
          }
          .prose img{
            width: 100%;
          }
          .ser-img figure {
            height: 250px;
            margin: 0 auto;
            width: 250px;
          }
          .single-head h3, .manufcture-left h1{
            font-size: 15px;
            font-weight: 700;
            text-align: center;
          }
          .single-head {
            float: left;
            margin: 15px 0;
            width: 100%;
          }
          .col-lg-2 {
            width: 16.66666667%;
            float: left;
            position: relative;

          }
          #logo-sc {
            padding: 50px 0;
          }
          #logo-sc .trade-inner{
            display: flex;
            gap: 20px;
            items-align: center;
            justify-content: center;
          }
          #logo-sc .ser-content{
            display: flex;
            items-align: center;
            justify-content: center;

          }
          #contctfree-sc{
            border:1px solid #ccc;    padding: 3% 20%;
            max-width: 1360px;
            margin: auto
        }
          }
        }
      `,
        }}
      ></style>

      <div className="space-y-6">
        <div className="section-title span-12 flex items-center justify-center bg-[#f4f4f4] py-3 text-center lg:py-12">
          <Container>
            <h1 className="m-0 text-2xl">{title}</h1>
          </Container>
        </div>
        <div
          className="prose mx-auto flex max-w-none flex-col prose-a:text-sale prose-img:mx-auto"
          dangerouslySetInnerHTML={{
            __html: content || "",
          }}
        ></div>
        <Suspense>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  )
}
export async function generateMetadata({
  params,
}: {
  params: { locale: LocaleType; handle: string[] }
}): Promise<Metadata> {
  return await generatePageMetadata("trade", params.locale)
}
export default Page

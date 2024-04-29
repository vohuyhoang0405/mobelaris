import { createAlternates } from "@shop/store.config"
import { Metadata } from "next"
import dynamic from "next/dynamic"
import Image from "next/image"
import { LocaleType } from "types/global"
import { T } from "../context/sources"
import { getAllPosts } from "./utils"

const Container = dynamic(() => import("../../components/Container"))
const Link = dynamic(() => import("../../components/Link"))

async function Page() {
  const posts = await getAllPosts()
  return (
    <div>
      <div className="section-title span-12 flex items-center justify-center bg-[#f4f4f4] py-4 text-center lg:py-12">
        <h1 className="text-2xl">
          <T>Blog</T>
        </h1>
      </div>
      <Container className="mt-12 grid !max-w-5xl grid-cols-1 gap-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((item, i) => {
          const post = item
          return (
            <div key={i} className="flex flex-col shadow hover:shadow-xl">
              <div className="relative bg-slate-100 pb-[60%] ">
                {post?.featuredImage && (
                  <Image
                    fill
                    alt="post"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      color: "transparent",
                    }}
                    sizes="300px"
                    src={post.featuredImage.node.sourceUrl}
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col gap-3 p-3">
                <Link
                  href={"/mobelarisblog/" + post.slug}
                  className="font-heading text-xl capitalize text-sale"
                >
                  <T>{post.title}</T>
                </Link>
                <div>
                  <T>Categories</T> :{" "}
                  <span className="text-sale">Uncategorised</span>
                </div>
                <div
                  className="flex-1"
                  dangerouslySetInnerHTML={{ __html: post.excerpt || "" }}
                ></div>
                <Link
                  className="text-sale"
                  href={"/mobelarisblog/" + post.slug}
                >
                  <T>View more</T>
                </Link>
              </div>
            </div>
          )
        })}
      </Container>
    </div>
  )
}
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LocaleType }
}): Promise<Metadata> {
  const handle = "mobelarisblog"
  const pathname = "/" + handle
  return {
    title: "Blog",
    alternates: createAlternates({
      pathname,
      currentLocale: locale,
    }),
  }
}
export default Page

import { instagramEntities } from "@shop/instagram"
import { T } from "app/[locale]/context/sources"
import Slider from "app/components/Carousel"
import Container from "app/components/Container"
import Image from "app/components/Image"
import Link from "app/components/Link"
import dynamic from "next/dynamic"

const InstagramLightBox = dynamic(() => import("./InstagramLightBox"))

async function InstagramHome() {
  let items = Object.values(instagramEntities).filter((_, i) => i < 12) as {
    photo_id: string
    products: any
  }[]
  return (
    <div className="mx-auto mb-14 mt-10 flex w-full flex-col items-center px-4 sm:px-8">
      <div className="mx-auto max-w-3xl text-center ">
        <h2 className=" m-0  text-[26px]">
          <T>SHOP INSTAGRAM</T>
        </h2>
        <div className="prose mt-2 border-t border-solid border-black py-3 prose-a:text-secondary">
          <T
            ishtml
          >{`<p class="mbs-section__subtitle-inner">Who did it better? Tag us on insta <a href="https://www.instagram.com/mobelarisfurniture/" target="_blank"> @mobelarisfurniture</a> + we will feature all the best pics'</p>`}</T>
        </div>
      </div>
      <Container className="relative w-full ">
        <Slider>
          <ul
            className="carousel carousel-center my-[-0.5vw]  lg:-my-3"
            role="list"
          >
            {items.map((block, i) => {
              if (i > 11) return null
              return (
                <li
                  key={i}
                  className="carousel-item w-[calc((100%)/2-1vw)] max-w-[276px]   px-[0.5vw] py-6  md:w-[30vw] lg:w-[300px] lg:px-3 "
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div className="group relative w-full pb-[100%] ">
                    <Image
                      disableLoader
                      alt="Instagram"
                      width={400}
                      height={400}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                      sizes="440px"
                      src={`https://shopify-app-instagram-feed.mobelaris.com/instagram-image?postId=${block.photo_id}&username=mobelarisfurniture`}
                    ></Image>
                    <label
                      htmlFor={`instagram_${i}`}
                      className="invisible absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-3 bg-black bg-opacity-50 text-white opacity-0 transition-opacity group-hover:visible group-hover:opacity-100"
                    >
                      <svg
                        className="text-4xl"
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 448 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                      </svg>
                      <div className="border border-current px-6 py-1 font-button">
                        <T>{"SHOP THE LOOK"}</T>
                      </div>
                    </label>
                  </div>
                </li>
              )
            })}
          </ul>
        </Slider>
        <InstagramLightBox items={items} />
        <div className="mt-8 flex justify-center">
          <Link
            className="btn btn-primary btn-sm mx-auto text-white"
            href="/instagram"
          >
            <T>SHOW MORE</T>
          </Link>
        </div>
      </Container>
    </div>
  )
}

export default InstagramHome

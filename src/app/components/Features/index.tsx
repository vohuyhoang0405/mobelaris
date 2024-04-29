/* eslint-disable @next/next/no-img-element */

import Image from "next/image"
import img1 from "./images/1.jpeg"
import img2 from "./images/2.png"
import img3 from "./images/3.png"
import img4 from "./images/4.png"
const Features = () => {
  const data = {
    type: "mobelaris-features",
    blocks: {
      "375d226b-dc8c-4f1c-bdb6-89ad274cd195": {
        type: "block",
        settings: {
          image: img1,
          content:
            '<p>TOPS FOR <p style="font-weight:bold;"> SUPPORT </p></p><p>100\'s of Independant reviews</p>',
          url: "",
        },
      },
      "8f243b2d-a93f-413a-84c3-59a8dd5c308e": {
        type: "block",
        settings: {
          image: img2,
          content:
            '<p>SUPPORT <p style="font-weight:bold;">7 DAYS</p> A WEEK</p><p>Live Chat</p>',
          url: "",
        },
      },
      "5d4642d9-5254-407d-990b-524deb67fcfa": {
        type: "block",
        settings: {
          image: img3,
          content:
            '<p>30 DAY<p style="font-weight:bold;"> GUARANTEE</p></p><p>No quibbles money back</p>',
          url: "",
        },
      },
      "e1868614-edd4-4e18-990c-41b270ac2f25": {
        type: "block",
        settings: {
          image: img4,
          content:
            '<p>PAYMENT<p style="font-weight:bold;"> </p>100%<p style="font-weight:bold;"> SECURE</p></p><p>Payment 100% Secure</p>',
          url: "",
        },
      },
    },
    block_order: [
      "375d226b-dc8c-4f1c-bdb6-89ad274cd195",
      "8f243b2d-a93f-413a-84c3-59a8dd5c308e",
      "5d4642d9-5254-407d-990b-524deb67fcfa",
      "e1868614-edd4-4e18-990c-41b270ac2f25",
    ],
    settings: {
      full_width: false,
    },
  }
  return (
    <section className=" border-y">
      <ul className=" mx-auto  grid  w-full max-w-[1264px]  list-none     grid-cols-2  justify-center  gap-3  px-4  py-3  prose-p:m-0  prose-p:text-sm  first:prose-p:font-heading first:prose-p:text-xs prose-strong:text-[#dc9916] sm:px-8 md:grid-cols-4 md:gap-6 md:py-6 md:prose-p:text-base  md:first:prose-p:text-sm">
        {data.block_order.map((blockid) => {
          const block = data.blocks[blockid]
          return (
            <li key={blockid} className="flex max-w-xs flex-1 items-start ">
              <Image
                className="mt-3 h-[24px] object-contain md:h-[30px] "
                src={block.settings.image}
                width={50}
                height={36}
                sizes="(max-width: 640px) 50px, 100px"
                alt="icon"
              />
              <div
                className="mt-2 "
                dangerouslySetInnerHTML={{ __html: block.settings.content }}
              ></div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
export default Features

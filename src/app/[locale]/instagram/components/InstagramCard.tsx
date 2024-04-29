"use client"

import { T } from "app/[locale]/context/sources"
import Image from "app/components/Image"
import dynamic from "next/dynamic"
import React from "react"

const InstagramProduct = dynamic(() => import("./InstagramProduct"))

function InstagramCard({
  photo_id,
  index,
  items,
}: {
  photo_id: string
  index: number
  items: any[]
}) {
  let id = `instagram_${index}`
  const [open, setOpen] = React.useState(false)
  return (
    <div>
      <input
        type="radio"
        onChange={(e) => {
          if (e.target.checked) {
            setOpen(true)
          }
        }}
        name={"instagram"}
        id={id}
        className="modal-toggle"
      />
      <label
        htmlFor={"instagram_close"}
        className="modal no-animation m-0 cursor-pointer bg-opacity-70 transition-none"
      >
        <div className="modal-box no-animation relative max-h-[100%] max-w-md overflow-auto rounded-none p-0 transition-none lg:flex lg:max-w-7xl">
          <div className="relative top-0 aspect-square flex-1 border will-change-scroll lg:sticky">
            <Image
              alt="Instagram"
              disableLoader
              loading="lazy"
              width={600}
              height={600}
              className="absolute inset-0 h-full w-full object-cover"
              sizes="100vw, 640px"
              src={`https://shopify-app-instagram-feed.mobelaris.com/instagram-image?postId=${photo_id}&username=mobelarisfurniture`}
            ></Image>
          </div>
          <div className="flex flex-col lg:w-[44%] lg:min-w-[400px] ">
            <div className="p-3 text-center font-button text-2xl font-bold lg:p-6">
              <T>{"Featured Products"}</T>
            </div>
            <div className="relative flex-1">
              <div className="inset-0 overflow-auto shadow-inner lg:absolute ">
                <div className="grid grid-cols-2 p-3 lg:gap-6  lg:p-6 ">
                  {open &&
                    items?.map((p, i) => {
                      return (
                        <div key={i} className="grid">
                          <InstagramProduct id={p.id} variant={p.variant} />
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
          <label
            htmlFor={"instagram_close"}
            className=" btn btn-circle absolute right-3 top-3 text-2xl text-white lg:top-4"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="white"
                strokeWidth={2}
                d="M3,3 L21,21 M3,21 L21,3"
              />
            </svg>
          </label>
        </div>
      </label>
    </div>
  )
}

export default InstagramCard

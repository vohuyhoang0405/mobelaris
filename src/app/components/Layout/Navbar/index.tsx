import { T } from "app/[locale]/context/sources"
import clsx from "clsx"
import dynamic from "next/dynamic"
import Image from "next/image"
import React, { FC } from "react"
import threeseats from "../../../../../public/images/dropdown-spring/SPRING-Dropdown-3-Seater-BLANK.jpg"
import chairimage from "../../../../../public/images/dropdown-spring/SPRING-Dropdown-Chairs-BLANK.jpg"
import daybed from "../../../../../public/images/dropdown-spring/SPRING-Dropdown-Day-Bed-BLANK.jpg"
import sofaiamge from "../../../../../public/images/dropdown-spring/SPRING-Dropdown-Sofa-BLANK.jpg"
import storageimage from "../../../../../public/images/dropdown-spring/SPRING-Dropdown-Storage-BLANK.jpg"
import tableimage from "../../../../../public/images/dropdown-spring/SPRING-Dropdown-Table-BLANK.jpg"

const Container = dynamic(() => import("../../Container"))
const Link = dynamic(() => import("../../Link"))
const MenuWrap = dynamic(() => import("./MenuWrap"))

const MenuCotent: FC = ({ images, items, href, title }) => {
  return (
    <div className=" group isolate h-[60px] pr-8">
      <Link
        className="flex h-[60px] items-baseline justify-between uppercase leading-[60px] lg:justify-start"
        href={href}
      >
        <T>{title}</T>
        <svg
          className="mt-1 inline text-sm"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 320 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
        </svg>
      </Link>
      <div className=" invisible absolute left-0 right-0 z-[-1] hidden border-b border-opacity-50 bg-gray-200 leading-loose opacity-0 transition-[opacity,margin] duration-500 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 lg:block lg:bg-white lg:py-10 lg:shadow">
        <Container flush className="mx-auto flex w-full justify-center gap-6">
          {images.map((imgSource, i) => (
            <Link
              key={i}
              href={href}
              className="before:conten-[''] relative order-2 hidden w-5/12 max-w-[680px] flex-shrink-0 scale-100  items-center gap-6  transition-transform duration-700 will-change-transform before:absolute   hover:scale-110 hover:text-base-content lg:flex"
            >
              <div className=" block aspect-[3/2] max-h-[500px] flex-1 flex-shrink-0 ">
                <Image
                  fill
                  quality={100}
                  src={imgSource}
                  sizes="400px"
                  loading="lazy"
                  alt={title}
                  className="absolute inset-0 object-contain"
                />
              </div>
              <div className="absolute right-0 flex h-full w-2/5 flex-col items-end justify-center gap-3 p-12 text-right  font-heading text-[min(2vw,3rem)] font-bold  uppercase leading-[min(2vw,3rem)] ">
                <span className="whitespace-pre text-right leading-none ">
                  <T ishtml>{`SPRING\nSALE`}</T>
                </span>
                <div className="w-full rounded-full border-[2px] border-b border-black"></div>
                <span className="whitespace-pre font-heading font-bold text-[#95c093] ">
                  <T
                    ishtml
                  >{`UPTO \n<span style="font-size:1.2em">70%</span> \nOFF`}</T>
                </span>
                <div className="btn btn-outline btn-sm rounded-none">
                  <T>{"Click here"}</T>
                </div>
              </div>
            </Link>
          ))}

          <ul
            className={clsx(
              "flex w-full flex-col items-baseline divide-y bg-gray-50 lg:divide-y-0 lg:bg-transparent",
              {
                "list-none grid-cols-2 content-start items-start justify-center lg:grid lg:grid-cols-3 ":
                  images.length === 1,
                "list-none grid-cols-1 content-start items-start justify-center lg:grid lg:grid-cols-1 ":
                  images.length === 2,
              }
            )}
          >
            {items.map((item, i) => {
              return (
                <li
                  key={i}
                  className="flex min-h-[49px] w-full items-center px-[25px] py-1 leading-snug lg:w-[247px] lg:max-w-[400px]"
                >
                  <Link className="text-base" href={item.href}>
                    <T>{item.title}</T>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Container>
      </div>
    </div>
  )
}
const Chairsmenu = (props) => {
  return <MenuCotent {...props} />
}
const Tablesmenu = (props) => {
  return <MenuCotent {...props} />
}
const MenuCotentSofa = ({ images, items, href, title }) => {
  return (
    <div className=" group isolate h-[60px] pr-8">
      <Link
        className="flex h-[60px] items-baseline justify-between uppercase leading-[60px] lg:justify-start"
        href={href}
      >
        <T>{title}</T>

        <svg
          className="mt-1 inline text-sm"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 320 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
        </svg>
      </Link>
      <div className=" invisible absolute left-0 right-0 z-[-1] hidden border-b border-opacity-50 bg-gray-200 leading-loose opacity-0 transition-[opacity,margin] duration-500 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 lg:block lg:bg-white lg:py-10 lg:shadow">
        <Container flush className="mx-auto flex w-full justify-center gap-6">
          {images.map((src, i) => (
            <Link
              key={i}
              href={href}
              className="before:conten-[''] relative order-2 hidden w-5/12 max-w-[680px] flex-shrink-0 scale-100  items-center gap-6  transition-transform duration-700 will-change-transform before:absolute   hover:scale-110 hover:text-base-content lg:flex"
            >
              <div className=" block  aspect-[3/2] max-h-[500px] flex-1 flex-shrink-0 ">
                <Image
                  fill
                  quality={100}
                  src={src}
                  sizes="400px"
                  loading="lazy"
                  alt={title}
                  className="absolute inset-0 object-contain"
                />
              </div>
              <div className="absolute right-0 flex h-full w-2/5 flex-col items-end justify-center gap-3 p-12 text-right  font-heading text-[min(2vw,3rem)] font-bold  uppercase leading-[min(2vw,3rem)] ">
                <span className="whitespace-pre text-right leading-none ">
                  <T ishtml>{`SPRING\nSALE`}</T>
                </span>
                <div className="w-full rounded-full border-[2px] border-b border-black "></div>
                <span className="whitespace-pre font-heading font-bold text-[#95c093] ">
                  <T
                    ishtml
                  >{`UPTO \n<span style="font-size:1.2em">70%</span> \nOFF`}</T>
                </span>
                <div className="btn btn-outline btn-sm rounded-none">
                  <T>{"Click here"}</T>
                </div>
              </div>
            </Link>
          ))}

          <ul
            className={clsx(
              "flex w-full flex-col items-baseline divide-y bg-gray-50 lg:divide-y-0 lg:bg-transparent",
              {
                "list-none grid-cols-2 content-start items-start justify-center lg:grid  ":
                  images.length === 1,
                "list-none grid-cols-1 content-start items-start justify-center lg:grid lg:grid-cols-1 ":
                  images.length === 2,
              }
            )}
          >
            {items.map((item, i) => {
              const title = item.title
              return (
                <React.Fragment key={i}>
                  <li
                    key={i}
                    className="flex min-h-[49px] w-full items-center px-[25px] py-1 leading-snug lg:w-[247px] lg:max-w-[400px]"
                  >
                    <Link className="text-base" href={item.href}>
                      <T>{title}</T>
                    </Link>
                  </li>
                  {item.image && (
                    <Link
                      className="relative order-2  mx-[25px] hidden w-[300px] flex-shrink-0  scale-100 flex-col  justify-start transition-transform duration-700 will-change-transform hover:scale-110 hover:text-base-content lg:flex"
                      href={item.href}
                    >
                      <Image
                        width={300}
                        height={300}
                        alt={item.title}
                        loading="lazy"
                        className="object-contain"
                        sizes="200px"
                        src={item.image}
                      />
                      <div className="absolute inset-0 mt-2 flex h-full w-full flex-col items-center justify-between space-y-2 p-6 pt-3 text-center uppercase leading-tight">
                        <div className="font-heading text-[1.1em] ">
                          <span className="whitespace-pre text-right text-[1.2em] ">
                            <T ishtml>{`SPRING SALE`}</T>
                          </span>
                          <span className="whitespace-pre font-heading text-[0.9em] font-bold text-[#95c093]  ">
                            <T
                              ishtml
                            >{`UPTO <span style="font-size:1.2em">70%</span> OFF`}</T>
                          </span>
                        </div>
                        <div className="btn btn-outline btn-xs whitespace-nowrap rounded-none">
                          <T>{"Click here"}</T>
                        </div>
                      </div>
                    </Link>
                  )}
                </React.Fragment>
              )
            })}
          </ul>
        </Container>
      </div>
    </div>
  )
}
const MenuCotentStorage = ({ images, items, href, title }) => {
  return (
    <div className=" group isolate h-[60px] pr-8">
      <Link
        className="flex h-[60px] items-baseline justify-between uppercase leading-[60px] lg:justify-start"
        href={href}
      >
        <T>{title}</T>

        <svg
          className="mt-1 inline text-sm"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 320 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
        </svg>
      </Link>
      <div className=" invisible absolute left-0 right-0 z-[-1] hidden border-b border-opacity-50 bg-gray-200 leading-loose opacity-0 transition-[opacity,margin] duration-500 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 lg:block lg:bg-white lg:py-10 lg:shadow">
        <Container flush className="mx-auto flex w-full justify-center gap-6">
          {images.map((url, i) => (
            <Link
              key={i}
              href={href}
              className="before:conten-[''] relative order-2 hidden w-5/12 max-w-[680px] flex-shrink-0 scale-100  items-center gap-6  transition-transform duration-700 will-change-transform before:absolute   hover:scale-110 hover:text-base-content lg:flex"
            >
              <div className="  block aspect-[3/2]  max-h-[500px] flex-1 flex-shrink-0  ">
                <Image
                  fill
                  quality={100}
                  src={url}
                  sizes="400px"
                  loading="lazy"
                  alt={title}
                  className="absolute inset-0 object-contain"
                />
              </div>
              <div className="absolute right-0 flex h-full w-2/5 flex-col items-end justify-center gap-3 p-12 text-right  font-heading text-[min(2vw,3rem)] font-bold  uppercase leading-[min(2vw,3rem)]">
                <span className="whitespace-pre text-right leading-none ">
                  <T ishtml>{`SPRING\nSALE`}</T>
                </span>
                <div className="w-full rounded-full border-[2px] border-b border-black"></div>
                <span className="whitespace-pre font-heading font-bold text-[#95c093] ">
                  <T
                    ishtml
                  >{`UPTO \n<span style="font-size:1.2em">70%</span> \nOFF`}</T>
                </span>
                <div className="btn btn-outline btn-sm rounded-none">
                  <T>{"Click here"}</T>
                </div>
              </div>
            </Link>
          ))}

          <ul
            className={clsx(
              "flex w-full flex-col items-baseline divide-y bg-gray-50 lg:divide-y-0 lg:bg-transparent",
              {
                "list-none grid-cols-2 content-start items-start justify-center lg:grid  ":
                  images.length === 1,
                "list-none grid-cols-1 content-start items-start justify-center lg:grid lg:grid-cols-1 ":
                  images.length === 2,
              }
            )}
          >
            {items.map((item, i) => {
              const title = item.title
              return (
                <React.Fragment key={i}>
                  <li
                    key={i}
                    className="flex min-h-[49px] w-full items-center px-[25px] py-1 leading-snug lg:w-[247px] lg:max-w-[400px]"
                  >
                    <Link className="text-base" href={item.href}>
                      <T>{title}</T>
                    </Link>
                  </li>
                  {item.image && (
                    <Link
                      className="before:conten-[''] relative  order-2  mx-[25px] hidden max-w-[300px] flex-shrink-0 scale-100  flex-col items-center  bg-[#f5f6f7] p-3 transition-transform duration-700 will-change-transform  before:absolute before:inset-3  before:border  before:border-black hover:scale-110 hover:text-base-content lg:flex"
                      href={href}
                    >
                      <div className="relative block max-h-[200px] w-full flex-1 flex-shrink-0 items-center pb-[50%] ">
                        <Image
                          alt={item.title}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-contain p-1"
                          sizes="200px"
                          src={item.image}
                        />
                      </div>
                      <div className="mt-2 flex flex-col items-center space-y-2 pb-3 text-center uppercase leading-tight">
                        <div className="font-heading text-[1em]">
                          <T>{title}</T>
                        </div>
                        <div className="btn btn-outline btn-xs whitespace-nowrap rounded-none">
                          <T>{"Click here"}</T>
                        </div>
                      </div>
                    </Link>
                  )}
                </React.Fragment>
              )
            })}
          </ul>
        </Container>
      </div>
    </div>
  )
}
const MenuCotentLighting = ({ items, href, title }) => {
  return (
    <div className=" group isolate h-[60px] pr-8">
      <Link
        className="flex h-[60px] items-baseline justify-between uppercase leading-[60px] lg:justify-start"
        href={href}
      >
        <T>{title}</T>

        <svg
          className="mt-1 inline text-sm"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 320 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
        </svg>
      </Link>
      <div className=" invisible absolute left-0 right-0 z-[-1] hidden border-b border-opacity-50 bg-gray-200 leading-loose opacity-0 transition-[opacity,margin] duration-500 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 lg:block lg:bg-white lg:py-10 lg:shadow">
        <Container flush className="mx-auto flex w-full justify-center gap-6">
          <ul
            className={clsx(
              "flex w-full items-baseline  justify-center gap-6 divide-y bg-gray-50 lg:divide-y-0 lg:bg-transparent "
            )}
          >
            {items.map((item, i) => {
              const title = item.title
              return (
                <Link
                  key={i}
                  className="before:conten-[''] relative order-2  mx-[25px]  hidden max-w-[200px] flex-1 flex-shrink-0 scale-100  flex-col items-center  bg-[#f5f6f7] p-3 transition-transform duration-700 will-change-transform  before:absolute before:inset-3  before:border  before:border-black hover:scale-110 hover:text-base-content lg:flex"
                  href={item.href}
                >
                  <div className="relative block max-h-[200px] w-full flex-1 flex-shrink-0 items-center pb-[100%] ">
                    <Image
                      alt={item.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-contain p-2"
                      sizes="200px"
                      width={200}
                      height={200}
                      src={item.image}
                    />
                  </div>
                  <div className="mt-2 flex flex-col items-center space-y-2 pb-3 text-center uppercase leading-tight">
                    <div className="font-heading text-[1em]">
                      <T>{title}</T>
                    </div>
                    <div className="btn btn-outline btn-xs whitespace-nowrap rounded-none">
                      <T>{"Click here"}</T>
                    </div>
                  </div>
                </Link>
              )
            })}
          </ul>
        </Container>
      </div>
    </div>
  )
}
const MenuCotentAccessories = ({ items, href, title }) => {
  return (
    <div className=" group isolate h-[60px] pr-8">
      <Link
        className="flex h-[60px] items-baseline justify-between uppercase leading-[60px] lg:justify-start"
        href={href}
      >
        <T>{title}</T>
        <svg
          className="mt-1 inline text-sm"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 320 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
        </svg>
      </Link>
      <div className=" invisible absolute left-0 right-0 z-[-1] hidden border-b border-opacity-50 bg-gray-200 leading-loose opacity-0 transition-[opacity,margin] duration-500 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 lg:block lg:bg-white lg:py-10 lg:shadow">
        <Container flush className="mx-auto flex w-full justify-center gap-6">
          <ul
            className={clsx(
              "flex w-full items-center  justify-center gap-6 divide-y bg-gray-50 lg:divide-y-0 lg:bg-transparent "
            )}
          >
            {items.map((item, i) => {
              const title = item.title
              return (
                <Link
                  key={i}
                  className="before:conten-[''] relative order-2 mx-[25px]  hidden  h-full max-w-[200px] flex-1 flex-shrink-0 scale-100  flex-col items-center  bg-[#f5f6f7] p-3 transition-transform duration-700 will-change-transform  before:absolute before:inset-3  before:border  before:border-black hover:scale-110 hover:text-base-content lg:flex"
                  href={item.href}
                >
                  <div className="relative block max-h-[200px] w-full flex-1 flex-shrink-0 items-center pb-[100%] ">
                    <Image
                      alt={item.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-contain p-2"
                      sizes="200px"
                      width={200}
                      height={200}
                      src={item.image}
                    />
                  </div>
                  <div className="mt-2 flex flex-col items-center space-y-2 pb-3 text-center uppercase leading-tight">
                    <div className="font-heading text-[1em]">
                      <T>{title}</T>
                    </div>
                    <div className="btn btn-outline btn-xs whitespace-nowrap rounded-none">
                      <T>{"Click here"}</T>
                    </div>
                  </div>
                </Link>
              )
            })}
          </ul>
        </Container>
      </div>
    </div>
  )
}
const MenuCotentAbout = ({ href, title }) => {
  return (
    <div className=" group isolate h-[60px] pr-8">
      <Link
        className="flex h-[60px] items-baseline justify-between uppercase leading-[60px] lg:justify-start"
        href={href}
      >
        <T>{title}</T>

        <svg
          className="mt-1 inline text-sm"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 320 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
        </svg>
      </Link>
      <div className=" invisible absolute left-0 right-0 z-[-1] hidden border-b border-opacity-50 bg-gray-200 leading-loose opacity-0 transition-[opacity,margin] duration-500 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 lg:block lg:bg-white lg:py-10 lg:shadow">
        <Container flush className="mx-auto flex w-full justify-center gap-6">
          <ul
            className={clsx(
              "flex w-full items-baseline  justify-center gap-6 divide-y bg-gray-50 uppercase lg:divide-y-0 lg:bg-transparent"
            )}
          >
            <Link
              className="flex max-w-[200px] flex-1 flex-col items-center"
              href={"/about"}
            >
              <div className="h-[50px] w-[50px] bg-[url(/_next/static/media/mobelaris-icons.a6210b34.webp)] bg-[-89px_-32px] bg-no-repeat" />
              <div className="text-[1em]">
                <T>{"About"}</T>
              </div>
            </Link>
            <Link
              className="flex max-w-[200px] flex-1 flex-col items-center"
              href={"/trade"}
            >
              <div className="h-[50px] w-[50px] bg-[url(/_next/static/media/mobelaris-icons.a6210b34.webp)] bg-[-240px_-38px] bg-no-repeat" />
              <div className="text-[1em]">
                <T>{"Trade"}</T>
              </div>
            </Link>
            <Link
              className="flex max-w-[200px] flex-1 flex-col items-center"
              href={"/contact-us"}
            >
              <div className="h-[50px] w-[50px] bg-[url(/_next/static/media/mobelaris-icons.a6210b34.webp)] bg-[-185px_-38px] bg-no-repeat" />
              <div className="text-[1em]">
                <T>{"Contact"}</T>
              </div>
            </Link>
          </ul>
        </Container>
      </div>
    </div>
  )
}
const DesignerMenu = ({ items, title = "Desgigners", href = "/designers" }) => {
  return (
    <div className=" group isolate h-[60px] pr-8">
      <Link
        className="flex h-[60px] items-baseline justify-between uppercase leading-[60px] lg:justify-start"
        href={href}
      >
        <T>{title}</T>

        <svg
          className="mt-1 inline text-sm"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 320 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
        </svg>
      </Link>
      <MenuWrap className="invisible absolute left-0 right-0 z-[-1] hidden border-b border-opacity-50 bg-gray-200 leading-loose opacity-0 transition-[opacity,margin] duration-500 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 lg:block lg:bg-white lg:py-10 lg:shadow">
        <ul className="mx-auto grid w-full list-none grid-cols-2 content-center justify-center gap-x-3 gap-y-1 px-4 sm:px-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {items.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <li
                  key={i}
                  className="min-h-[33px] w-[200px] px-[25px] py-1 leading-snug"
                >
                  <Link
                    prefetch={false}
                    className="whitespace-pre-line"
                    href={`/${item.handle}`}
                  >
                    {item.title}
                  </Link>
                </li>
              </React.Fragment>
            )
          })}
        </ul>
      </MenuWrap>
    </div>
  )
}
const NavbarStateless = ({ data }) => {
  const renderMenuMap = {
    Chairs: ({ data: { key, ...rest } }) => <Chairsmenu key={key} {...rest} />,
    Tables: ({ data: { key, ...rest } }) => <Tablesmenu key={key} {...rest} />,
    Sofa: ({ data: { key, ...rest } }) => (
      <MenuCotentSofa key={key} {...rest} />
    ),
    Storage: ({ data: { key, ...rest } }) => (
      <MenuCotentStorage key={key} {...rest} />
    ),
    Lighting: ({ data: { key, ...rest } }) => (
      <MenuCotentLighting key={key} {...rest} />
    ),
    Accessories: ({ data: { key, ...rest } }) => (
      <MenuCotentAccessories key={key} {...rest} />
    ),
    About: ({ data: { key, ...rest } }) => (
      <MenuCotentAbout key={key} {...rest} />
    ),
    designers: ({ data: { key, ...rest } }) => null,
  }
  return (
    <nav
      aria-label="Primary Navigation"
      className="pointer-events-auto max-h-screen w-full "
    >
      <ul
        className="mx-auto flex min-h-[60px] !max-w-none flex-col flex-wrap justify-center bg-white lg:flex-row lg:items-center"
        role="menubar"
      >
        {data.map((item, i) => {
          return <li key={i}>{renderMenuMap[item.key]({ data: item })}</li>
        })}
        <li>
          <Link
            className="relative  flex h-[60px]  items-center uppercase before:absolute before:left-[20px] before:top-1/2 before:h-2 before:w-[80px] before:translate-y-full before:transform before:bg-[url(/_next/static/media/mobelaris-icons.a6210b34.webp)] before:bg-[-359px_0] before:bg-no-repeat before:content-['']"
            href="/express-delivery"
          >
            <T>{"EXPRESS DELIVERY"}</T>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default async function Navbar() {
  const images = {}
  const data = [
    {
      title: "Chairs",
      key: "Chairs",
      href: "/chairs",
      images: [images?.chairimage || chairimage.src],
      items: [
        {
          title: "Armchairs",
          key: "Armchairs",
          href: "/modern-armchairs",
        },
        {
          title: "Dining Chairs",
          key: "Dining Chairs",
          href: "/dining-chairs",
        },
        {
          title: "High Back Chairs",
          key: "High Back Chairs",
          href: "/modern-high-armchairs",
        },
        {
          title: "Lounge Chair",
          key: "Lounge Chair",
          href: "/modern-lounge-chairs",
        },
        {
          title: "Bar Stools",
          key: "Bar Stools",
          href: "/modern-bar-stools",
        },
        {
          title: "Stools",
          key: "Stools",
          href: "/modern-stools",
        },
        {
          title: "Modern Rocking Chairs",
          key: "Modern Rocking Chairs",
          href: "/modern-rocking-chairs",
        },
        {
          title: "Office Chairs",
          key: "Office Chairs",
          href: "/modern-office-chair",
        },
        {
          title: "Modern Benches",
          key: "Modern Benches",
          href: "/modern-bench",
        },
      ],
    },
    {
      title: "Tables",
      key: "Tables",
      href: "/tables",
      images: [tableimage.src],
      items: [
        {
          title: "Dining Tables",
          key: "Dining Tables",
          href: "/modern-tables/modern-dining-tables",
        },
        {
          title: "Modern Coffee Table",
          key: "Modern Coffee Table",
          href: "/modern-tables/modern-coffee-tables",
        },
        {
          title: "Side Tables",
          key: "Side Tables",
          href: "/modern-tables/side-tables",
        },
        {
          title: "Desks",
          key: "Desks",
          href: "/modern-tables/modern-desk",
        },
        {
          title: "Conference Table",
          key: "Conference Table",
          href: "/modern-tables/conference-table",
        },
      ],
    },
    {
      title: "Sofa",
      key: "Sofa",
      href: "/sofas",
      images: [sofaiamge.src],
      items: [
        {
          title: "Arm Chairs",
          key: "Arm Chairs",
          href: "/modern-armchairs",
        },
        {
          title: "Small & 2 Seater Sofas",
          key: "Small & 2 Seater Sofas",
          href: "/sofas/2-seat-sofas",
        },

        {
          title: "Corner Sofas",
          key: "Corner Sofas",
          href: "/sofas/l-shape-sofas",
        },
        {
          title: "Chaise Lounge",
          key: "Chaise Lounge",
          href: "/modern-sofas/chaise-longue-day-beds",
        },
        {
          title: "3 Seater Sofas",
          key: "3 Seater Sofas",
          href: "/sofas/3-seat-sofas",
          image: threeseats.src,
        },
        {
          title: "Day Beds",
          key: "Day Beds",
          href: "/modern-sofas/chaise-longue-day-beds",
          image: daybed.src,
        },
      ],
    },
    {
      title: "Lighting",
      key: "Lighting",
      href: "/lighting",
      items: [
        {
          title: "Table Lamps",
          key: "Table Lamps",
          href: "/table-lamps",

          image: "/images/table_lamps.png",
        },
        {
          title: "Floor Lamps",
          key: "Floor Lamps",
          href: "/floor-lamps",

          image: "/images/floor_lamps.png",
        },
        {
          title: "Ceiling Lights",
          key: "Ceiling Lights",
          href: "/pendant-lighting",

          image: "/images/pendant_lights.png",
        },
        {
          title: "Wall Lamps",
          key: "Wall Lamps",
          href: "/wall-lamps",

          image: "/images/wall_lights.png",
        },
      ],
    },
    {
      title: "Storage",
      key: "Storage",
      href: "/storage",
      images: [storageimage.src],
      items: [
        {
          title: "Sideboards",
          key: "Sideboards",
          href: "/sideboards",
        },
        {
          title: "Display Cabinet",
          key: "Display Cabinet",
          href: "/display-cabinet",
        },
        {
          title: "Chest of Drawers",
          key: "Chest of Drawers",
          href: "/chest-of-drawers",
        },
        {
          title: "Cabinets",
          key: "Cabinets",
          href: "/cabinets",
        },
        {
          title: "Modern TV Unit",
          key: "Modern TV Unit",
          href: "/modern-tv-unit",
        },
      ],
    },
    {
      title: "Accessories",
      key: "Accessories",
      href: "/accessories",
      items: [
        {
          title: "Coat Hooks & Stands",
          key: "Coat Hooks & Stands",
          href: "/accessories/gear",
          image: "/images/coat_hook.png",
        },
        {
          title: "Clocks",
          key: "Clocks",
          href: "/designer-clock",
          image: "/images/classic_clocks.png",
        },
      ],
    },
    {
      title: "About",
      key: "About",
      href: "/about",
      items: [
        {
          title: "  ABOUT ",
          key: "ABOUT",
          href: "/about",
        },
        {
          title: "  TRADE ",
          key: "TRADE",
          href: "/trade",
        },
        {
          title: "  CONTACT ",
          key: "CONTACT",
          href: "/contact-us",
        },
      ],
    },
    {
      title: "designers",
      key: "designers",
      handle: "#",
      items: [
        {
          title: "DESIGNERS",
          key: "DESIGNERS",
          handle: "#",
        },
        {
          title: "A and P Castiglioni",
          key: "A and P Castiglioni",
          handle: "a-and-p-castiglioni",
        },
        {
          title: "Alvar Aalto",
          key: "Alvar Aalto",
          handle: "alvar-aalto-furniture",
        },
        {
          title: "Anna Castelli Ferrieri",
          key: "Anna Castelli Ferrieri",
          handle: "anna-castelli-ferrieri-furniture",
        },
        {
          title: "Arne Jacobsen",
          key: "Arne Jacobsen",
          handle: "arne-jacobsen-reproduction-furniture-designer",
        },
        {
          title: "August Thonet",
          key: "August Thonet",
          handle: "reproduction-august-thonet-furniture",
        },
        {
          title: "Bertjan Pot",
          key: "Bertjan Pot",
          handle: "bertjan-pot",
        },
        {
          title: " Børge Mogensen",
          key: " Børge Mogensen",
          handle: "reproduction-borge-mogensen-furniture",
        },
        {
          title: "Carlo Mollino",
          key: "Carlo Mollino",
          handle: "carlo-mollino-furniture",
        },
        {
          title: "Charles Eames",
          key: "Charles Eames",
          handle: "reproduction-charles-eames-furniture",
        },
        {
          title: "Christian Dell",
          key: "Christian Dell",
          handle: "christian-dell-furniture",
        },
        {
          title: "Draga Obradovic & Aurel K. Basedow",
          key: "Draga Obradovic & Aurel K. Basedow",
          handle: "draga-laurel",
        },
        {
          title: "Ebbe Gehl & Søren Nissen ",
          key: "Ebbe Gehl & Søren Nissen ",
          handle: "ebbe-gehl-soren-nissen",
        },
        {
          title: "Eero Aarnio",
          key: "Eero Aarnio",
          handle: "reproduction-eero-arnio-furniture",
        },
        {
          title: "Eero Saarinen",
          key: "Eero Saarinen",
          handle: "reproduction-eero-saarinen-furniture",
        },
        {
          title: "Eileen Gray",
          key: "Eileen Gray",
          handle: "reproduction-eileen-gray-furniture",
        },
        {
          title: "Erik Buch",
          key: "Erik Buch",
          handle: "reproduction-erik-buch-furniture",
        },
        {
          title: "Fabricius and Kastholm",
          key: "Fabricius and Kastholm",
          handle: "fabricius-and-kastholm",
        },
        {
          title: "Finn Juhl",
          key: "Finn Juhl",
          handle: "finn-juhl",
        },
        {
          title: "Florence Knoll",
          key: "Florence Knoll",
          handle: "florence-knoll",
        },
        {
          title: "Gabriele & Oscar Buratti",
          key: "Gabriele & Oscar Buratti",
          handle: "gabriele-and-oscar-buratti",
        },
        {
          title: "George Nelson",
          key: "George Nelson",
          handle: "george-nelson",
        },
        {
          title: "Gino Sarfatti",
          key: "Gino Sarfatti",
          handle: "gino-sarfatti",
        },
        {
          title: "Grant Featherston",
          key: "Grant Featherston",
          handle: "grant-featherston",
        },
        {
          title: "Greta Grossman",
          key: "Greta Grossman",
          handle: "greta-grossman",
        },
        {
          title: "Hans J. Wegner",
          key: "Hans J. Wegner",
          handle: "hans-j-wegner-furniture",
        },
        {
          title: "Harry Bertoia",
          key: "Harry Bertoia",
          handle: "reproduction-harry-bertoia-furniture",
        },
        {
          title: "Isamu Noguchi",
          key: "Isamu Noguchi",
          handle: "isamu-noguchi-furniture",
        },
        {
          title: "Jean Prouvé",
          key: "Jean Prouvé",
          handle: "jean-prouve",
        },
        {
          title: "Jens Risom",
          key: "Jens Risom",
          handle: "jens-risom",
        },
        {
          title: "Jo Hammerborg",
          key: "Jo Hammerborg",
          handle: "jo-hammerborg",
        },
        {
          title: "Juha Ilmari Leiviskä",
          key: "Juha Ilmari Leiviskä",
          handle: "juha-ilmari-leiviska",
        },
        {
          title: "Jørn Oberg Utzon",
          key: "Jørn Oberg Utzon",
          handle: "jorn-oberg-utzon",
        },
        {
          title: "Kai Kristiansen",
          key: "Kai Kristiansen",
          handle: "kai-kristiansen",
        },
        {
          title: "Le Corbusier",
          key: "Le Corbusier",
          handle: "reproduction-le-corbusier-designer-furniture",
        },
        {
          title: "Marcel Breuer",
          key: "Marcel Breuer",
          handle: "marcel-breuer",
        },
        {
          title: "Mariano Fortuny y Madrazo",
          key: "Mariano Fortuny y Madrazo",
          handle: "mariano-fortuny-y-madrazo",
        },
        {
          title: "Mark Stam",
          key: "Mark Stam",
          handle: "mark-stam",
        },
        {
          title: "Michael Thonet",
          key: "Michael Thonet",
          handle: "michael-thonet",
        },
        {
          title: "Mies Van Der Rohe",
          key: "Mies Van Der Rohe",
          handle: "mies-van-der-rohe",
        },

        {
          title: "Nicolaj Nøddesbo & Tommy Hyldahl",
          key: "Nicolaj Nøddesbo & Tommy Hyldahl",
          handle: "nicolaj-noddesbo-tommy-hyldahl",
        },
        {
          title: "Paulo Rizzatto",
          key: "Paulo Rizzatto",
          handle: "paulo-rizzatto",
        },
        {
          title: "Pierre Paulin",
          key: "Pierre Paulin",
          handle: "pierre-paulin",
        },
        {
          title: "Philippe Starck",
          key: "Philippe Starck",
          handle: "philippe-starck",
        },
        {
          title: "Poul Christiansen",
          key: "Poul Christiansen",
          handle: "poul-christiansen",
        },
        {
          title: "Poul Henningsen",
          key: "Poul Henningsen",
          handle: "poul-henningsen",
        },
        {
          title: "Poul Kjærholm",
          key: "Poul Kjærholm",
          handle: "poul-kjaerholm",
        },
        {
          title: "Poul Volther",
          key: "Poul Volther",
          handle: "poul-volther",
        },
        {
          title: "Robert Dudley Best",
          key: "Robert Dudley Best",
          handle: "robert-dudley-best",
        },
        {
          title: "Serge Mouille",
          key: "Serge Mouille",
          handle: "serge-mouille",
        },
        {
          title: "Sigurd Ressell",
          key: "Sigurd Ressell",
          handle: "sigurd-ressell",
        },
        {
          title: "Sori Yanagi",
          key: "Sori Yanagi",
          handle: "sori-yanagi",
        },
        {
          title: "Xavier Pauchard",
          key: "Xavier Pauchard",
          handle: "xavier-pauchard",
        },
        {
          title: "Verner Panton",
          key: "Verner Panton",
          handle: "reproduction-verner-panton-furniture",
        },
        {
          title: "Vico Magistretti",
          key: "Vico Magistretti",
          handle: "vico-magistretti",
        },
        {
          title: "Warren Platner",
          key: "Warren Platner",
          handle: "warren-platner",
        },
        {
          title: "Wilhelm Wagenfeld",
          key: "Wilhelm Wagenfeld",
          handle: "wilhelm-wagenfeld",
        },
        {
          title: "Bernard Schottlander",
          key: "Bernard Schottlander",
          handle: "bernard-schottlander",
        },
        {
          title: "Bernard-Albin Gras",
          key: "Bernard-Albin Gras",
          handle: "bernard-albin-gras",
        },
        {
          title: "Louis Weisdorf",
          key: "Louis Weisdorf",
          handle: "louis-weisdorf",
        },
        {
          title: "Mario Bellini",
          key: "Mario Bellini",
          handle: "mario-bellini",
        },
        {
          title: "Shin and Tomoko Azumi",
          key: "Shin and Tomoko Azumi",
          handle: "shin-and-tomoko-azumi-furniture",
        },
      ],
    },
  ]

  return <NavbarStateless data={data} />
}

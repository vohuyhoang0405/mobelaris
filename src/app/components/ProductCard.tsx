import { T } from "app/[locale]/context/sources"
import clsx from "clsx"
import dynamic from "next/dynamic"
import { SaleLabel } from "./SaleLabel"

const FormatPrice = dynamic(() => import("./FormatPrice"))
const Image = dynamic(() => import("./Image"))
const Link = dynamic(() => import("./Link"))
const ProductLable = dynamic(() => import("./ProductLable"))

const ProductCard = ({
  salepercent,
  url,
  title,
  image1,
  image2,
  original_price,
  calculated_price,
  select_guarantee,
  className,
}: {
  salepercent?: string
  url?: string
  title: string
  image1?: string
  image2?: string
  original_price?: string
  calculated_price?: string
  select_guarantee?: string
  className?: string
}) => {
  return (
    <div
      className={clsx(
        "min-h-full w-full bg-white transition-shadow duration-500 hover:border-gray-100 hover:shadow-[0_0_10px_2px_rgba(0,0,0,.1)] hover:shadow-gray-300",
        className
      )}
    >
      <div className="relative">
        {salepercent && (
          <div className="absolute right-2 top-2  z-10  aspect-square  w-[25%]  max-w-[70px]  text-white before:block  before:w-full  before:pt-[100%]">
            <SaleLabel salepercent={salepercent} />
          </div>
        )}
        {select_guarantee && (
          <div className=" absolute left-2 top-2  z-10  aspect-square  w-[25%]  max-w-[70px]  text-[#707070]  before:block  before:w-full  before:pt-[100%]">
            <div className="absolute inset-0 h-full w-full rounded-full">
              <ProductLable type={select_guarantee} />
            </div>
          </div>
        )}
        <Link className="block " href={url}>
          <div className="group p-[4%]  ">
            <div className="relative ">
              <div
                className="! relative  mx-auto  w-full"
                style={{ paddingBottom: "100%", maxWidth: 882 }}
              >
                <Image
                  alt={title}
                  width={800}
                  height={800}
                  className="absolute inset-0 h-full w-full border-none object-contain"
                  sizes="(min-width: 1440px) 800px, (min-width: 1200px) 800px, (min-width: 990px) 600px, (min-width: 750px) 400px, 400px"
                  src={image1}
                />
                {image2 && (
                  <Image
                    height={800}
                    width={800}
                    alt={title}
                    priority
                    className="absolute inset-0 hidden h-full w-full  border-none  bg-white  object-contain group-hover:block"
                    sizes="(min-width: 1440px) 800px, (min-width: 1200px) 800px, (min-width: 990px) 600px, (min-width: 750px) 400px, 400px"
                    src={image2}
                  />
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex flex-col items-center p-3 pt-0 text-center">
        <Link href={url} className="js-product-details-link">
          <h3 className=" m-0 flex font-title hover:text-primary  lg:text-[20px]">
            {title}
          </h3>
        </Link>
        <dl className="price price--listing price--on-sale ">
          <div className="mt-2 flex flex-col items-center gap-1 pb-3">
            <span className="text-xs leading-none">
              <T>From</T>
            </span>
            <span className="price-item price-item--sale text-lg font-bold leading-none text-[#dc9d2d]">
              <FormatPrice amount={calculated_price} />
            </span>
            <span className="mt-1 text-xs leading-none">
              <T>Normal price</T>
            </span>
            <span className="price-item price-item--regular text-sm font-bold leading-none text-gray-500 line-through">
              <FormatPrice amount={original_price} />
            </span>
          </div>
          <div className="price__unit">
            <dt>
              <span className="hidden ">Unit Price</span>
            </dt>
          </div>
        </dl>
      </div>
    </div>
  )
}
export default ProductCard

"use client"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import { LineItem, Region } from "@medusajs/medusa"
import { useT } from "app/[locale]/context/sources"
import Image from "app/components/Image"
import Link from "app/components/Link"
import LineItemOptions from "app/components/common/line-item-options"
import LineItemPrice from "app/components/common/line-item-price"
import { repalceImage } from "app/helper/image/loader"
import { CalculatedVariant } from "types/medusa"

type ItemsProps = {
  items: LineItem[]
  region: Region
  cartId: string
}

const Items = ({ items, region, cartId }: ItemsProps) => {
  const enrichedItems = useEnrichedLineItems(items, cartId)
  const t = useT()
  return (
    <div className="flex flex-col gap-y-4 border-b border-gray-200 p-10">
      {enrichedItems?.map((item) => {
        return (
          <div className="grid grid-cols-[122px_1fr] gap-x-4" key={item.id}>
            <div className="w-[122px]">
              <div
                className="relative w-full"
                style={{ paddingBottom: "61.91304347826087%" }}
              >
                <Image
                  sizes="200px"
                  className="lazyload-fade lazyautosizes lazyloaded absolute inset-0 h-full w-full bg-transparent object-contain"
                  data-sizes="auto"
                  alt={item.title + " image"}
                  src={
                    item.variant?.metadata?.images?.find((item) => item) ||
                    repalceImage(item.thumbnail)
                  }
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div className="text-small-regular flex flex-1 flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base-regular mr-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      <Link href={`/products/${item.variant.product.handle}`}>
                        {item.title}
                      </Link>
                    </h3>
                    <LineItemOptions variant={item.variant} />
                    <span>
                      {t("Quantity")}: {item.quantity}
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <LineItemPrice
                      quantity={item.quantity}
                      region={region}
                      variant={item.variant as CalculatedVariant}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Items

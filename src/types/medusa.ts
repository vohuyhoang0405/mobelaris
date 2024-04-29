import {
  Product as MedusaProduct,
  Region as MedusaRegion,
  ProductOption,
  ProductVariant,
} from "@medusajs/medusa"

interface Option {
  id: string
  index: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  name: string
  position: number
  option_values: OptionValue[]
}

interface OptionValue {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  option_id: string
  name: string
  position: number
}
export type Variant = Omit<ProductVariant, "beforeInsert"> & {
  original_price: number
  calculated_price: number
  calculated_price_type: string
  original_price_incl_tax: number
  calculated_price_incl_tax: number
  original_tax: number
  calculated_tax: number
  option1: string
  option2: string
  option3: string
  displayTitle: string
  soldout?: boolean
  images: {
    alt: string
    src: string
  }[]
  price_formated: {
    original_price: number
    calculated_price: number
  }
  metadata: {
    // "color": "natural",
    // "handle": "beech-style-wishbone-y-chair-hans-wegner-natural-cord",
    // "images": [
    //   "https://res.cloudinary.com/dfgbpib38/image/upload/e_trim/media/catalog/product/w/a/wart.jpg",
    //   "https://res.cloudinary.com/dfgbpib38/image/upload/e_trim/media/catalog/product/5/a/5aa00fe8750bc.jpg",
    //   "https://res.cloudinary.com/dfgbpib38/image/upload/e_trim/media/catalog/product/w/i/wishbone_ash_-_artichoke_-_tulip_round_marble_01_1.png",
    //   "https://res.cloudinary.com/dfgbpib38/image/upload/e_trim/media/catalog/product/5/a/5aa00fe874c6b.jpg",
    //   "https://res.cloudinary.com/dfgbpib38/image/upload/e_trim/media/catalog/product/5/a/5aa00fe874e99.jpg"
    // ],
    // "in_stock": 1,
    // "leadtime": "BUY NOW 10+ DUE IN 9th AUGUST",
    // "material": "beech",
    // "heading_1": "A UNIQUE PIECE IN YOUR HOME",
    // "heading_2": "Designed as per the original",
    // "description": "<table class=\"no-border\">\r\n<tbody>\r\n<tr>\r\n<td style=\"border: none;\">\r\n<ul>\r\n<li style=\"text-align: left;\"><p style=\"font-weight:bold;\">Frame:</p> Solid Beech</li>\r\n<li style=\"text-align: left;\"><p style=\"font-weight:bold;\">Design:</p> As Per Original, Back Rest One Piece Of Bent Solid Wood</li>\r\n<li style=\"text-align: left;\"><p style=\"font-weight:bold;\">Finish:</p> Natural Matt Oil </li>\r\n<li style=\"text-align: left;\"><p style=\"font-weight:bold;\">Seat:</p> Paper Cord (As Per Original)</li>\r\n<li style=\"text-align: left;\"><p style=\"font-weight:bold;\">Warranty:</p> 5 Years</li>\r\n</ul>\r\n</td>\r\n<td style=\"border: none;\">\r\n<ul>\r\n<li style=\"text-align: left;\"><p style=\"font-weight:bold;\">Assembled:</p> Fully Assembled</li>\r\n<li style=\"text-align: left;\"><p style=\"font-weight:bold;\">Instructions:</p> N/A</li>\r\n<li style=\"text-align: left;\"><p style=\"font-weight:bold;\">Clean:</p> Dust / Spot Clean / Oil</li>\r\n<li style=\"text-align: left;\"><p style=\"font-weight:bold;\">Style:</p> Classic Danish Favourite</li>\r\n</ul>\r\n</td>\r\n</tr>\r\n</tbody>\r\n</table>",
    // "dimension_image": "https://res.cloudinary.com/dfgbpib38/image/upload/e_trim/media/catalog/product/w/i/wishbone_oak_natural_cord_dim_01_9.png",
    // "description_image_1": "https://res.cloudinary.com/dfgbpib38/image/upload/f_auto/media/catalog/product//p/9/p9p.jpg",
    // "description_image_2": "https://res.cloudinary.com/dfgbpib38/image/upload/f_auto/media/catalog/product//y/u/yui_1_1.jpg",
    // "product_information": "<ul>\r\n<li><p style=\"font-weight:bold;\">Dimension:</p> Width 52cm, Depth 53cm, Height 73cm</li>\r\n<li><p style=\"font-weight:bold;\">Dimension Detail:</p> Base Width 43cm, Seat Arm Width 54.5cm, Leg Height 47.5cm</li>\r\n<li><p style=\"font-weight:bold;\">Seat Dimension:</p> Height 43cm Approx </li>\r\n<li><p style=\"font-weight:bold;\">Packing Dimension:</p> Width 54cm, Depth 57cm, Height 77cm</li>\r\n<li><p style=\"font-weight:bold;\">CBM:</p> 0.237 <p style=\"font-weight:bold;\"> Product Weight:</p> 7.5kg</li>\r\n</ul>"
    handle: string
    color: string
    images: string[]
    in_stock: number
    leadtime: string
    material: string
    product_information: string
    heading_1: string
    heading_2: string
    dimension_image: string
    description: string
    description_image_1: string
    description_image_2: string
  }
  options: Option[]
}
export interface Product extends Omit<MedusaProduct, "variants"> {
  variants: Variant[]
  handle: string
  inspiredOfInformation: string
  translations?: {
    key: string
    value: string
  }[]
  price: {
    calculated_price: number
    original_price: number
  }
  options: (ProductOption & {
    name: string
    type: "color" | "default"
  })[]
  metadata: {
    // "guarantee": "As per original Dining Chair",
    // "inspiredOf": "Hans J. Wegner",
    // "description": "<table class=\"no-border\">\r\n<tbody>\r\n<tr>\r\n<td style=\"border: none;\">\r\n<ul>\r\n<li style=\"text-align: left;\"><p style=\"font-weight:bold;\">Frame:</p> Wood Painted Color, Beech, Ash, Oak, Walnut</li>\r\n<li style=\"text-align: left;\"><p style=\"font-weight:bold;\">Legs:</p> Wood Painted Color, Beach, Ash, Oak, Walnut</li>\r\n<li style=\"text-align: left;\"><p style=\"font-weight:bold;\">Seat:</p> Paper Cord (As Per Original)</li>\r\n<li style=\"text-align: left;\"><p style=\"font-weight:bold;\">Warranty:</p> 5 Years</li>\r\n</ul>\r\n</td>\r\n<td style=\"border: none;\">\r\n<ul>\r\n<li style=\"text-align: left;\"><p style=\"font-weight:bold;\">Assembled:</p> Fully Assembled</li>\r\n<li style=\"text-align: left;\"><p style=\"font-weight:bold;\">Instructions:</p> N/A</li>\r\n<li style=\"text-align: left;\"><p style=\"font-weight:bold;\">Clean:</p> Dust /  Spot Clean</li>\r\n</ul>\r\n</td>\r\n</tr>\r\n</tbody>\r\n</table>",
    // "product_type": "Dining Chairs",
    // "description_1": "<p>In 1949, Danish Designer Hans Wegner designed the Wishbone Chair, also known as the &ldquo;Y&rdquo; or CH24 Chair as a part of his Wagner series. Inspired by portraits of Danish merchants sitting in the Chinese Ming Dynasty Chairs. HJW steam formed the top backrest into a single piece. Looking at the back of the chair, it resembles a breastbone of a chicken, commonly known as the wishbone. With the semi-circular top rail and the curved hind legs, together with the elegantly shaped Y-back, the chair provides a welcoming airiness. An ideal chair as it fulfils the functional demands for comfort and stability while having distinctive features.</p>",
    // "description_2": "<p>Inspired by the original design of Hans Wegner in 1949, the Mobelaris Style of Wishbone (Y) Chair truly captures the essence of Danish mid-century modern design. Steam formed one-piece solid wood back and armrest as per the original model gives strength and comfort to this classic Wishbone. Mobelaris&rsquo;s model will last for years to come.&nbsp;</p>",
    // "dimension_image": "https://res.cloudinary.com/dfgbpib38/image/upload/e_trim/media/catalog/product/w/i/wishbone_oak_natural_cord_dim_01.png",
    // "select_guarantee": "As per original Dining Chair",
    // "magento_product_id": 2081,
    // "product_information": "<ul>\r\n<li><p style=\"font-weight:bold;\">Dimension:</p> Width 52cm, Depth 53cm, Height 73cm</li>\r\n<li><p style=\"font-weight:bold;\">Dimension Detail:</p> Base Width 43cm, Seat Arm Width 54.5cm, Leg Height 47.5cm</li>\r\n<li><p style=\"font-weight:bold;\">Seat Dimension:</p> Height 43cm Approx </li>\r\n<li><p style=\"font-weight:bold;\">Packing Dimension:</p> Width 54cm, Depth 57cm, Height 77cm</li>\r\n<li><p style=\"font-weight:bold;\">CBM:</p> 0.237 <p style=\"font-weight:bold;\"> Product Weight:</p> 7.5kg</li>\r\n</ul>",
    // "inspiredOfInformation": "Hans J Wegner (HJW) designs were a massive contribution to mid - century Danish design, using an era of materials from Hardwoods, Bent Veneered Ply and Upholstery HJW produced organic functionality, whilst still pushing design boundaries with shapes that still created functional seating requirements. Iconic designs such as the Y Chair, CH07 Chair, Ox Chair, Hoop are to name but a few, these however were only some of the pieces that made it into mass production. Not taken into consideration the 400+ other pieces that were designed for independent projects or not put into mass production.",
    // "google_product_category": "Furniture > Chairs"
    sku: string
    inspiredOf: string
    description: string
    product_type: string
    description_1: string
    description_2: string
    product_information: string
    inspiredOfInformation?: string
    guarantee: string
    dimension_image: string
    select_guarantee: string
    magento_product_id: number
    google_product_category?: string
    in_stock: number
    leadtime: string
    attachment: string
    material: string
  }
}

export interface Region extends Omit<MedusaRegion, "beforeInsert"> {}

export type CalculatedVariant = ProductVariant & {
  calculated_price: number
  calculated_price_type: "sale" | "default"
  original_price: number
}
export interface Collection {
  title: string
  handle: string
  searchTag: string
  id: string
  description: string
  metadata: {
    description: string
  }
}

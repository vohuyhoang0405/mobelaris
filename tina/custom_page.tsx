import { Collection } from "@tinacms/cli"

// let defaultData = {
//   hero: {
//     title: "Togo Style Sofa",
//     image:
//       "https://imageproxy.mobelaris.com/api/images/dfgbpib38/image/upload/e_trim/media/catalog/product/t/o/togo_style_2-seater_sofa_velvet_dark_red_02.png",
//     background:
//       "https://imageproxy.mobelaris.com/api/images/dfgbpib38/image/upload/e_trim/media/catalog/product/t/o/togo_style_2-seater_sofa_velvet_dark_red_02.png",
//     description:
//       "Mobelaris Togo Style Sofa Set is the perfect reproduction of the mid-century vintage classic by French seating designer, Michel Ducaroy. Want the warmth of comfort and nostalgia wrapped into a cushion of luxury? This is the set for you.",
//     description_2: "Inspired by: Mobelaris",
//     tabs: ["DESCRIPTION", "DIMENSION", "FAQs"],
//   },
//   products: {
//     title:
//       "Available online in 7 colors made completely from high-quality polyurethane foam.",
//     items: [],
//   },
//   productInspiration: {
//     title: "Sink Into Luxurious Vintage Comfort",
//     content: `The Togo Style Sofa is an iconic mid-century design that remains a coveted piece in modern times. It was designed by iconic French designer Michel Ducaroy in 1973 and was originally produced by a company in France.

//       Mobelaris Togo Style Combination Set is a high-quality reproduction of this beautiful vintage classic. Made with the finest polyurethane foam, and upholstered in luxurious microfibre fabric, the set comes in a variety of tasteful colours that you can choose from.

//       Nothing suggests comfort and relaxation than the mellowed vibes from this unique set. It features the same stylish curvature as the original giving it that cozy yet elegant bean bag design.

//       Be warned, you might not want to get up once you throw yourself into the plush cushions of the Togo Style Sofa.`,
//     "product-image": {
//       img: {
//         src: "https://imageproxy.mobelaris.com/api/images/dfgbpib38/image/upload/e_trim/media/catalog/product/t/o/togo_style_2-seater_sofa_velvet_dark_red_02.png",
//         alt: "product-specification-image",
//       },
//     },
//     images: [],
//   },
//   infomation: {
//     product_specification: {
//       title: "Product specification",
//       content: `<table class="no-border"><tbody><tr><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Frame:</p> Polyurethane Foam</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Style:</p> Mid Century Classic</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Upholtery:</p> Velvet Fabric</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Warraty:</p> 5 Years</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Specil:</p> Reproduced As Per Original</li></ul></td><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Assembly:</p> Fully Assembled</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Instructions:</p> Applicable</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Clean:</p> Dust / Light Vacuum</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Comment:</p> Complement with Togo Ottoman</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Comment:</p> Create Your Personal Comfort</li></ul></td></tr></tbody></table>`,
//     },
//     product_information: {
//       title: "PRODUCT INFORMATION",
//       content: `<table class="no-border"><tbody><tr><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Dimension:</p> Width 175cm, Depth 101cm, Height 70cm</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Seat Dimension:</p> Height 38cm (approximate)</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Packing Dimension:</p> Width 180cm, Depth 105cm, Height 75cm</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">CBM:</p> 1.418 Weight: 48kg</li></ul></td></tr></tbody></table>`,
//     },
//     image:
//       "https://imageproxy.mobelaris.com/api/images/dfgbpib38/image/upload/e_trim,w_1440,c_limit,q_auto,f_auto/media/catalog/product/t/o/togo_style_2-seater_sofa_velvet_dark_red_desc_01.png",
//   },
//   video: {
//     url: "https://fast.wistia.net/embed/iframe/jkvy2wy1kv?videoFoam=true",
//   },
//   faqs: {
//     title: "TOGO STYLE SOFA - FAQs",
//     description: "Find answers for common questions about Togo Style Sofa",
//     questions: [
//       {
//         question: "Is the fabric on the Togo Style Sofa washable?",
//         answer: "The upholstery is spot clean only.",
//       },
//       {
//         question: "How do you care for the Togo Style Sofa?",
//         answer:
//           "You can do daily dusting and light vacuuming on the Togo Style Sofas to maintain them.",
//       },
//       {
//         question: "Does the Togo Style Sofa have matte or satin sheen?",
//         answer: "Our Togo Style Sofas have a matte sheen.",
//       },
//       {
//         question: "What is the Togo Style Sofa made from?",
//         answer:
//           "The frame is made of multiple density UK fire foam. It is gloved with man-made wadding for extra comfort and upholstered in Creamy, Boucle, Alcantara, or Velvet.",
//       },
//       {
//         question: "Do you sell the Togo Style Sofa in sets?",
//         answer:
//           "We sell them separately so you can mix and match your Togo Style set to fit your space. Click [here](https://www.mobelaris.com/en/search/?q=togo) to browse and pick Togo Sofas.",
//       },
//       {
//         question: "Does it come with a warranty?",
//         answer: "Yes, our Togo Style Sofas come with a 5-year warranty.",
//       },
//     ],
//   },
//   "related-products": {
//     title: "Related Products",
//     items: [
//       {
//         title: "Wishbone (Y) Chair - CH24 - Orange - Natural Cord",
//         image:
//           "https://static.mobelaris.com/media/catalog/product/resize_img//5/a/5aa00fe87fe70_1_1.jpg",
//         url: "/orange-style-wishbone-y-chair-hans-wegner-natural-cord",
//         price: {
//           from: "£139.50",
//           regular: "£279.00",
//         },
//       },
//       {
//         title: "Wishbone (Y) Chair - CH24 - Soaped Oak - Black Cord",
//         image:
//           "https://static.mobelaris.com/media/catalog/product/resize_img//w/i/wishbone_soap_black_02.png",
//         url: "/soaped-oak-natural-cord-wishbone-y-chair-hans-wegner-1",
//         price: {
//           from: "£224.50",
//           regular: "£449.00",
//         },
//       },
//       {
//         title: "Wishbone (Y) Chair - CH24 - Purple - Natural Cord",
//         image:
//           "https://static.mobelaris.com/media/catalog/product/resize_img//5/a/5aa00fe88068d_1.jpg",
//         url: "/purple-style-wishbone-y-chair-hans-wegner-natural-cord",
//         price: {
//           from: "£111.60",
//           regular: "£279.00",
//         },
//       },
//     ],
//   },
// }

export const customPageCollection: Collection = {
  label: "Custom Page",
  name: "custom_page",
  path: "content/custom_page",
  format: "json",

  fields: [
    {
      label: "Product",
      name: "product",
      type: "object",
      ui: {
        defaultItem: {
          handle: "style-michel-ducaroy-mobelaris-comfort-style-2-seater-sofa",
        },
      },
      fields: [
        {
          label: "handle",
          name: "handle",
          type: "string",
        },
        {
          label: "collection",
          name: "collection",
          type: "string",
        },
      ],
    },
    {
      // {
      //   title: "Togo Style Sofa",
      //   image:
      //     "https://imageproxy.mobelaris.com/api/images/dfgbpib38/image/upload/e_trim/media/catalog/product/t/o/togo_style_2-seater_sofa_velvet_dark_red_02.png",
      //   background: bg,
      //   description:
      //     "Mobelaris Togo Style Sofa Set is the perfect reproduction of the mid-century vintage classic by French seating designer, Michel Ducaroy. Want the warmth of comfort and nostalgia wrapped into a cushion of luxury? This is the set for you.",
      //   description_2: "Inspired by: Mobelaris",
      //   tabs: ["DESCRIPTION", "DIMENSION", "FAQs"],
      // }
      label: "Hero",
      type: "object",

      name: "hero",
      ui: {
        defaultItem: {
          title: "Togo Style Sofa",
          image:
            "https://imageproxy.mobelaris.com/api/images/dfgbpib38/image/upload/e_trim/media/catalog/product/t/o/togo_style_2-seater_sofa_velvet_dark_red_02.png",
          background:
            "https://www.mobelaris.com/static/version1683613451/frontend/Mobelaris/Theme/en_GB/Alan_ProductLandingPage/images/togo/hero-bg.jpg",
          description:
            "Mobelaris Togo Style Sofa Set is the perfect reproduction of the mid-century vintage classic by French seating designer, Michel Ducaroy. Want the warmth of comfort and nostalgia wrapped into a cushion of luxury? This is the set for you.",
          description_2: "Inspired by: Mobelaris",
          tabs: ["DESCRIPTION", "DIMENSION", "FAQs"],
        },
      },
      fields: [
        {
          label: "title",
          name: "title",
          type: "string",
        },
        {
          label: "image",
          name: "image",
          type: "string",
        },
        {
          label: "background image",
          name: "background",
          type: "string",
        },
        {
          label: "description",
          name: "description",
          type: "rich-text",
        },
        {
          label: "description 2",
          name: "description_2",
          type: "rich-text",
        },
        {
          label: "tabs",
          name: "tabs",
          type: "string",
          list: true,
          options: ["DESCRIPTION", "GALLERY", "DIMENSION", "FAQs"],
        },
      ],
    },
    {
      label: "Products",
      name: "products",
      type: "object",
      ui: {
        defaultItem: {
          title:
            "Available online in 7 colors made completely from high-quality polyurethane foam.",
          button_text: "VIEW ALL",
          url: "/style-michel-ducaroy-mobelaris-comfort-style-2-seater-sofa",
        },
      },
      fields: [
        {
          label: "title",
          name: "title",
          type: "string",
        },
        {
          label: "description",
          name: "description",
          type: "string",
        },
        {
          label: "Button text",
          name: "button_text",
          type: "string",
        },
        {
          label: "Button url",
          name: "url",
          type: "string",
        },
        {
          label: "product",
          name: "handle",
          type: "string",
          list: true,
        },
      ],
    },
    {
      // productInspiration: {
      //   title: "Sink Into Luxurious Vintage Comfort",
      //   content:`The Togo Style Sofa is an iconic mid-century design that remains a coveted piece in modern times. It was designed by iconic French designer Michel Ducaroy in 1973 and was originally produced by a company in France.

      //     Mobelaris Togo Style Combination Set is a high-quality reproduction of this beautiful vintage classic. Made with the finest polyurethane foam, and upholstered in luxurious microfibre fabric, the set comes in a variety of tasteful colours that you can choose from.

      //     Nothing suggests comfort and relaxation than the mellowed vibes from this unique set. It features the same stylish curvature as the original giving it that cozy yet elegant bean bag design.

      //     Be warned, you might not want to get up once you throw yourself into the plush cushions of the Togo Style Sofa.`,
      //   "product-image": {
      //     img: {
      //       src: "https://imageproxy.mobelaris.com/api/images/dfgbpib38/image/upload/e_trim/media/catalog/product/t/o/togo_style_2-seater_sofa_velvet_dark_red_02.png",
      //       alt: "product-specification-image",
      //     },
      //   },
      //   images: [],
      // },
      label: "Product Inspiration",
      name: "productInspiration",
      type: "object",
      ui: {
        defaultItem: {
          title: "Sink Into Luxurious Vintage Comfort",
          content: `The Togo Style Sofa is an iconic mid-century design that remains a coveted piece in modern times. It was designed by iconic French designer Michel Ducaroy in 1973 and was originally produced by a company in France.`,
        },
      },
      fields: [
        {
          label: "title",
          name: "title",
          type: "string",
        },
        {
          lable: "content",
          name: "content",
          type: "rich-text",
        },
        {
          label: "product_image",
          name: "product_image",
          type: "string",

          list: true,
        },
      ],
    },
    {
      //   infomation: {
      //     product_specification: {
      //       title: "Product specification",
      //       content: `<table class="no-border"><tbody><tr><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Frame:</p> Polyurethane Foam</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Style:</p> Mid Century Classic</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Upholtery:</p> Velvet Fabric</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Warraty:</p> 5 Years</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Specil:</p> Reproduced As Per Original</li></ul></td><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Assembly:</p> Fully Assembled</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Instructions:</p> Applicable</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Clean:</p> Dust / Light Vacuum</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Comment:</p> Complement with Togo Ottoman</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Comment:</p> Create Your Personal Comfort</li></ul></td></tr></tbody></table>`,
      //     },
      //     product_information: {
      //       title: "PRODUCT INFORMATION",
      //       content: `<table class="no-border"><tbody><tr><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Dimension:</p> Width 175cm, Depth 101cm, Height 70cm</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Seat Dimension:</p> Height 38cm (approximate)</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Packing Dimension:</p> Width 180cm, Depth 105cm, Height 75cm</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">CBM:</p> 1.418 Weight: 48kg</li></ul></td></tr></tbody></table>`,
      //     },
      //     image:
      //       "https://imageproxy.mobelaris.com/api/images/dfgbpib38/image/upload/e_trim,w_1440,c_limit,q_auto,f_auto/media/catalog/product/t/o/togo_style_2-seater_sofa_velvet_dark_red_desc_01.png",
      //   },

      label: "Information",
      name: "infomation",
      type: "object",
      ui: {
        defaultItem: {
          product_specification: {
            title: "Product specification",
            content: `<table class="no-border"><tbody><tr><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Frame:</p> Polyurethane Foam</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Style:</p> Mid Century Classic</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Upholtery:</p> Velvet Fabric</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Warraty:</p> 5 Years</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Specil:</p> Reproduced As Per Original</li></ul></td><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Assembly:</p> Fully Assembled</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Instructions:</p> Applicable</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Clean:</p> Dust / Light Vacuum</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Comment:</p> Complement with Togo Ottoman</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Comment:</p> Create Your Personal Comfort</li></ul></td></tr></tbody></table>`,
          },
          product_information: {
            title: "PRODUCT INFORMATION",
            content: `<table class="no-border"><tbody><tr><td style="border: none;"><ul><li style="text-align: left;"><p style=\"font-weight:bold;\">Dimension:</p> Width 175cm, Depth 101cm, Height 70cm</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Seat Dimension:</p> Height 38cm (approximate)</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">Packing Dimension:</p> Width 180cm, Depth 105cm, Height 75cm</li> <li style="text-align: left;"><p style=\"font-weight:bold;\">CBM:</p> 1.418 Weight: 48kg</li></ul></td></tr></tbody></table>`,
          },
          image:
            "https://imageproxy.mobelaris.com/api/images/dfgbpib38/image/upload/e_trim,w_1440,c_limit,q_auto,f_auto/media/catalog/product/t/o/togo_style_2-seater_sofa_velvet_dark_red_desc_01.png",
        },
      },
      fields: [
        {
          label: "product_specification",
          name: "product_specification",
          type: "object",
          fields: [
            {
              label: "title",
              name: "title",
              type: "string",
            },
            {
              label: "content",
              name: "content",
              type: "rich-text",
            },
          ],
        },
        {
          label: "product_information",
          name: "product_information",
          type: "object",
          fields: [
            {
              label: "title",
              name: "title",
              type: "string",
            },
            {
              label: "content",
              name: "content",
              type: "rich-text",
            },
          ],
        },
        {
          label: "image",
          name: "image",
          type: "string",
        },
      ],
    },
    {
      //   video: {
      //     url: "https://fast.wistia.net/embed/iframe/jkvy2wy1kv?videoFoam=true",
      //   },

      label: "Video",
      name: "video",
      type: "object",
      ui: {
        defaultItem: {
          url: "https://fast.wistia.net/embed/iframe/jkvy2wy1kv?videoFoam=true",
        },
      },
      fields: [
        {
          label: "url",
          name: "url",
          type: "string",
        },
      ],
    },
    {
      //   faqs: {
      //     title: "TOGO STYLE SOFA - FAQs",
      //     description: "Find answers for common questions about Togo Style Sofa",
      //     questions: [
      //       {
      //         question: "Is the fabric on the Togo Style Sofa washable?",
      //         answer: "The upholstery is spot clean only.",
      //       },
      //       {
      //         question: "How do you care for the Togo Style Sofa?",
      //         answer:
      //           "You can do daily dusting and light vacuuming on the Togo Style Sofas to maintain them.",
      //       },
      //       {
      //         question: "Does the Togo Style Sofa have matte or satin sheen?",
      //         answer: "Our Togo Style Sofas have a matte sheen.",
      //       },
      //       {
      //         question: "What is the Togo Style Sofa made from?",
      //         answer:
      //           "The frame is made of multiple density UK fire foam. It is gloved with man-made wadding for extra comfort and upholstered in Creamy, Boucle, Alcantara, or Velvet.",
      //       },
      //       {
      //         question: "Do you sell the Togo Style Sofa in sets?",
      //         answer:
      //           "We sell them separately so you can mix and match your Togo Style set to fit your space. Click [here](https://www.mobelaris.com/en/search/?q=togo) to browse and pick Togo Sofas.",
      //       },
      //       {
      //         question: "Does it come with a warranty?",
      //         answer: "Yes, our Togo Style Sofas come with a 5-year warranty.",
      //       },
      //     ],
      //   },
      label: "FAQs",
      name: "faqs",
      type: "object",
      fields: [
        {
          label: "title",
          name: "title",
          type: "string",
        },
        {
          label: "description",
          name: "description",
          type: "string",
        },
        {
          label: "questions",
          name: "questions",
          type: "object",
          list: true,
          fields: [
            {
              label: "question",
              name: "question",
              type: "string",
            },
            {
              label: "answer",
              name: "answer",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      //   "related-products": {
      //     title: "Related Products",
      //     items: [
      //       {
      //         title: "Wishbone (Y) Chair - CH24 - Orange - Natural Cord",
      //         image:
      //           "https://static.mobelaris.com/media/catalog/product/resize_img//5/a/5aa00fe87fe70_1_1.jpg",
      //         url: "/orange-style-wishbone-y-chair-hans-wegner-natural-cord",
      //         price: {
      //           from: "£139.50",
      //           regular: "£279.00",
      //         },
      //       },
      //       {
      //         title: "Wishbone (Y) Chair - CH24 - Soaped Oak - Black Cord",
      //         image:
      //           "https://static.mobelaris.com/media/catalog/product/resize_img//w/i/wishbone_soap_black_02.png",
      //         url: "/soaped-oak-natural-cord-wishbone-y-chair-hans-wegner-1",
      //         price: {
      //           from: "£224.50",
      //           regular: "£449.00",
      //         },
      //       },
      //       {
      //         title: "Wishbone (Y) Chair - CH24 - Purple - Natural Cord",
      //         image:
      //           "https://static.mobelaris.com/media/catalog/product/resize_img//5/a/5aa00fe88068d_1.jpg",
      //         url: "/purple-style-wishbone-y-chair-hans-wegner-natural-cord",
      //         price: {
      //           from: "£111.60",
      //           regular: "£279.00",
      //         },
      //       },
      //     ],
      //   },
      label: "Related Products",
      name: "related_products",
      type: "object",
      fields: [
        {
          label: "title",
          name: "title",
          type: "string",
        },
        {
          label: "items",
          name: "items",
          type: "object",
          list: true,
          fields: [
            {
              label: "title",
              name: "title",
              type: "string",
            },
            {
              label: "image",
              name: "image",
              type: "string",
            },
            {
              label: "url",
              name: "url",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
  ui: {
    router: ({ document, collection }) => {
      console.log({ document })
      return `/preview/${document._sys.path}`
    },
  },
}

import { defineConfig, Template as TinaTemplate } from "tinacms"
import { customPageCollection } from "./custom_page"
import {
  countdownpositionfield,
  heroTextfield,
  jsonfield,
  seoBlock,
} from "./customfield"

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "master"

const heroBlock: TinaTemplate = {
  name: "hero",
  label: "Hero",
  ui: {
    defaultItem: {
      bg: "/bg-desktop.jpeg",
      countdown_image: "https://img1.niftyimages.com/f3r/76fr/y86r",
      countdown_postion: '{"top":"72","left":"53","width":"32"}',
      bg_mobile: "/bg-mobile.jpeg",
      mobile_countdown_image: "https://img1.niftyimages.com/f3r/76fr/y86r",
      mobile_countdown_postion: '{"top":"37","left":"15","width":"70"}',
    },
  },
  fields: [
    {
      type: "datetime",
      label: "Datetime",
      name: "datetime",
    },
    {
      type: "string",
      label: "Link",
      name: "link",
    },
    {
      type: "image",
      label: "Background image (1920 x 720 px)",
      name: "bg",
    },
    {
      type: "string",
      name: "color",
      label: "Color",
      description: "Edit the color here",
      ui: {
        component: "color",
        colorFormat: "hex",
        colors: ["#EC4815", "#241748", "#B4F4E0", "#E6FAF8"],
        widget: "sketch",
      },
    },
    {
      ...countdownpositionfield,
      label: "Countdown postion",
      name: "countdown_postion",
    },
    {
      type: "image",
      label: "Background image (mobile: 600 x 750 px)",
      name: "bg_mobile",
    },

    {
      ...countdownpositionfield,
      label: "Countdown postion (mobile)",
      name: "mobile_countdown_postion",
    },
    {
      type: "object",
      label: "Fields",
      name: "fields",
      nameOverride: "heading",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: `${item?.text || "text"}` }
        },
      },
      fields: [
        {
          type: "string",
          label: "Text",
          name: "text",
        },
        {
          ...countdownpositionfield,
          name: "text_postion_desktop",
          description: "Position of text (desktop)",
        },
        {
          ...countdownpositionfield,
          name: "text_postion_mobile",
          description: "Position of text (mobile)",
        },
      ],
    },
  ],
}
const heroCustomBlock: TinaTemplate = {
  name: "heroCustomBlock",
  label: "Advanced Hero",
  ui: {
    defaultItem: {
      datetime: "2023-06-04T16:00:00.000Z",
      link: "/express-delivery",
      color: "#2A2A2A",
      desktop: {
        bg: "/_next_tina/uploads/IN-STOCK-ROCKS-SALE-2023-EN.jpg",
        countdown_postion: '{"font":"fontheading"}',
        heading: [
          {
            text: "80",
          },
        ],
      },
      mobile: {
        bg_mobile: "/_next_tina/uploads/IN-STOCK-ROCKS-SALE-2023-mobile-EN.jpg",
        mobile_countdown_postion: '{"font":"fontheading"}',
        heading: [
          {
            text: "80",
            position: '{"font":"fontheading"}',
          },
        ],
      },
    },
    itemProps: (item) => {
      if (item.display?.length) {
        return { label: item.display }
      }
      try {
        return {
          label: `Banner ${
            new Date(item?.datetime).toLocaleDateString() || "Banner"
          }`,
        }
      } catch (error) {
        return { label: "Banner" }
      }
    },
  },
  fields: [
    {
      type: "string",
      label: "Title (display only)",
      name: "display",
    },
    {
      type: "datetime",
      label: "Datetime",
      name: "datetime",
    },
    {
      type: "string",
      label: "Link",
      name: "link",
    },
    {
      type: "string",
      name: "color",
      label: "Color",
      description: "Edit the color here",
      ui: {
        component: "color",
        colorFormat: "hex",
        colors: ["#EC4815", "#241748", "#B4F4E0", "#E6FAF8"],
        widget: "sketch",
      },
    },
    {
      type: "object",
      label: "Desktop",
      name: "desktop",
      fields: [
        {
          type: "image",
          label: "Background image (1920 x 720 px)",
          name: "bg",
        },
        {
          type: "string",
          name: "video_link",
          label: "Video link (wista) ",
          description:
            "Ex: https://fast.wistia.net/embed/iframe/67nabx3lvb?amp;embedType=async&videoWidth=320",
        },
        {
          ...countdownpositionfield,
          label: "Countdown postion",
          name: "countdown_postion",
        },
        {
          type: "object",
          label: "Fields",
          name: "fields",
          nameOverride: "heading",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: `${item?.text || "text"}` }
            },
            defaultItem: {
              text: "TEXT",
              position:
                '{"top":"0","left":"35","width":"37","font-size":"21","font":"fontheading"}',
            },
          },
          fields: [
            {
              type: "string",
              label: "Text",
              name: "text",
            },
            {
              type: "string",
              name: "color",
              label: "Color",
              description: "Edit the color here",
              ui: {
                component: "color",
                colorFormat: "hex",
                colors: ["#EC4815", "#241748", "#B4F4E0", "#E6FAF8"],
                widget: "sketch",
              },
            },
            {
              ...heroTextfield,
              name: "position",
              description: "Position of text",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "mobile",
      label: "Mobile",
      fields: [
        {
          type: "image",
          label: "Background image (mobile: 600 x 750 px)",
          name: "bg_mobile",
        },
        {
          type: "string",
          label: "Video link (wista) ",
          name: "video_link",
          description:
            "Ex: https://fast.wistia.net/embed/iframe/67nabx3lvb?amp;embedType=async&videoWidth=320",
        },
        {
          ...countdownpositionfield,
          label: "Countdown postion (mobile)",
          name: "mobile_countdown_postion",
        },
        {
          type: "object",
          label: "Fields",
          name: "fields",
          nameOverride: "heading",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: `${item?.text || "text"}` }
            },
            defaultItem: {
              text: "TEXT",
              position:
                '{"top":"0","left":"35","width":"37","font-size":"21","font":"fontheading"}',
            },
          },
          fields: [
            {
              type: "string",
              label: "Text",
              name: "text",
            },
            {
              type: "string",
              name: "color",
              label: "Color",
              description: "Edit the color here",
              ui: {
                component: "color",
                colorFormat: "hex",
                colors: ["#EC4815", "#241748", "#B4F4E0", "#E6FAF8"],
                widget: "sketch",
              },
            },
            {
              ...heroTextfield,
              name: "position",
              description: "Position of text",
            },
          ],
        },
      ],
    },
  ],
}
export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENTID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "_next_tina",
    publicFolder: "/public",
  },
  media: {
    tina: {
      mediaRoot: "_next_tina/uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        label: "Store",
        name: "store",
        path: "content/store",
        format: "json",
        fields: [
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Sections",
            templates: [
              {
                name: "icon",
                label: "Icon",
                ui: {
                  defaultItem: {},
                },
                fields: [
                  {
                    type: "image",
                    label: "Image",
                    name: "image",
                  },
                ],
              },
              seoBlock,
              {
                name: "countdown",
                label: "Countdown",
                ui: {
                  defaultItem: {},
                },
                fields: [
                  {
                    type: "datetime",
                    label: "Datetime",
                    name: "datetime",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "images",
            fields: [
              "threeseats",
              "chairimage",
              "daybed",
              "sofaiamge",
              "storageimage",
              "tableimage",
            ].map((name) => ({
              type: "image",
              name,
            })),
          },
          {
            type: "object",
            name: "text",
            fields: ["sale", "smallsale"].map((name) => ({
              type: "rich-text",
              name,
            })),
          },
          {
            type: "object",
            list: true,
            name: "fields",
            label: "fields",
            templates: [
              {
                name: "field",
                label: "Field",
                ui: {
                  defaultItem: {},
                },
                fields: [
                  {
                    label: "others",
                    name: "others",
                    type: "reference",
                    collections: ["others"],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: "Homepage",
        name: "homepage",
        path: "content/home",
        format: "json",
        fields: [
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Sections",
            templates: [heroBlock, heroCustomBlock],
          },
        ],
        ui: {
          router: ({ document }) => {
            return `/${document._sys.filename}`
          },
        },
      },
      {
        label: "Page Content",
        name: "page",
        path: "content/page",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",

            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",

            required: true,
          },
          jsonfield,
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Sections",
            templates: [
              {
                name: "json",
                label: "JSON",
                ui: {
                  defaultItem: {
                    title:
                      "Designer Classic, Mid Century Furniture & Lightiing",
                    description:
                      "Designer Editions bring together a collection of designer classic furniture and lighting, choosing the best factories, built and hand finished by artisans. Designer furniture and lighting has never been so obtainable, direct factory prices available by missing out the middle men, large showrooms and cost.",
                  },
                },
                fields: [jsonfield],
              },
            ],
          },
        ],
        ui: {
          router: ({ document, collection }) => {
            console.log({ document, collection })
            console.log(document._sys.filename)
            return `${document._sys.filename.replaceAll("_", "/")}`
          },
        },
      },
      {
        label: "Product",
        name: "product",
        path: "content/product",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",

            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",

            required: true,
          },
          jsonfield,
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Sections",
            templates: [
              {
                name: "json",
                label: "JSON",
                ui: {
                  defaultItem: {
                    title:
                      "Designer Classic, Mid Century Furniture & Lightiing",
                    description:
                      "Designer Editions bring together a collection of designer classic furniture and lighting, choosing the best factories, built and hand finished by artisans. Designer furniture and lighting has never been so obtainable, direct factory prices available by missing out the middle men, large showrooms and cost.",
                  },
                },
                fields: [jsonfield],
              },
            ],
          },
        ],
        ui: {
          router: ({ document, collection }) => {
            console.log({ document, collection })
            console.log(document._sys.filename)
            return `${document._sys.filename.replaceAll("_", "/")}`
          },
        },
      },
      {
        label: "Collection",
        name: "collection_page",
        path: "content/collection",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",

            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",

            required: true,
          },
          jsonfield,
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Sections",
            templates: [
              {
                name: "json",
                label: "JSON",
                ui: {
                  defaultItem: {
                    title:
                      "Designer Classic, Mid Century Furniture & Lightiing",
                    description:
                      "Designer Editions bring together a collection of designer classic furniture and lighting, choosing the best factories, built and hand finished by artisans. Designer furniture and lighting has never been so obtainable, direct factory prices available by missing out the middle men, large showrooms and cost.",
                  },
                },
                fields: [jsonfield],
              },
            ],
          },
        ],
        ui: {
          router: ({ document, collection }) => {
            console.log({ document, collection })
            console.log(document._sys.filename)
            return `${document._sys.filename.replaceAll("_", "/")}`
          },
        },
      },
      customPageCollection,
      {
        label: "Others",
        name: "others",
        path: "content/others",
        format: "json",
        fields: [
          {
            name: "field",
            label: "Fields",
            type: "object",
            ui: {
              itemProps: (item) => {
                return { label: `${item.name}: ${item.value}` }
              },
            },
            list: true,
            fields: [
              {
                type: "string",
                label: "name",
                name: "name",
              },
              {
                type: "string",
                label: "Value",
                name: "value",
              },
            ],
          },
        ],
      },
    ],
  },
})

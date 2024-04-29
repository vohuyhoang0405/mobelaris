import Container from "app/components/Container"
import Link from "app/components/Link"
import { GTagEventEnterPage } from "app/components/googleTag"
import { T } from "../context/sources"
const data = {
  catalog: [
    {
      title: "Chairs",
      href: "/chairs",

      items: [
        {
          title: "Armchairs",
          href: "/modern-designer-chair/modern-armchairs",
        },
        {
          title: "Dining Chairs",
          href: "/modern-designer-chair/dining-chairs",
        },
        {
          title: "High Back Chairs",
          href: "/modern-designer-chair/modern-high-armchairs",
        },
        {
          title: "Lounge Chair",
          href: "/modern-designer-chair/modern-lounge-chairs",
        },
        {
          title: "Bar Stools",
          href: "/modern-designer-chair/modern-bar-stools",
        },
        {
          title: "Stools",
          href: "/modern-designer-chair/modern-stools",
        },
        {
          title: "Modern Rocking Chairs",
          href: "/modern-designer-chair/modern-rocking-chairs",
        },
        {
          title: "Office Chairs",
          href: "/modern-designer-chair/modern-office-chair",
        },
        {
          title: "Modern Benches",
          href: "/modern-designer-chair/modern-bench",
        },
      ],
    },
    {
      title: "Tables",
      href: "/tables",

      items: [
        {
          title: "Dining Tables",
          href: "/modern-tables/modern-dining-tables",
        },
        {
          title: "Modern Coffee Table",
          href: "/modern-tables/modern-coffee-tables",
        },
        {
          title: "Side Tables",
          href: "/modern-tables/side-tables",
        },
        {
          title: "Desks",
          href: "/modern-tables/modern-desk",
        },
        {
          title: "Conference Table",
          href: "/modern-tables/conference-table",
        },
      ],
    },
    {
      title: "Sofa",
      href: "/sofas",

      items: [
        {
          title: "Arm Chairs",
          href: "/modern-designer-chair/modern-armchairs",
        },
        {
          title: "Small & 2 Seater Sofas",
          href: "/sofas/2-seat-sofas",
        },

        {
          title: "Corner Sofas",
          href: "/sofas/l-shape-sofas",
        },
        {
          title: "Chaise Lounge",
          href: "/modern-sofas/chaise-longue-day-beds",
        },
        {
          title: "3 Seater Sofas",
          href: "/sofas/3-seat-sofas",
        },
        {
          title: "Day Beds",
          href: "/modern-sofas/chaise-longue-day-beds",
        },
      ],
    },
    {
      title: "Lighting",
      href: "/lighting",
      items: [
        {
          title: "Table Lamps",
          href: "/style-designer-lighting/table-lamps",
        },
        {
          title: "Floor Lamps",
          href: "/modern-lighting/floor-lamps",
        },
        {
          title: "Ceiling Lights",
          href: "/modern-lighting/pendant-lighting",
        },
        {
          title: "Wall Lamps",
          href: "/modern-lighting/wall-lamps",
        },
      ],
    },
    {
      title: "Storage",
      href: "/storage",

      items: [
        {
          title: "Sideboards",
          href: "/sideboards",
        },
        {
          title: "Display Cabinet",
          href: "/storage-furniture/shop-by-type/display-cabinet",
        },
        {
          title: "Chest of Drawers",
          href: "/storage-furniture/shop-by-type/chest-of-drawers",
        },
        {
          title: "Cabinets",
          href: "/storage-furniture/shop-by-type/cabinets",
        },
        {
          title: "Modern TV Unit",
          href: "/storage-furniture/shop-by-type/modern-tv-unit",
        },
      ],
    },
    {
      title: "Accessories",
      href: "/accessories",
      items: [
        {
          title: "Coat Hooks & Stands",
          href: "/accessories/gear",
        },
        {
          title: "Clocks",
          href: "/designer-clock",
        },
      ],
    },
    {
      title: "About",
      href: "/about",
      items: [
        {
          title: "  ABOUT ",
          href: "/about",
        },
        {
          title: "  TRADE ",
          href: "/trade",
        },
        {
          title: "  CONTACT ",
          href: "/contact-us",
        },
      ],
    },
  ],
  pages: [
    {
      "page-url": "",
      "page-title": "Home Page",
    },
    // {
    //   "page-url": "/enable-cookies",
    //   "page-title": "Enable Cookies",
    // },
    // {
    //   "page-url": "/privacy-policy-cookie-restriction-mode",
    //   "page-title": "Privacy and Cookie Policy",
    // },
    {
      "page-url": "/about",
      "page-title": "About",
    },
    {
      "page-url": "/sign-up-today",
      "page-title": "Join Our Mailing List",
    },
    // {
    //   "page-url": "/fabric",
    //   "page-title": "Fabric",
    // },
    // {
    //   "page-url": "/custom-home",
    //   "page-title": "Custom Home",
    // },
    // {
    //   "page-url": "/checkout-form",
    //   "page-title": "Check Out Form",
    // },
    // {
    //   "page-url": "/order-confirmation",
    //   "page-title": "Order Confirmation",
    // },
    // {
    //   "page-url": "/term-and-condition-12th-may",
    //   "page-title": "Terms and Conditions - 24th August",
    // },
    // {
    //   "page-url": "/order-track",
    //   "page-title": "Order Track",
    // },
    // {
    //   "page-url": "/invite-a-friend",
    //   "page-title": "Invite a Friend",
    // },
    // {
    //   "page-url": "/useful-info",
    //   "page-title": "Useful Information",
    // },
    {
      "page-url": "/privacy-policy",
      "page-title": "Privacy Policy",
    },
    // {
    //   "page-url": "/flash-sales-homepage",
    //   "page-title": "Private Sales Homepage",
    // },
    // {
    //   "page-url": "/feefo",
    //   "page-title": "Feefo",
    // },
    // {
    //   "page-url": "/sample-checkout-terms-conditions",
    //   "page-title": "Terms & Conditions",
    // },
    {
      "page-url": "/contact-us",
      "page-title": "Contact Us",
    },
    {
      "page-url": "/trade",
      "page-title": "Trade",
    },
    // {
    //   "page-url": "/rewardpoints-policy",
    //   "page-title": "Reward Policy",
    // },
    // {
    //   "page-url": "/rewardpoints-welcome",
    //   "page-title": "Reward Welcome Page",
    // },
    {
      "page-url": "/term-and-condition",
      "page-title": "Terms and Conditions",
    },
    {
      "page-url": "/refunds-and-returns",
      "page-title": "Returns and Refund",
    },
  ],
}
function Page() {
  return (
    <div className="flex items-center justify-center p-12">
      <Container>
        <h1 className="text-5xl">
          <T>Sitemap</T>
        </h1>
        <div className="xsitemap prose mt-6 grid max-w-none text-lg prose-a:text-secondary prose-a:no-underline md:grid-cols-2">
          <div className="xsitemap-categories">
            <h3>Catalog</h3>
            <ul className="categories">
              {data.catalog.map((page, i) => (
                <li key={i} className="level-0 category">
                  <Link href={page.href}>
                    <T>{page.title}</T>
                  </Link>
                  {!!page.items && (
                    <ul>
                      {page.items.map((page, i) => (
                        <li key={i} className="level-0 category">
                          <Link href={page.href}>
                            <T>{page.title}</T>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="xsitemap-pages">
            <h3>Pages</h3>
            <ul className="pages">
              {data.pages.map((page, i) => (
                <li key={i} className="level-0 category">
                  <Link href={page["page-url"]}>
                    <T>{page["page-title"]}</T>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
      <GTagEventEnterPage type="undefined" />
    </div>
  )
}

export default Page

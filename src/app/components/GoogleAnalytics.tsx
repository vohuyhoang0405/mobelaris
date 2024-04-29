"use client"

import Script from "next/script"
let defaultGtagId = process.env.GA_MEASUREMENT_ID || "G-F1YFT0SB35"
export default function GoogleAnalytics({
  GA_MEASUREMENT_ID = defaultGtagId,
}: {
  GA_MEASUREMENT_ID?: string
}) {
  return (
    <>
      <Script
        strategy="worker"
        defer
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      ></Script>

      <Script
        id="google-analytics"
        strategy="worker"
        defer
        dangerouslySetInnerHTML={{
          __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
    
                    gtag('consent', 'default', {
                        'analytics_storage': 'denied',
                        'ad_personalization': 'denied',
                        'ad_user_data': 'denied',
                    });
                    
                    gtag('config', '${GA_MEASUREMENT_ID}', {
                        page_path: window.location.pathname,
                    });
                    `,
        }}
      ></Script>
      <Script
        id="gtm.start"
        strategy="worker"
        defer
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M5KJQ2K');`,
        }}
      ></Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=GTM-M5KJQ2K`}
          height={0}
          width={0}
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  )
}

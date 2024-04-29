import mobelarisIcons from "./mobelaris-icons.webp"
function Icon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "faq":
      return (
        <div
          className={className}
          style={{
            background: `url(${mobelarisIcons.src}) no-repeat -158px -202px`,
            width: "19px",
            height: "18px",
          }}
        />
      )
    case "faq-invert":
      return (
        <div
          className={className}
          style={{
            background: `url(${mobelarisIcons.src}) no-repeat -158px -231px`,
            width: "19px",
            height: "18px",
          }}
        />
      )
    case "account":
      return (
        <div
          className={className}
          style={{
            background: `url(${mobelarisIcons.src}) no-repeat -68px -202px`,
            width: "19px",
            height: "18px",
          }}
        />
      )
    case "account-invert":
      return (
        <div
          className={className}
          style={{
            background: `url(${mobelarisIcons.src}) no-repeat -68px -231px`,
            width: "19px",
            height: "18px",
          }}
        />
      )
    case "minicart":
      return (
        <div
          className={className}
          style={{
            background: `url(${mobelarisIcons.src}) no-repeat -34px -202px`,
            width: "19px",
            height: "18px",
          }}
        />
      )
    case "minicart-invert":
      return (
        <div
          className={className}
          style={{
            background: `url(${mobelarisIcons.src}) no-repeat -34px -231px`,
            width: "19px",
            height: "18px",
          }}
        />
      )
    case "twitter":
      return (
        <div
          className={className}
          style={{
            background: `url(${mobelarisIcons.src}) no-repeat -240px 2px`,
            lineHeight: "28px",
            width: "28px",
            height: "28px",
          }}
        />
      )
    case "facebook":
      return (
        <div
          className={className}
          style={{
            background: `url(${mobelarisIcons.src}) no-repeat -147px 0`,
            lineHeight: "28px",
            width: "28px",
            height: "28px",
          }}
        />
      )
    case "google-plus":
      return (
        <div
          className={className}
          style={{
            background: `url(${mobelarisIcons.src}) no-repeat -25px 4px`,
            lineHeight: "28px",
            width: "28px",
            height: "28px",
          }}
        />
      )
    case "pinterest":
      return (
        <div
          className={className}
          style={{
            background: `url(${mobelarisIcons.src}) no-repeat -180px 0`,
            lineHeight: "28px",
            width: "28px",
            height: "28px",
          }}
        />
      )
    default:
      return (
        <div
          className={className}
          style={{
            background: `url(${mobelarisIcons.src}) no-repeat -158px -202px`,
            width: "19px",
            height: "18px",
          }}
        />
      )
  }
}

export default Icon

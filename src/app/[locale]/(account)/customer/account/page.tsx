import { T } from "app/[locale]/context/sources"

function Page() {
  return (
    <p className="whitespace-pre-wrap py-12 text-center">
      <T>{`At Mobelaris, we pride ourselves on the care and attention of our customers. Our goal is for you to receive your home editions on time and for everything to be in order. Sourcing unique pieces globally is our passion. We procure only the highest quality items, at affordable prices, direct from manufacturers. Occasionally we add smaller batches of orders to larger manufacturer runs to make large savings that we are able to pass onto you, our much loved customers. 
    \nHave questions? It is usually quicker to get a reponse to your enquiry via email or to make an enquiry using the links below`}</T>
    </p>
  )
}

export default Page

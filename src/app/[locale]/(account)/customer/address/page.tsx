import dynamic from "next/dynamic"

const AddressBook = dynamic(() => import("../../components/address-book"))

function Page() {
  return (
    <p className="whitespace-pre-wrap text-center">
      <AddressBook />
    </p>
  )
}

export default Page

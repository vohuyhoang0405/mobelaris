import dynamic from "next/dynamic"

const InstagramCard = dynamic(() => import("./InstagramCard"))

function InstagramLightBox({
  items,
}: {
  items: {
    photo_id: string
    products: any
  }[]
}) {
  return (
    <div>
      <input
        type="radio"
        name={"instagram"}
        id={"instagram_close"}
        className="modal-toggle"
      />
      {items.map((item, i) => {
        return <InstagramCard index={i} key={i} {...item}></InstagramCard>
      })}
    </div>
  )
}

export default InstagramLightBox

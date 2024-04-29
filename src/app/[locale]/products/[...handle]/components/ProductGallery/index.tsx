import dynamic from "next/dynamic"

const ProductGallery = dynamic(() => import("./ProductGallery"), {
  loading: () => null,
  ssr: true,
})
export default function ProductGalleryLazy(props) {
  return <ProductGallery {...props} />
}

import Container from "app/components/Container"
import Spinner from "app/components/Icon/spinner"

export default function Loading() {
  return (
    <Container className="flex w-full justify-center p-12">
      <Spinner size={24} />
    </Container>
  )
}

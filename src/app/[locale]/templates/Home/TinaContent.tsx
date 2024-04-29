import { ServerContextType } from "app/helper"
import dynamic from "next/dynamic"
import client from "../../../../../tina/__generated__/client"

const Blocks = dynamic(() => import("./Blocks"))

interface Props {
  context: ServerContextType
}

const TinaContent = async ({ context }: Props) => {
  const res = await client.queries.homepage({
    relativePath: `/${context.langCode}.json`,
  })

  return <Blocks {...res} />
}
export default TinaContent

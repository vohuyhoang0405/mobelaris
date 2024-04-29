import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function GET(req: Request) {
  revalidatePath("/", "layout")
  redirect("/")
}

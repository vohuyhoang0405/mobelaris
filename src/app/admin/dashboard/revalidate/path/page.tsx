import { revalidatePath, revalidateTag } from "next/cache"

import dynamic from "next/dynamic"
import { Suspense } from "react"

const SubmitButton = dynamic(() => import("./_component/FormstateButton"))

export default async function Page({}: { children: React.ReactNode }) {
  async function submit(formData: FormData) {
    "use server"
    try {
      let path = formData.get("path")?.toString() || "/"
      let type: "layout" | "page" | undefined =
        (formData.get("type")?.toString() as "layout" | "page" | undefined) ||
        "page"
      let tags = formData.get("tags")?.toString() || ""
      if (tags) {
        console.log("revalidate tags:", tags)
        return revalidateTag(tags)
      }
      console.log("revalidate path:", path, type)
      return revalidatePath(path, type)
    } catch (e) {
      return { message: "Failed", e }
    }
  }
  return (
    <Suspense>
      <form
        action={submit}
        className="mx-auto flex h-full min-h-screen w-full max-w-xl  flex-col items-center justify-center gap-6 py-24"
      >
        <h1 className="text-2xl font-bold">Revalidate</h1>
        <div className="join w-full">
          <div className="flex-1">
            <input
              defaultValue={"/[locale]"}
              name="path"
              className="input join-item input-bordered w-full"
              placeholder="Path"
            />
          </div>
          <select name="type" className="join-item select select-bordered">
            <option>page</option>
            <option>layout</option>
          </select>
          <div className="indicator">
            <SubmitButton className="btn join-item w-[100px]">
              Submit
            </SubmitButton>
          </div>
        </div>
        <div className="join w-full">
          <input
            name="tags"
            className="input join-item input-bordered w-full flex-1"
            placeholder="Tags"
          />
          <div className="indicator">
            <SubmitButton className="btn join-item w-[100px]">
              Submit
            </SubmitButton>
          </div>
        </div>
      </form>
    </Suspense>
  )
}

import { createClient } from "@supabase/supabase-js"
import { Database } from "./supabase"

const supabaseUrl = "https://mednvaufxdrbgnimedgv.supabase.co"
const supabaseKey =
  process.env.SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lZG52YXVmeGRyYmduaW1lZGd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NzE0NzMyNiwiZXhwIjoxOTkyNzIzMzI2fQ.GnFpBooOr37y7MFdugsMPbo_XNc8XLZxU-GB7qTFp58"
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export async function getSlug({ handle }: { handle: string }) {
  let { data, error } = await supabase
    .from("handles")
    .select("*")
    // Filters
    .eq("slug", handle)

  return {
    data,
    error,
  }
}

export async function addSlugs(
  handles: Database["public"]["Tables"]["handles"]["Insert"][]
) {
  const { data, error } = await supabase
    .from("handles")
    .insert(handles.map((data) => data))
  return {
    data,
    error,
  }
}
export async function addFeeds(
  feeds: Database["public"]["Tables"]["slugs"]["Insert"][]
) {
  console.log({ feeds: feeds[0] })
  const { data, error } = await supabase
    .from("slugs")
    .insert(feeds.map((data) => data))
  console.log({ data, error })
  return {
    data,
    error,
  }
}

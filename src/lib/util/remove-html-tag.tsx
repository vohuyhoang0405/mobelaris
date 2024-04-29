export function removeHTMLTags(text: string) {
  return text.replace(/<[^>]+>/g, "")
}

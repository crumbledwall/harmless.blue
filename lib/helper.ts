export const filter = (body: string) => {
  const reg = /<a name=".+?"><\/a>\n/
  return body.replace(reg, '')
}

export function isOfTypeListType(listType: string): listType is ListType {
  return ["now_playing", "popular", "top_rated", "upcoming"].includes(listType);
}

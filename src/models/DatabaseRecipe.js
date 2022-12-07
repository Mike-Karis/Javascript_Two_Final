function DatabaseRecipe (id, data) {
  id = id ?? ''
  data = data ?? {}
  return {
    id: id,
    title: data.title ?? '',
    imageURL: data.imageURL ?? ''
  }
}
// Recipe.type = 'Recipe'
//
export default DatabaseRecipe

function DatabaseIngredient (id, data) {
  id = id ?? ''
  data = data ?? {}
  return {
    id: id,
    name: data.name ?? '',
    imageURL: data.imageURL ?? '',
  }
}
// Recipe.type = 'Recipe'
//
export default DatabaseIngredient

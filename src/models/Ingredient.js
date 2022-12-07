function Ingredient (name, place, imageURL, amount, id) {
  this.name = name ?? ''
  this.place = place ?? ''
  this.imageURL = imageURL ?? ''
  this.amount = amount ?? 0
  this.id = id ?? 0
}
Ingredient.type = 'Ingredient'

export default Ingredient

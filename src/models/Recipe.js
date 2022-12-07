function Recipe (title, imageURL, place, sourceURL) {
  this.title = title ?? ''
  this.imageURL = imageURL ?? ''
  this.place = place ?? ''
  this.sourceURL = sourceURL ?? ''
}
Recipe.type = 'Recipe'

export default Recipe

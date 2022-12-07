function Item (media) {
  const STATES = { SEARCH: 'searched', SHOPPING: 'shoppinglist', BOOK: 'cookbook', PANTRY: 'pantry' }

  media._states = STATES.SEARCH

  media.toShopping = function () {
    this._states = STATES.SHOPPING
  }
  media.inShoppingList = function () {
    return this._states === STATES.SHOPPING
  }
  media.toBook = function () {
    this._states = STATES.BOOK
  }
  media.inCookBook = function () {
    return this._states === STATES.BOOK
  }
  media.toPantry = function () {
    this._states = STATES.PANTRY
  }
  media.inPantry = function () {
    return this._states === STATES.PANTRY
  }
  media.Available = function () {
    return this._states === STATES.SEARCH
  }
  return media
}
export default Item

/* eslint-disable */
import Item from '@/models/Item'
import Ingredient from '@/models/Ingredient'
import Recipe from '@/models/Recipe'
import firebase from "@/models/Firebase";

function ItemList (arr) {
  arr = arr ?? []

  arr.addItem = function (item) {
    this.push(new Item(item))

    // used for chaining
    return this
  }

  arr.removeItem = function (item, place) {
    this.splice(this.indexOf(item), 1)
    if(item.name == null){
      firebase.firestore().collection(place).where("title", "==", item.title)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            firebase.firestore().collection(place).doc(doc.id).delete()
            // console.log(doc.id, " => ", doc.data());
          });
        });
    }
    else{
    firebase.firestore().collection(place).where("name", "==", item.name)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          firebase.firestore().collection(place).doc(doc.id).delete()
          // console.log(doc.id, " => ", doc.data());
        });
      });
    }
    return this
  }
  // arr.moveItem = function (item){
  //   this.
  // }

  arr.look = function (name, place, imageURL, amount) {
    this.name = name
    this.place = place
    this.imageURL = imageURL
    this.amount = amount
    console.log("Amount:"+amount)
    this.push(new Item(new Ingredient(name, place, this.imageURL, amount)))
  }

  arr.look2 = function (title, imageURL, place, sourceURL) {
    this.title = title
    this.imageURL = imageURL
    this.place = place
    this.sourceURL = sourceURL
    // console.log(imageURL)
    this.push(new Item(new Recipe(title, this.imageURL, place, sourceURL)))
  }

  return arr
}

export default ItemList

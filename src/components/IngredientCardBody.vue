<template>
  <div>
    <div class="card-header d-flex justify-content-center">
    <h3 class="card-title">{{ item.name }}</h3>
    </div>
    <img :src='item.imageURL' alt="Image" height="100" width="100">
    <h4>{{this.Amount}}</h4>
    <form>
    <input type="number submit" id="amountInput" v-model="Amount">
    <button  class="btn btn-outline-info" @click.prevent="amountTotal(item)">Change Amount</button>
    </form>
    <div class="card-footer">
<!--    <button v-if="item.Available() || item.Pantry()" class="btn btn-outline-success" @click="item.toShopping()">Send to Shopping List</button>-->
      <button v-if="item.Available() || item.inPantry()" class="btn btn-outline-primary" @click="addToListDatabase(item)">Add to Shopping List</button>
      <button v-if="item.Available() || item.inShoppingList()" class="btn btn-outline-warning" @click=" addToPantryDatabase(item)">Add to Pantry</button>
<!--      <button class="btn btn-outline-danger" @click="remove(item)">Remove</button>-->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Ingredient from '@/models/Ingredient'
import DatabaseIngredient from "@/models/DatabaseRecipe";
import firebase from "@/models/Firebase";
export default {
  name: 'IngredientCardBody',
  data () {
    return {
      Amount: this.item.amount,
      }
    },
  props: {
    item: { type: Ingredient },
  },
  methods: {
    amountTotal(item){
      item.amount = this.Amount
      let recipe = new DatabaseIngredient();
      recipe.name = item.name;
      recipe.place = item.place;
      recipe.imageURL = item.imageURL;
      recipe.id = Math.floor(Math.random() * 101);
      recipe.amount = this.Amount;
      console.log(recipe.place)

      //     // add recipe
      //     // MikeNote: 'recipes' can be whatever you want
      firebase.firestore().collection(recipe.place).where('name', "==", item.name)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            firebase.firestore().collection(recipe.place).doc(doc.id).update({'amount': recipe.amount});
          });
        });
      console.log(recipe.amount)
      // firebase.firestore().collection("Pantry")
      //   .add(recipe);
      console.log(item)
    },
    addToListDatabase(item) {
      // firebase.initializeApp()
      console.log('test')
      let recipe = new DatabaseIngredient();
      recipe.name = item.name;
      recipe.place = 'ShoppingList';
      recipe.imageURL = item.imageURL;
      recipe.id = Math.floor(Math.random() * 101);
      recipe.amount = item.amount;
      console.log('test2')
      console.log(recipe)
      //     // add recipe
      //     // MikeNote: 'recipes' can be whatever you want
      firebase.firestore().collection('ShoppingList')
        .add(recipe);
      firebase.firestore().collection("Pantry").where('name', "==", recipe.name)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            firebase.firestore().collection("Pantry").doc(doc.id).delete()
            // console.log(doc.id, " => ", doc.data());
          });
        });
    },
    addToPantryDatabase(item) {
      // firebase.initializeApp()
      console.log('test')
      let recipe = new DatabaseIngredient();
      recipe.name = item.name;
      recipe.place = 'Pantry';
      recipe.imageURL = item.imageURL;
      recipe.id = Math.floor(Math.random() * 101);
      recipe.amount = item.amount;
      console.log('test2')
      console.log(recipe)
      //     // add recipe
      //     // MikeNote: 'recipes' can be whatever you want
      firebase.firestore().collection('Pantry')
        .add(recipe);
      firebase.firestore().collection("ShoppingList").where("name", "==", recipe.name)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            firebase.firestore().collection("ShoppingList").doc(doc.id).delete()
            // console.log(doc.id, " => ", doc.data());
          });
        });
    },
    // remove(item){
    //   firebase.firestore().collection("Pantry").where("name", "==", item.name)
    //     .get()
    //     .then((querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         firebase.firestore().collection("Pantry").doc(doc.id).delete()
    //         // console.log(doc.id, " => ", doc.data());
    //       });
    //     });
    //   firebase.firestore().collection("ShoppingList").where("name", "==", item.name)
    //     .get()
    //     .then((querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         firebase.firestore().collection("ShoppingList").doc(doc.id).delete()
    //         // console.log(doc.id, " => ", doc.data());
    //       });
    //     });
    // }
  },
  mounted() {
    if(this.item.place==='Pantry'){
      this.item.toPantry()
    }
    else if(this.item.place==='ShoppingList'){
      this.item.toShopping()
    }
  },
}
</script>

<style scoped>

</style>

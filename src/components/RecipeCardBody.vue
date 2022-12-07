<template>
  <div>
    <div class="card-header d-flex justify-content-center">
    <h3 class="card-title">{{ item.title }}</h3>
    </div>
    <img :src='item.imageURL' alt="Image" height="100" width="100">
    <h5 class="card-subtitle">Click <a :href="item.sourceURL">here</a> to go recipe</h5>
    <div class="card-footer">
      <button v-if="item.Available()" class="btn btn-outline-primary" @click="addToBookDatabase(item)">Add to Cook Book</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Recipe from '@/models/Recipe'
import DatabaseRecipe from "@/models/DatabaseRecipe";
import firebase from "@/models/Firebase";
export default {
  name: 'RecipeCardBody',
  props: {
    item: {type: Recipe}
  },
  methods: {
    addToBookDatabase(item) {
      // firebase.initializeApp()
      console.log('test')
      let recipe = new DatabaseRecipe();
      recipe.title = item.title;
      recipe.imageURL = item.imageURL;
      recipe.place = 'CookBook';
      recipe.sourceURL = item.sourceURL;
      console.log('test2')
      console.log(recipe)
      //     // add recipe
      //     // MikeNote: 'recipes' can be whatever you want
      firebase.firestore().collection('CookBook')
        .add(recipe)
      // .then(docRef => {
      //   console.log('Doc added.', docRef);
      // })
      // .catch(error =>{
      //   console.error('Error adding tacos. ', error);
      // })
      ;
    },
  },
  mounted() {
    if(this.item.place==='CookBook') {
      this.item.toBook()
    }
  },
}
</script>

<style scoped>

</style>

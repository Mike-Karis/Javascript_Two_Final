<template>
  <div class="card">
    <h1 class="card-header">Pantry</h1>
    <div id="displayPantry"></div>
    <div class=" card-body row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 g-3">
      <div class="col" v-for="item in pantryList" :key="item.name">
        <SearchItem :item="item" :remove-method="itemToDelete => pantryList.removeItem(itemToDelete, Pantry)"></SearchItem>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from "@/models/Firebase";
import ItemList from '@/models/ItemList'
import SearchItem from "@/components/SearchItem";
export default {
  name: 'PantryView',
  components: {
    SearchItem
  },
  data () {
    return {
      Pantry: 'Pantry',
      pantryList: new ItemList()
    }
  },
  mounted() {
    // calls every time a record is added, updated, etc
    firebase.firestore().collection('Pantry')
      .onSnapshot(snapshot => {
        this.pantryList.splice(0, 100)
        // snapshot == the collection at a moment in time
        const recipes = [];
        document.getElementById('displayPantry').innerHTML = '';
        // loop through each document in the array
        snapshot.forEach(doc => {
          this.pantryList.look(doc.data().name, 'Pantry', doc.data().imageURL, doc.data().amount)
          recipes.push(doc.id, doc.data(), doc.path)
        })
        console.log(recipes);
      })
  }
}
</script>

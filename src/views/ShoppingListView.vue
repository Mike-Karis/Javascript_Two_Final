<template>
  <div class="card">
    <h1 class="card-header">Shopping List</h1>
    <div id="displayShoppingList"></div>
    <div class="card-body row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 g-3">
      <div class="col" v-for="item in this.shoppingList" :key="item.name">
        <SearchItem :item="item" :remove-method="itemToDelete => shoppingList.removeItem(itemToDelete, Shopping)"></SearchItem>
      </div>
    </div>
  </div>
</template>

<script>
import SearchItem from '@/components/SearchItem'
/* eslint-disable */
import ItemList from '@/models/ItemList'
import firebase from '@/models/Firebase'
export default {
  name: 'ShoppingListView',
  components: {
    SearchItem
  },
  data () {
    return {
      Shopping: 'ShoppingList',
      shoppingList: new ItemList()
    }
  },
  mounted() {
    // calls every time a record is added, updated, etc
    firebase.firestore().collection('ShoppingList')
      .onSnapshot(snapshot => {
        this.shoppingList.splice(0, 100)
        // snapshot == the collection at a moment in time
        const recipes = [];
        document.getElementById('displayShoppingList').innerHTML = '';
        // loop through each document in the array
        snapshot.forEach(doc => {
          this.shoppingList.look(doc.data().name, 'ShoppingList', doc.data().imageURL, doc.data().amount)
          recipes.push(doc.id, doc.data(), doc.path)
        })
        console.log(recipes);
      })
  }
}
</script>

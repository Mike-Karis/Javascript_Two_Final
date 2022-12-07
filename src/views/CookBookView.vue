<template>
  <div class="card">
    <h1 class="card-header">Cook Book</h1>
    <div class="col" v-for="item in this.similarList" :key="item.name">
      <SearchItem :item="item"></SearchItem>
    </div>
    <div id="displayCookBook"></div>
    <div class="card-body row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 g-3">
      <div class="col" v-for="item in this.bookList" :key="item.name">
        <SearchItem :item="item" :remove-method="itemToDelete => bookList.removeItem(itemToDelete, Book)"></SearchItem>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from '@/models/Firebase'
import SearchItem from "@/components/SearchItem";
import ItemList from "@/models/ItemList";
import axios from 'axios'
export default {
name: "CookBookView",
  components: {
    SearchItem
  },
  data () {
    return {
      Book: 'CookBook',
      bookList: new ItemList(),
      similarList: new ItemList()
    }
  },
  async mounted() {
    // calls every time a record is added, updated, etc
    firebase.firestore().collection('CookBook')
      .onSnapshot(snapshot => {
        this.bookList.splice(0, 100)
        // snapshot == the collection at a moment in time
        const recipes = [];
        document.getElementById('displayCookBook').innerHTML = '';
        // loop through each document in the array
        snapshot.forEach(doc => {
          this.bookList.look2(doc.data().title, doc.data().imageURL, 'CookBook', doc.data().sourceURL)
          recipes.push(doc.id, doc.data(), doc.path)
        })
        console.log(recipes);
      })

    // this.similarList.splice(0, 100)
    // const api3 = 'https://api.spoonacular.com/recipes/complexSearch?'
    // const apiKey = '&apiKey=31ace155a41f4c6ba8443ac6e5ed4113'
    // let recpieName='';
    // firebase.firestore().collection("CookBook").where('place', "==", 'book')
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       recpieName = firebase.firestore().collection("CookBook").doc('title');
    //     });
    //   });
    // let similarURL = api3 + 'query=' +recpieName + '&number=1' + apiKey
    // this.info1 = await axios.get(similarURL).then(response => (response.data.results[0].id))
    // const api4 ='https://api.spoonacular.com/recipes/'+this.info1+'/similar'
    // this.info2 = await axios.get(api4).then(response => (response.data.results[0].title))
    // this.info3 = await axios.get(api4).then(response => (response.data.results[0].sourceURL))
    // this.similarList.look2(this.info2, 'imageURL', 'available', this.info3)
  }
}
</script>

<style scoped>

</style>

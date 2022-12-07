<template>
  <form class="jumbotron-fluid">
    <div id="itemsearch" class="border-primary">
    <input class="input" type="text" v-model="search">
      <button class="btn btn-outline-info" type="submit" @click.prevent="find()">Search</button>
    </div>
    <div class="card-body">
    <input class="radiobtn" type="radio" v-model="typeBTN" name="typeBTN" value="recipe" checked="checked">
    <label> Recipe </label>
    <br>
    <input class="radiobtn" type="radio" v-model="typeBTN" name="typeBTN" value="ingredient">
    <label> Ingredient </label>
    </div>

  </form>

  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 g-3">
    <div class="col" v-for="item in searchList" :key="item.name">
      <SearchItem :item="item" ></SearchItem>
    </div>
  </div>
<!--  <button @click="moveToSL">Move</button>-->
</template>

<script>
import SearchItem from '@/components/SearchItem'
import axios from 'axios'
import ItemList from '@/models/ItemList'
/* eslint-disable */
export default {
  name: 'SearchView',
  components: {
    SearchItem
  },
  data () {
    return {
      search: '',
      info: 'test',
      searchList: new ItemList()
    }
  },
  methods: {
    async find () {
      /* eslint-disable */
      this.searchList.splice(0, 100)
      const inputNum = 5 // will be 5 or 10
      const apiKey = '&apiKey=31ace155a41f4c6ba8443ac6e5ed4113'
      const input = 'query=' + this.search
      if (this.typeBTN === 'ingredient') {
        console.log('ingredient')
      const api = 'https://api.spoonacular.com/food/ingredients/search?'
      const url = api + input + '&number=' + inputNum + apiKey
      for (let i = 0; i < inputNum; i++) {
        // const output = await axios.get(url).then(response => (response.data.results[i].id))
        this.info = await axios.get(url).then(response => (response.data.results[i].name))
        this.info2 = await axios.get(url).then(response => (response.data.results[i].image))
        this.info3 = 'https://spoonacular.com/cdn/ingredients_100x100/' + this.info + '.jpg'
        this.info4 = 1;
        // console.log(this.info3)
        // console.log(output)
        // console.log('test2')
        this.searchList.look(this.info, 'available', this.info3, this.info4)
      }
    }
    else {
      console.log('recipe')
        const api = 'https://api.spoonacular.com/recipes/complexSearch?'
        const api2 ='https://api.spoonacular.com/recipes/search?'
        const url = api + input + '&number=' + inputNum + apiKey
        const url2 = api2 + input + '&number=' + inputNum + apiKey
        for (let i = 0; i < inputNum; i++) {
          // const output = await axios.get(url).then(response => (response.data.results[i].id))
          this.info = await axios.get(url).then(response => (response.data.results[i].title))
          this.info2 = await axios.get(url).then(response => (response.data.results[i].id))
          this.info3 = 'https://spoonacular.com/recipeImages/' + this.info2 + '-100x100.jpg'
          this.info4 = await axios.get(url2).then(response => (response.data.results[i].sourceUrl))
          this.searchList.look2(this.info, this.info3, 'available', this.info4)
        }
    }
    },
  }
}
</script>

<style scoped>

</style>

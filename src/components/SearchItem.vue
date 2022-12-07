<template>
  <div class="card h-100">
    <component :is="itemCardComponent" :item="item" ></component>
    <button class="btn btn-outline-danger" v-if="removeMethod" @click="removeMethod(item)">Remove</button>
  </div>
</template>

<script>
/* eslint-disable */
import IngredientCardBody from '@/components/IngredientCardBody'
import RecipeCardBody from '@/components/RecipeCardBody'
export default {
  name: 'SearchItem',
  components: { IngredientCardBody, RecipeCardBody },
  props: {
    item: {
      type: Object
    },
    Pantry: 'Pantry',

    removeMethod: { type: Function }
  },

  computed: {
    itemCardComponent () {
      return this.item.constructor.type + 'CardBody'
    }
  }
}
</script>

<style scoped>

</style>
